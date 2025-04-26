from fastapi import APIRouter
from app.models.models import Expense
from app.services.expense_services import store_services
from typing import List

router = APIRouter()


@router.get("/", response_model=List[Expense])
async def get_expenses_by_store(store: str):
    expenses = store_services.get_expenses_by_store(store)
    return expenses


@router.get("/and_month/", response_model=List[Expense])
async def get_expenses_by_store_and_month(store: str, year: int, month: int):
    expenses = store_services.get_expenses_by_store_and_month(store, year, month)
    return expenses


@router.get("/and_year/", response_model=List[Expense])
async def get_expenses_by_store_and_year(store: str, year: int):
    expenses = store_services.get_expenses_by_store_and_year(store, year)
    return expenses


@router.get("/and_month_range/", response_model=List[Expense])
async def get_expenses_by_store_and_month_range(
    store: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = store_services.get_expenses_by_store_and_month_range(
        store, start_year, start_month, end_year, end_month
    )
    return expenses
