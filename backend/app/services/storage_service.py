import os
import uuid
import mimetypes
from typing import Dict, Any, Tuple
from app.core.config import settings

# Local upload directory fallback
LOCAL_UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)


def get_file_extension(file_name: str, mime_type: str) -> str:
    ext = os.path.splitext(file_name)[1].lower()
    if not ext:
        ext = mimetypes.guess_extension(mime_type) or ".bin"
    return ext


def upload_document_file(
    file_bytes: bytes,
    file_name: str,
    mime_type: str,
    user_id: str,
) -> Tuple[str, str]:
    """
    Uploads a medical document to Supabase Storage.
    Falls back to safe local storage if Supabase credentials are not yet populated.
    
    Returns:
        Tuple[str, str]: (file_path, file_url)
    """
    ext = get_file_extension(file_name, mime_type)
    unique_file_id = str(uuid.uuid4())
    storage_path = f"{user_id}/{unique_file_id}{ext}"

    # Try Supabase Storage if configured
    is_supabase_valid = (
        settings.SUPABASE_URL
        and "placeholder" not in settings.SUPABASE_URL
        and settings.SUPABASE_KEY
        and "your-supabase-key" not in settings.SUPABASE_KEY
    )

    if is_supabase_valid:
        try:
            from supabase import create_client
            supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            
            # Upload to medical-records bucket
            bucket_name = "medical-records"
            try:
                supabase.storage.create_bucket(bucket_name, options={"public": True})
            except Exception:
                pass  # Bucket likely already exists

            res = supabase.storage.from_(bucket_name).upload(
                path=storage_path,
                file=file_bytes,
                file_options={"content-type": mime_type},
            )
            
            # Get public or signed URL
            public_url_res = supabase.storage.from_(bucket_name).get_public_url(storage_path)
            file_url = public_url_res if isinstance(public_url_res, str) else public_url_res.get("publicURL", "")
            return storage_path, file_url
        except Exception as e:
            print(f"[Storage Service] Supabase upload failed, using local storage fallback: {e}")

    # Local fallback storage
    local_path = os.path.join(LOCAL_UPLOAD_DIR, f"{unique_file_id}{ext}")
    with open(local_path, "wb") as f:
        f.write(file_bytes)

    local_url = f"http://localhost:{settings.PORT}/uploads/{unique_file_id}{ext}"
    return storage_path, local_url
