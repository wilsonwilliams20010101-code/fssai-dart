# === Added for deployment ===
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
import os

frontend_path = os.path.join(os.getcwd(), "frontend", "dist")


# ✅ ROOT FIRST (VERY IMPORTANT)
@app.get("/", response_class=HTMLResponse)
def home():
    return "<h1>FSSAI DART API is running 🚀</h1>"


# ✅ Serve frontend only if it exists
if os.path.exists(frontend_path):

    app.mount(
        "/assets",
        StaticFiles(directory=os.path.join(frontend_path, "assets")),
        name="assets"
    )

    @app.get("/{full_path:path}")
    def serve_react(full_path: str):
        index_file = os.path.join(frontend_path, "index.html")

        if os.path.exists(index_file):
            return FileResponse(index_file)

        return {"error": "Frontend not built"}