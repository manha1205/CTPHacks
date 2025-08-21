from flask import Flask, request, render_template_string
import pdfplumber
import openai
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get API key from environment
api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = openai.OpenAI(api_key=api_key)

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


# Extract text from uploaded PDF
def extract_resume_text(file_stream):
    text = ""
    with pdfplumber.open(file_stream) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

# Grade resume using OpenAI
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

# Flask App
app = Flask(__name__)

HTML_FORM = """
<!doctype html>
<title>Resume Grader</title>
<h2>Upload Your Resume (PDF) and Job Posting URL</h2>
<form method=post enctype=multipart/form-data>
  <label for="job_url"><strong>Job Posting URL</strong></label>
  <input type=text name=job_url required><br>

  <label for="resume"><strong>Upload Resume (PDF)</strong></label>
  <input type=file name=resume accept=".pdf" required><br><br>

  <input type=submit value="Grade Resume">
</form>
{% if result %}
  <h3>📊 Evaluation Result:</h3>
  <pre>{{ result }}</pre>
{% endif %}
"""

@app.route("/", methods=["GET", "POST"])
def upload_resume():
    result = None
    if request.method == "POST":
        uploaded_file = request.files["resume"]
        job_url = request.form.get("job_url")
        resume_text = extract_resume_text(uploaded_file)
        job_description = scrape_job_description(job_url)
        result = grade_resume(resume_text, job_description)
    return render_template_string(HTML_FORM, result=result)

if __name__ == "__main__":
    app.run(debug=True)
