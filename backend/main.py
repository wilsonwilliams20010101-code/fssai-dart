
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

try:
    from backend.gemini_ai import is_gemini_configured, call_gemini_chat, analyze_observation_gemini
except ModuleNotFoundError:
    from gemini_ai import is_gemini_configured, call_gemini_chat, analyze_observation_gemini


try:
    from backend.static_responses import (
        DEFAULT_RESPONSE,
        answer_message,
        analyze_observation,
        get_dataset_stats,
        get_static_response,
    )
except ModuleNotFoundError:
    from static_responses import (
        DEFAULT_RESPONSE,
        answer_message,
        analyze_observation,
        get_dataset_stats,
        get_static_response,
    )

app = FastAPI(title="FSSAI DART API", version="4.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[list] = []

class AnalyzeRequest(BaseModel):
    test_id: Optional[str] = None
    test_name: Optional[str] = ""
    category: Optional[str] = ""
    observation: str
    food_item: Optional[str] = ""

@app.post("/chat")
async def chat(req: ChatRequest):
    if is_gemini_configured():
        ai_result = call_gemini_chat(req.message, req.history or [])
        if ai_result:
            return ai_result

    # Fallback to static responses if Gemini fails or is not configured
    result = answer_message(req.message, req.history or [])
    return {
        "response": result.get("response", DEFAULT_RESPONSE["explanation"]),
        "mode": result.get("mode", "offline"),
        **{k: v for k, v in result.items() if k not in {"response", "mode"}},
    }

@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
    if is_gemini_configured():
        ai_result = analyze_observation_gemini(
            observation=req.observation,
            test_id=req.test_id,
            test_name=req.test_name or "",
            category=req.category or "",
            food_item=req.food_item or ""
        )
        if ai_result:
            return ai_result

    # Fallback to static responses
    result = analyze_observation(
        test_id=req.test_id,
        observation=req.observation,
        test_name=req.test_name or "",
        category=req.category or "",
        food_item=req.food_item or "",
    )
    return result

@app.get("/health")
def health():
    mode = "gemini_ai" if is_gemini_configured() else "offline_static"
    return {"mode": mode, "status": "ok", "data": get_dataset_stats()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)


# === Added for deployment ===
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

frontend_path = os.path.join(os.getcwd(), "frontend", "dist")

if os.path.exists(frontend_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_react(full_path: str):
        return FileResponse(os.path.join(frontend_path, "index.html"))

from fastapi.responses import HTMLResponse

@app.get("/", response_class=HTMLResponse)
def home():
    return "<h1>FSSAI DART API is running 🚀</h1>"
