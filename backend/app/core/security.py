from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.config import settings

security_bearer = HTTPBearer(auto_error=False)


def decode_supabase_token(token: str) -> Dict[str, Any]:
    """
    Decodes and validates a Supabase Auth JWT token.
    Falls back to unverified header/payload inspection in development mode if secret is not set.
    """
    try:
        if settings.SUPABASE_JWT_SECRET and settings.SUPABASE_JWT_SECRET != "your-supabase-jwt-secret":
            payload = jwt.decode(
                token,
                settings.SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_aud": False},
            )
            return payload
        else:
            # Fallback for dev / unconfigured secrets
            claims = jwt.get_unverified_claims(token)
            return claims
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer),
) -> Dict[str, Any]:
    """
    Dependency that extracts and validates the Bearer token from the request Authorization header.
    Returns the JWT claims payload containing `sub` (Supabase User UUID), `email`, etc.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    payload = decode_supabase_token(token)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing 'sub' identifier",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload


async def get_current_user_id(
    payload: Dict[str, Any] = Depends(get_current_user_token),
) -> str:
    """
    Convenience dependency to get the current Supabase user's UUID.
    """
    return payload["sub"]
