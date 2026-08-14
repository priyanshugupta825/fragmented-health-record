from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel, Field
from datetime import datetime

DataT = TypeVar("DataT")


class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    app_name: str
    version: str
    environment: str
    database_connected: bool
    timestamp: datetime


class APIResponse(BaseModel, Generic[DataT]):
    success: bool = True
    message: Optional[str] = None
    data: Optional[DataT] = None
    error: Optional[str] = None
