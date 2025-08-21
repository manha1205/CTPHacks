import models
from sqlalchemy.orm import Session

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
    