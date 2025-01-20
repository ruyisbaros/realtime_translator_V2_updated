from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
from utils.audio_utils import create_temp_video_folder
import shutil

router = APIRouter(
    prefix="/upload",
    tags=["upload"],
)

# Temporary directory to store uploaded files
# temp_video_folder = create_temp_video_folder()
temp_video_folder = Path("../temp_videos")
temp_video_folder.mkdir(exist_ok=True)


class UploadResponse(BaseModel):
    message: str
    file_path: str


@router.options("/", response_model=UploadResponse)
async def upload_video(file: UploadFile = File(...)):
    """
    Endpoint to upload video files.
    """
    try:
        # Check file type
        if not file.content_type.startswith("video/"):
            raise HTTPException(
                status_code=400, detail="Invalid file type. Please upload a video.")

        # Save the uploaded file to the temp directory
        file_path = temp_video_folder / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {"message": "File uploaded successfully!", "file_path": str(file_path)}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/")
async def hello():
    return {"message": "Hello, this is the upload endpoint!"}
