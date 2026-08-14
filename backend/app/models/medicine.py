from datetime import datetime
from sqlalchemy import Column, String, DateTime, Date, Text, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="SET NULL"), nullable=True, index=True)

    name = Column(String(255), nullable=False)  # e.g., "Telmisartan"
    brand_name = Column(String(255), nullable=True)  # e.g., "Telma 40"
    dosage = Column(String(100), nullable=False)  # e.g., "40 mg"
    form = Column(String(50), default="tablet", nullable=False)  # tablet, capsule, syrup, injection, drops, inhaler
    route = Column(String(50), default="oral", nullable=False)  # oral, topical, intravenous, etc.
    
    frequency = Column(String(100), nullable=False)  # "Once daily", "Twice daily", "1-0-1", "SOS"
    timing = Column(String(100), nullable=True)  # "After food", "Before breakfast", "Before bed"
    schedule_times = Column(JSON, default=list, nullable=False)  # ["08:00", "20:00"]
    
    purpose = Column(String(255), nullable=True)  # e.g., "For blood pressure"
    instructions = Column(Text, nullable=True)  # Special instructions
    
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    prescribed_by = Column(String(255), nullable=True)  # Doctor name

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="medicines")
    document = relationship("Document", back_populates="medicines")
    logs = relationship("MedicineLog", back_populates="medicine", cascade="all, delete-orphan")


class MedicineLog(Base):
    __tablename__ = "medicine_logs"

    id = Column(String(36), primary_key=True, index=True)
    medicine_id = Column(String(36), ForeignKey("medicines.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    scheduled_time = Column(DateTime, nullable=False, index=True)
    taken_time = Column(DateTime, nullable=True)
    status = Column(String(30), default="pending", nullable=False)  # pending, taken, missed, skipped
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    medicine = relationship("Medicine", back_populates="logs")
    user = relationship("User", back_populates="medicine_logs")
