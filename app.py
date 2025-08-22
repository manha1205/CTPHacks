from flask import Flask, request, jsonify, render_template_string
import functions
from database import SessionLocal, engine, Base
import models
from datetime import date
import os
import io
from functions import create_user, get_user, create_job, update_job, view_jobs
from resume import scrape_job_description, extract_resume_text, grade_resume
# from functions import create_user, get_user, create_job, update_job, view_jobs
#just join leonardos hes trying to do the same thing
#gimme a min ill be there

Base.metadata.create_all(bind=engine)
app = Flask(__name__)

def get_db():
    return SessionLocal()

def get_current_user(db):
    profile = functions.get_clerk_user_from_request()
    if not profile:
        return None

    clerk_id = profile["id"]
    # Get primary email
    email_obj = next(
        (e for e in profile["email_addresses"] if e["id"] == profile["primary_email_address_id"]),
        profile["email_addresses"][0]
    )
    email = email_obj["email_address"]

    user = db.query(models.User).filter(models.User.id == clerk_id).first()
    if not user:
        user = functions.create_user(db, clerk_id, email)
    return user


@app.route('/users/<int:user_id>/jobs', methods= ["GET"])
def list_jobs(user_id):
    db = get_db()()
    try:
        jobs = functions.sort_applications(db, user_id)
        job_list =[{"id" : job.id, 
                                "title": job.title,
                                "company": job.company,
                                "link" : job.link,
                                "status": job.status,
                                "description": job.description,
                                "due date" : job.due_date.isoformat() } for job in jobs]
        return jsonify(job_list), 200
    finally:
        db.close()   

# @app.route("/users", methods = ["POST"])
# def create_user_route():
#     db = get_db()
#     try:
#         data = request.get_json()
#         email = data["email"]
        # new_user = functions.create_user(db, email)
        
#         return jsonify({ "id": new_user.id, "email": new_user.email})
#     finally:
#         db.close()


@app.route("/users/<user_id>", methods=["GET"])
def display_user(user_id):
    db = get_db()
    try:
        user = functions.get_user(db, user_id)
        return jsonify({ "id": user.id, "email": user.email})
    except Exception as e:
        return jsonify({"error": str(e)}) , 404
    finally:
        db.close()
        

@app.route("/jobs", methods= ["POST"])
def create_job():
    db = get_db()
    try:
        data = request.get_json()
        
        if not data.get("title") or not data.get("company") or not data.get("user_id") or not data.get('due_date'):
            return jsonify({"error": "title, company, due date, and user_id are required"}), 400
        try:
            due = date.fromisoformat(data["due_date"])
        except ValueError:
            return jsonify({"error": "due_date must be YYYY-MM-DD"}), 400
        new_job = functions.create_job(db, title =data["title"], 
                                       link=data.get("link"), 
                                       company=data["company"], 
                                       due = due, 
                                       status= models.Status(data.get("status", "unapplied")), 
                                       jobdescription= data.get("description"), 
                                       user_id= data["user_id"] )
        return jsonify({
            "id": new_job.id,
            "title": new_job.title,
            "company": new_job.company,
            "due date": new_job.due_date.isoformat(),
            "description": new_job.description,
            "status" : new_job.status.value
            }), 201
        
    finally:
        db.close()
        
@app.route('/jobs/<int:job_id>/status', methods= ['PATCH'])
def change_status(job_id):
    db = get_db()
    try:
        data = request.get_json()
        rawstatus = data.get("status")
        if not rawstatus:
            return jsonify({'error: status needed'}), 400
        try:
            status = models.Status[rawstatus.lower()]
        except KeyError:
            try: 
                status = models.Status[rawstatus]
            except ValueError:
                return jsonify({"error": f"invalid status '{rawstatus}'. valid: {[s.name for s in models.Status]}"})
        job = functions.update_job(db, job_id, status) 
        if not job:
            return jsonify({"error, job not found"}), 404   
        return jsonify({"job id": job_id, "status": job.status.value}),200
    finally:
        db.close()
@app.route('/jobs/<int:job_id>', methods= ['DELETE'])   
def delete_route(job_id):
    db = get_db()
    try:
        job = functions.delete_application(db, job_id)
        if job is None:
            return jsonify(error= "job id not found"), 404
        return jsonify({"job id": job.id, 
                        "name": job.title, 
                       "message": "has been deleted"}), 200
    finally:
        db.close()
# @app.route("/resume", methods=["POST"])
# def upload_resume():
#     db = get_db()
#     try:
#         user = get_current_user(db)
#         if not user:
#             return jsonify({"error": "Unauthorized"}), 401
#         file = request.files["file"]
#         resume = functions.save_or_replace_resume(db, user.id, file)
#         return jsonify({"filename": resume.resume_filename})
#     finally:
#         db.close()

@app.route("/resume", methods=["GET"])
def download_resume():
    db = get_db()
    try:
        user = get_current_user(db)
        if not user:
            return jsonify({"error": "Unauthorized"}), 401
        resume = functions.get_resume(db, user.id)
        if not resume:
            return jsonify({"error": "No resume found"}), 404
        return send_file(
            io.BytesIO(resume.resume_data),
            download_name=resume.resume_filename,
            mimetype="application/pdf"
        )
    finally:
        db.close()

@app.route("/me", methods=["GET"])
def me():
    db = get_db()
    try:
        user = get_current_user(db)
        if not user:
            return jsonify({"error": "Unauthorized"}), 401
        return jsonify({"id": user.id, "email": user.email})
    finally:
        db.close()

@app.route("/upload-resume", methods=["GET", "POST"])
def upload_resume():
    result = None
    if request.method == "POST":
        uploaded_file = request.files["resume"]
        job_url = request.form.get("job_url")
    return functions.res

#Run the app
app.run(host="0.0.0.0", port="80", debug=True)

def index():
    if __name__ == "__main__":
        return "Test"
        

    
