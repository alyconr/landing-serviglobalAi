import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)


async def create_call_session(
    agent_id: str | None = None,
    system_prompt: str | None = None,
    template_context: dict | None = None,
) -> str:
    """
    Creates a call session with Ultravox and returns the joinUrl.
    """
    url = "https://api.ultravox.ai/api/calls"
    headers = {
        "X-API-Key": settings.ULTRAVOX_API_KEY,
        "Content-Type": "application/json",
    }

    # Determine Agent ID: Argument overrides Settings
    final_agent_id = agent_id or settings.DEFAULT_AGENT_ID

    payload = {}

    if final_agent_id:
        # Correct Endpoint for Agents: 
        url = f"https://api.ultravox.ai/api/agents/{final_agent_id}/calls"

        # Add template context if provided
        if template_context:
            payload["templateContext"] = template_context
    else:
        # Legacy/Raw Endpoint: /api/calls
        url = "https://api.ultravox.ai/api/calls"
        payload["model"] = settings.ULTRAVOX_MODEL
        payload["temperature"] = 0.5
        payload["medium"] = {"serverWebSocket": {"inputSampleRate": 48000}}
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
        error_msg = f"Ultravox API error: {e.response.text}. Payload: {payload}, AgentID: {settings.DEFAULT_AGENT_ID}"
        logger.error(error_msg)
        raise Exception(error_msg)
    except Exception as e:
        logger.error(f"Unexpected error creating call: {e}")
        raise
