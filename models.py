from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Date, ForeignKey, Enum as SAEnum, DATE
import enum

from .database import Base

class Status(enum.Enum, str):
    unapplied = "unapplied"
    applied = "applied"
    interview = "interview"
    
class User(Base):
    __tablename__= "users"
    
    id: Mapped[int] = mapped_column(Integer, primary_key= True, autoincrement= True)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable= False)
    applications : Mapped[list["job_application"]]= relationship("job_application", back_populates= "user")

class job_application(Base):
    __tablename__= "job_applications"
    
    id : Mapped[int] = mapped_column(Integer, primary_key= True, nullable= False, autoincrement= True)
    title: Mapped[str] = mapped_column(String(200), nullable= False)
    company: Mapped[str] = mapped_column(String(200), nullable= False)
    due_date: Mapped[DATE| None]
    
    user = relationship("User", back_populates= "applications")
    user_id = mapped_column(ForeignKey("users.id", ondelete= "CASCADE"), nullable= False, index= True)
    
    
    