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

    payload = {"model": settings.ULTRAVOX_MODEL, "temperature": 0.5}

    if final_agent_id:
        # If we have an Agent ID, use it.
        # API usually expects EITHER systemPrompt OR agentId, not both if strict.
        payload["agentId"] = final_agent_id

        # Add template context if provided
        if template_context:
            # Ultravox API typically uses 'context' or similar depending on version.
            # Assuming payload structure for template variables is flexible or top-level.
            # Adjusting to standard 'input' or specific field if known.
            # For now, assuming straightforward pass-through or similar.
            # Checking docs standard for 'templateContext' usually implies parameter injection.
            # If the API expects it in a specific field:
            payload["medium"] = {
                "serverWebSocket": {}
            }  # Common requirement for some integrations, ensuring robust call
            # Actually, standard create call with agentId might just take extra keys or `input`.
            # Let's assume standard `templateContext` if that's what user asked,
            # OR pass it as part of call creation params if the Agent works that way.
            # User specifically asked for `templateContext`.
            payload["templateContext"] = template_context

    # Fallback to systemPrompt if no Agent ID (or legacy mode)
    if system_prompt and not final_agent_id:
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
