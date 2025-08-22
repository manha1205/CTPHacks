import models
from sqlalchemy.orm import Session
import pdfplumber
import openai
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

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