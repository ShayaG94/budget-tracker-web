from fastapi import APIRouter
from app.models.models import Income
from app.services.income_services import source_services
from typing import List

router = APIRouter()


@router.get("/", response_model=List[Income])
async def get_income_by_source(source: str):
    incomes = source_services.get_income_by_source(source)
    return incomes


@router.get("/and_month/", response_model=List[Income])
async def get_income_by_source_and_month(source: str, year: int, month: int):
    incomes = source_services.get_income_by_source_and_month(source, year, month)
    return incomes


@router.get("/and_year/", response_model=List[Income])
async def get_income_by_source_and_year(source: str, year: int):
    incomes = source_services.get_income_by_source_and_year(source, year)
    return incomes


@router.get("/and_month_range/", response_model=List[Income])
async def get_income_by_source_and_month_range(
    source: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    incomes = source_services.get_income_by_source_and_month_range(
        source, start_year, start_month, end_year, end_month
    )
    return incomes
