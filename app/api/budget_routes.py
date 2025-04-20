from fastapi import APIRouter
from app.models.models import Income, Expense  # Import our data models

router = APIRouter()


@router.get("/")
async def read_root():
    return {"message": "Budget API is alive!"}
