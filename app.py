from flask import Flask, request, jsonify
import functions
from database import SessionLocal, engine, Base
import models
# from functions import create_user, get_user, create_job, update_job, view_jobs



Base.metadata.create_all(bind=engine)
app = Flask(__name__)

def get_db():
    return SessionLocal()
    
@app.route('/jobs', methods= ["GET"])
def list_jobs():
    db = get_db
    user_id = request.args.get("user_id")
    jobs = functions.sort_applications(db, user_id)
    job_list =[]
    try:
        for job in jobs:
            job_list.append({"id" : job.id, "title": job.title,"company": job.company,"link" : job.link,
                             "status": job.status,
                            "due date" : job.due_date.isoformat() if job.due_date else None})
        return jsonify(job_list)
    finally:
        db.close()   

@app.route("/users", methods = ["POST"])
def create_user():
    db = get_db()
    try:
        data = request.get_json()
        new_user = functions.create_user(db, data["email"])
        return jsonify({ "id": new_user.id, "email": new_user.email})
    finally:
        db.close()


@app.route("/users/<int:user_id>", methods = ["GET"])
def display_user(user_id):
    db = get_db()
    try:
        user = functions.get_user(db, user_id)
        return jsonify({ "id": user.id, "email": user.email})
    except Exception as e:
        return jsonify({"error": str(e)}) , 404
    finally:
        db.close()
        

# @app.route("/jobs", methods= ["POST"])


#Run the app

app.run(host="0.0.0.0", port="80", debug=True)

def index():
    if __name__ == "__main__":
        return "Test"
        