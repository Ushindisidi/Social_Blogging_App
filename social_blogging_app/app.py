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
#  generate_blog function
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

        # Handles the CrewOutput object and parse its raw string attribute.
        raw_result_string = ""
        if hasattr(result, 'raw'):
            raw_result_string = result.raw
        else:
            raise ValueError(f"Unexpected crew result format: {type(result)}. The output is missing the 'raw' attribute.")

        # Cleaning and parse the JSON string from the raw attribute
        cleaned_result_string = raw_result_string.strip()
        # Remove any trailing markdown code block tags if they exist
        if cleaned_result_string.startswith("```json"):
            cleaned_result_string = cleaned_result_string.replace("```json", "").strip()
        if cleaned_result_string.endswith("```"):
            cleaned_result_string = cleaned_result_string.rsplit("```", 1)[0].strip()

        parsed_result = json.loads(cleaned_result_string)

        # Extracting the content, title, and metadata from the parsed result
        # Checks for multiple possible keys for content, title, and meta_description
        title = parsed_result.get("title", parsed_result.get("blogTitle", f"Blog Post: {request.topic}"))
        blog_content = parsed_result.get("blog_summary", parsed_result.get("blogSummary", parsed_result.get("summary", "No content was generated.")))
        meta_description = parsed_result.get("meta_description", parsed_result.get("metaDescription", f"A blog post about {request.topic}."))

        # Extracted hashtags from social media posts or create a default list
        social_media_posts = parsed_result.get("social_media_posts", {})
        hashtags = []
        if 'twitter' in social_media_posts:
            # Simple extraction of hashtags from a social media post string
            for word in social_media_posts['twitter'].split():
                if word.startswith('#'):
                    hashtags.append(word.strip('#'))
        if not hashtags:
            hashtags = [request.topic.lower().replace(' ', '')]
        
        # Preparing the final, well-structured output
        final_output = {
            "title": title,
            "content": blog_content,
            "meta_description": meta_description,
            "hashtags": hashtags
        }

        logger.info(f"Blog generation successful - Title: '{title}'")
        return final_output

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse crew output as JSON: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: The crew's output was not valid JSON.")
    except Exception as e:
        logger.error(f"Blog generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while generating the blog: {str(e)}")

# Running with uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Social Blogging API server...")
    uvicorn.run(app, host="0.0.0.0", port=5000)