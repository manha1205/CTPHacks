from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Date, ForeignKey, Enum as SAEnum, DATE
import enum
from datetime import date

from database import Base

class Status( str, enum.Enum):
    unapplied = "unapplied"
    applied = "applied"
    interview = "interview"
    rejected = "rejected"
    offer = "offer"
    
class User(Base):
    __tablename__= "users"
    
    id: Mapped[int] = mapped_column(Integer, primary_key= True, autoincrement= True)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable= False)
    applications : Mapped[list["JobApplications"]]= relationship("JobApplications", cascade="all, delete-orphan", passive_deletes=True, back_populates= "user")


class JobApplications(Base): 
    __tablename__= "jobs"
    
    id : Mapped[int] = mapped_column(Integer, primary_key= True, nullable= False, autoincrement= True)
    title: Mapped[str] = mapped_column(String(200), nullable= False)
    company: Mapped[str] = mapped_column(String(200), nullable= False)
    due_date: Mapped[date| None] = mapped_column(Date, nullable= True)
    link : Mapped[str|None] = mapped_column(String(2000))
    status: Mapped[Status] = mapped_column(SAEnum(Status), default= Status.unapplied, nullable= False)
    
    user : Mapped["User"] = relationship("User", back_populates= "applications")
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete= "CASCADE"), nullable= False, index= True)
    
