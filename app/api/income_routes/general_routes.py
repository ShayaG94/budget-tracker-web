from fastapi import APIRouter
from app.models.models import Income
from app.services import income_service
from typing import List

router = APIRouter()


@router.post("/", response_model=Income, status_code=201)
async def create_income(income: Income):
    created_income = income_service.create_income(income)
    print("Received income data:", created_income.model_dump())
    return created_income


@router.get("/", response_model=List[Income])
async def get_all_income():
    incomes = income_service.get_all_income()
    return incomes


@router.get("/tag/", response_model=List[Income])
async def get_income_by_tag(tags: List[str]):
    incomes = income_service.get_income_by_tag(tags)
    return incomes
