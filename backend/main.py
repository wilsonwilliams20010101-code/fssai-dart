
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from backend.static_responses import (
    DEFAULT_RESPONSE,
    answer_message,
    analyze_observation,
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
    result = answer_message(req.message)
    return {
        "response": result.get("response", DEFAULT_RESPONSE["explanation"]),
        "mode": result.get("mode", "offline"),
        **{k: v for k, v in result.items() if k not in {"response", "mode"}},
    }

@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
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
    return {"mode": "offline_static", "status": "ok"}

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
