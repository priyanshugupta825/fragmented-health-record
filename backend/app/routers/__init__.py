from app.routers.health import router as health_router
from app.routers.documents import router as documents_router
from app.routers.timeline import router as timeline_router
from app.routers.emergency import router as emergency_router
from app.routers.consent import router as consent_router

__all__ = [
    "health_router",
    "documents_router",
    "timeline_router",
    "emergency_router",
    "consent_router",
]
