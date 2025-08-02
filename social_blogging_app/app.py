import os
import sys
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#throttling imports
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_ipaddr
import redis.asyncio as redis

# Import logger
from logger import logger

# Add 'src' directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, 'src')
if src_path not in sys.path:
    sys.path.insert(0, src_path)

from src.social_blogging_app.crew import SocialBloggingApp

# Initialize FastAPI app
app = FastAPI(title="Social Blogging API", version="1.0")
logger.info("Social Blogging API starting up...")

# I am setting a limit of 5 requests per minute, per IP address.
limiter = Limiter(key_func=get_ipaddr, default_limits=["5/minute"])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Added CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the Social Blogging API"}

# Generate blog endpoint
@app.post("/api/generate-blog")
def generate_blog(request: BlogRequest):
    logger.info(f"Blog generation requested for topic: '{request.topic}'")
    
    if not request.topic.strip():
        logger.warning("Empty topic provided")
        raise HTTPException(status_code=400, detail="Topic cannot be empty")

    # Preparing crew inputs
    inputs = {
        "blog_topic": request.topic,
        "current_year": str(datetime.now().year),
        "platform_guidelines": "Follow our standard editorial guidelines for clarity, tone, and style."
    }

    try:
        logger.info("Starting crew execution...")
        # Initializing and run crew
        crew_app = SocialBloggingApp()
        result = crew_app.crew().kickoff(inputs=inputs)
        logger.info("Crew execution completed successfully")
        
        # Extract content from crew result
        blog_content = ""
        if hasattr(result, 'raw'):
            blog_content = str(result.raw)
        elif hasattr(result, 'output'):
            blog_content = str(result.output)
        else:
            blog_content = str(result)

        # Trying to parse metadata from crew result
        metadata = {}
        try:
            if hasattr(result, 'json') and result.json:
                parsed_result = json.loads(result.json)
                if isinstance(parsed_result, dict):
                    metadata = parsed_result
            elif hasattr(result, 'output') and isinstance(result.output, dict):
                metadata = result.output
        except:
            pass

        # Extracting title from content if not in metadata
        title = metadata.get("title")
        if not title and blog_content:
            lines = blog_content.split('\n')
            for line in lines:
                if line.startswith('# '):
                    title = line[2:].strip()
                    break
        if not title:
            title = f"Blog Post: {request.topic}"

        # Preparing final output
        final_output = {
            "title": title,
            "content": blog_content,
            "meta_description": metadata.get("meta_description", f"A blog post about {request.topic}"),
            "hashtags": metadata.get("keywords", metadata.get("hashtags", [request.topic.lower().replace(' ', '')]))
        }

        logger.info(f"Blog generation successful - Title: '{title}'")
        return final_output

    except Exception as e:
        logger.error(f"Blog generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while generating the blog: {str(e)}")

# Running with uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Social Blogging API server...")
    uvicorn.run(app, host="0.0.0.0", port=5000)