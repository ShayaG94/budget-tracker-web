from fastapi import APIRouter
from app.models.models import Expense
from app.services import expense_service
from typing import List

router = APIRouter()


@router.get("/", response_model=List[Expense])
async def get_expenses_by_category(category: str):
    expenses = expense_service.get_expenses_by_category(category)
    return expenses


@router.get("/and_month/", response_model=List[Expense])
async def get_expenses_by_category_and_month(category: str, year: int, month: int):
    expenses = expense_service.get_expenses_by_category_and_month(category, year, month)
    return expenses


@router.get("/and_year/", response_model=List[Expense])
async def get_expenses_by_category_and_year(category: str, year: int):
    expenses = expense_service.get_expenses_by_category_and_year(category, year)
    return expenses


@router.get("/and_month_range/", response_model=List[Expense])
async def get_expenses_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return expenses
