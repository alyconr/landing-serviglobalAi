import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)


async def create_call_session(system_prompt: str | None = None) -> str:
    """
    Creates a call session with Ultravox and returns the joinUrl.
    """
    url = "https://api.ultravox.ai/api/calls"
    headers = {
        "X-API-Key": settings.ULTRAVOX_API_KEY,
        "Content-Type": "application/json",
    }

    payload = {"model": settings.ULTRAVOX_MODEL, "temperature": 0.5}

    if system_prompt:
        payload["systemPrompt"] = system_prompt

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url, json=payload, headers=headers, timeout=10.0
            )
            response.raise_for_status()
            data = response.json()
            return data["joinUrl"]
    except httpx.HTTPStatusError as e:
        logger.error(f"Ultravox API error: {e.response.text}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating call: {e}")
        raise
