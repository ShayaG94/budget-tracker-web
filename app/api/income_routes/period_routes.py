from fastapi import APIRouter
from app.models.models import Income
from app.services import income_service
from typing import List

router = APIRouter()


@router.get("/month/", response_model=List[Income])
async def get_income_by_month(year: int, month: int):
    incomes = income_service.get_income_by_month(year, month)
    return incomes


@router.get("/year/", response_model=List[Income])
async def get_income_by_year(year: int):
    incomes = income_service.get_income_by_year(year)
    return incomes


@router.get("/custom_range/", response_model=List[Income])
async def get_income_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    incomes = income_service.get_income_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return incomes
