from flask import Flask, request, render_template_string
import pdfplumber
import openai

from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get API key from environment
api_key = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = openai.OpenAI(api_key=api_key)

# Job Description Template
job_description = """
We are looking for a Software Engineer with:
- Bachelor's degree or higher in Computer Science or related field
- Previous related experience
- Data Structures & Algorithms knowledge
- One or more high level programming languages (Python, Java, JavaScript, etc)
- Knowledge of Database Systems
- Preferred GPA: 3.0 or higher
"""

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
You are a resume evaluator. Compare the following resume to the job description below.
Award points based on:
- Presence of relevant keywords and skills
- Relevant experience and projects
Return a score out of 100 and a brief explanation using short bullet points.

Job Description:
{job_description}

Resume:
{resume_text}

Score and Explanation:
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
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
<h2>Upload Your Resume (PDF)</h2>
<form method=post enctype=multipart/form-data>
  <input type=file name=resume accept=".pdf" required>
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
        resume_text = extract_resume_text(uploaded_file)
        result = grade_resume(resume_text, job_description)
    return render_template_string(HTML_FORM, result=result)

if __name__ == "__main__":
    app.run(debug=True)
