from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.voice_service import create_call_session
from app.core.config import settings
import uvicorn

app = FastAPI(title="ServiGlobal AI Voice Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CreateCallRequest(BaseModel):
    agent_id: str | None = None
    system_prompt: str | None = None
    template_context: dict | None = None


@app.post("/api/v1/calls")
async def create_call(request: CreateCallRequest):
    try:
        join_url = await create_call_session(
            agent_id=request.agent_id,
            system_prompt=request.system_prompt,
            template_context=request.template_context,
        )
        return {"joinUrl": join_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
