import os
import sys
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Add 'src' directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, 'src')
if src_path not in sys.path:
    sys.path.insert(0, src_path)

from src.social_blogging_app.crew import SocialBloggingApp

# Initialize FastAPI app
app = FastAPI(title="Social Blogging API", version="1.0")

# Add CORS so frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] for your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic input model
class BlogRequest(BaseModel):
    topic: str

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Social Blogging API"}

# Generate blog endpoint
@app.post("/api/generate-blog")
def generate_blog(request: BlogRequest):
    if not request.topic.strip():
        raise HTTPException(status_code=400, detail="Topic cannot be empty")

    # Prepare crew inputs
    inputs = {
        "blog_topic": request.topic,
        "current_year": str(datetime.now().year),
        "platform_guidelines": "Follow our standard editorial guidelines for clarity, tone, and style."
    }

    try:
        crew_app = SocialBloggingApp()
        result = crew_app.crew().kickoff(inputs=inputs)

        # Try parsing to JSON if it's a string
        if isinstance(result, str):
            try:
                result = json.loads(result)
            except json.JSONDecodeError:
                # If LLM returned plain text, wrap in JSON format
                result = {
                    "title": f"Blog on {request.topic}",
                    "content": result.strip(),
                    "hashtags": [f"#{request.topic.replace(' ', '')}", "#AI", "#Trending"]
                }

        # Ensure keys exist
        final_output = {
            "title": result.get("title", f"Blog on {request.topic}"),
            "content": result.get("content", ""),
            "hashtags": result.get("hashtags", ["#Blog", "#Trending"])
        }

        return final_output

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while generating the blog: {e}")

# Run with uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
