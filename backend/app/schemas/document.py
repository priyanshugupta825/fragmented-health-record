from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.extraction import (
    DocumentExtractionResult,
    MedicineExtracted,
    LabResultExtracted,
    ClinicalEncounterExtracted,
)


class DocumentResponse(BaseModel):
    id: str
    user_id: str
    file_name: str
    file_url: str
    mime_type: Optional[str] = None
    file_size_bytes: Optional[int] = None
    document_type: str
    title: Optional[str] = None
    description: Optional[str] = None
    processing_status: str
    processing_error: Optional[str] = None
    ai_summary: Optional[str] = None
    extracted_metadata: Dict[str, Any] = Field(default_factory=dict)
    tags: List[str] = Field(default_factory=list)
    uploaded_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class DocumentUploadResponse(BaseModel):
    success: bool = True
    message: str
    document: DocumentResponse
    extraction: DocumentExtractionResult


class DocumentReviewConfirmation(BaseModel):
    """
    User-reviewed and approved payload after inspecting the AI extraction.
    Allows correcting any misread OCR or AI values before finalizing.
    """
    title: Optional[str] = None
    document_type: Optional[str] = None
    encounter: Optional[ClinicalEncounterExtracted] = None
    medicines: Optional[List[MedicineExtracted]] = None
    lab_results: Optional[List[LabResultExtracted]] = None
    tags: Optional[List[str]] = None
