import models
from sqlalchemy.orm import Session
import pdfplumber
import openai
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

load_dotenv
api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=api_key)

def create_user(db: Session, email):
    email = email.strip().lower()
    existing = db.query(models.User).filter(models.User.email == email).first()
    if existing:
        return existing
    
    user= models.User(email= email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user(db:Session, user_id):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user

def create_job(db:Session, title, link, company, due, user_id, jobdescription, status: models.Status ): #create new, use post?
    new_job = models.JobApplications( description = jobdescription, title = title, company = company, due_date = due, link = link, user_id= user_id, status = status)
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

def update_job(db:Session, job_id, new_status: models.Status): #update existing, use patch i think
    job = db.query(models.JobApplications).filter(models.JobApplications.id == job_id).first()
    if job:
        job.status = new_status
        db.commit()
        db.refresh(job)
    return job

def view_jobs(db:Session, user_id): #display function use get
    return db.query(models.JobApplications).filter(models.JobApplications.user_id == user_id).all()

def delete_application(db:Session, job_id): #use delete
    job = db.query(models.JobApplications).filter(models.JobApplications.id== job_id).first()
    if job:
        db.delete(job)
        db.commit()
        return job 
    if not job:
        return None

def sort_applications(db: Session, user_id):
    return db.query(models.JobApplications).filter(models.JobApplications.user_id == user_id).order_by(models.JobApplications.due_date.asc()).all()
    
# Scrape job description from URL
def scrape_job_description(url):
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        # Combine all visible text
        full_text = soup.get_text(separator="\n", strip=True).lower()

        # Look for blocks that contain key phrases
        keywords = ["requirements", "qualifications", "responsibilities", "skills", "looking for", "graduation", "degree"]
        lines = full_text.split("\n")

        job_lines = []

        for line in lines:
            for keyword in keywords:
                if keyword in line:
                    job_lines.append(line)
                    break

        # Just take 50 lines if no matches
        if not job_lines:
            job_lines = lines[:50] 

        job_text = "\n".join(job_lines)
        return job_text.strip()
    
    except Exception as e:
        return f"Error scraping job description: {str(e)}"
    
def extract_resume_text(file_stream):
    text = ""
    with pdfplumber.open(file_stream) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def grade_resume(resume_text, job_description):
    prompt = f"""
You are a strict resume evaluator. Compare the resume below to the job description.

Scoring Criteria (out of 100):
- Relevant keywords and skills: 30 points
- Relevant experience and projects: 40 points
- Educational qualifications: 30 points

Important:
1) If the resume does not meet the minimum educational qualification stated in the job description, give 0 for Educational qualifications criteria.
- If there is no minimum educational qualification, do not evaluate this criteria.
2) If there is a graduation date range, and the resume lists a date which is outside that range, give 0 for Educational qualifications criteria.
- If there is no graduation date range, do not evaluate this criteria.

Return a score out of 100 and a brief explanation using short bullet points.
Please output this as JSON

Job Description:
{job_description}

Resume:
{resume_text}

Score and Explanation:
"""

    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that evaluates resumes."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content

def upload_resume(uploaded_file, job_url):
    resume_text = extract_resume_text(uploaded_file)
    job_description = scrape_job_description(job_url)
    result = grade_resume(resume_text, job_description)
    return result