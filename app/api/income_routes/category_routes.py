from fastapi import APIRouter
from app.models.models import Income
from app.services.income_services import category_services
from typing import List

router = APIRouter()


@router.get("/", response_model=List[Income])
async def get_income_by_category(category: str):
    incomes = category_services.get_income_by_category(category)
    return incomes


@router.get("/and_month/", response_model=List[Income])
async def get_income_by_category_and_month(category: str, year: int, month: int):
    incomes = category_services.get_income_by_category_and_month(category, year, month)
    return incomes


@router.get("/and_year/", response_model=List[Income])
async def get_income_by_category_and_year(category: str, year: int):
    incomes = category_services.get_income_by_category_and_year(category, year)
    return incomes


@router.get("/and_month_range/", response_model=List[Income])
async def get_income_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    incomes = category_services.get_income_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return incomes
