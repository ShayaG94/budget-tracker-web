from fastapi import APIRouter
from app.models.models import Expense
from app.services import expense_service
from typing import List

router = APIRouter()


@router.get("/month/", response_model=List[Expense])
async def get_expenses_by_month(year: int, month: int):
    expenses = expense_service.get_expenses_by_month(year, month)
    return expenses


@router.get("/year/", response_model=List[Expense])
async def get_expenses_by_year(year: int):
    expenses = expense_service.get_expenses_by_year(year)
    return expenses


@router.get("/custom_range/", response_model=List[Expense])
async def get_expenses_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return expenses
