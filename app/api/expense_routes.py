from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from app.models.models import Expense
from app.services import expense_service
from datetime import datetime
from typing import Annotated

router = APIRouter()


@router.post("/", response_model=Expense, status_code=201)
async def create_expense(expense: Expense):
    created_expense = expense_service.create_expense(expense)
    print("Received expense data:", created_expense.model_dump_json(indent=2))
    return created_expense


@router.get("/", response_model=List[Expense])
async def get_expenses():
    expenses = expense_service.get_all_expenses()
    return expenses


@router.get("/by_month/", response_model=List[Expense])
async def get_expenses_by_month(year: int, month: int):
    expenses = expense_service.get_expenses_by_month(year, month)
    return expenses


@router.get("/by_year/", response_model=List[Expense])
async def get_expenses_by_year(year: int):
    expenses = expense_service.get_expenses_by_year(year)
    return expenses


@router.get("/by_month_range/", response_model=List[Expense])
async def get_expenses_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return expenses


@router.get("/by_category/", response_model=List[Expense])
async def get_expenses_by_category(category: str):
    expenses = expense_service.get_expenses_by_category(category)
    return expenses


@router.get("/by_category_and_month/", response_model=List[Expense])
async def get_expenses_by_category_and_month(category: str, year: int, month: int):
    expenses = expense_service.get_expenses_by_category_and_month(category, year, month)
    return expenses


@router.get("/by_category_and_year/", response_model=List[Expense])
async def get_expenses_by_category_and_year(category: str, year: int):
    expenses = expense_service.get_expenses_by_category_and_year(category, year)
    return expenses


@router.get("/by_category_and_month_range/", response_model=List[Expense])
async def get_expenses_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return expenses


@router.get("/by_tag/", response_model=List[Expense])
async def get_expenses_by_tag(tags: List[str] = Depends()):
    expenses = expense_service.get_expenses_by_tag(tags)
    return expenses


@router.get("/by_store/", response_model=List[Expense])
async def get_expenses_by_store(store: str):
    expenses = expense_service.get_expenses_by_store(store)
    return expenses


@router.get("/by_store_and_month/", response_model=List[Expense])
async def get_expenses_by_store_and_month(store: str, year: int, month: int):
    expenses = expense_service.get_expenses_by_store_and_month(store, year, month)
    return expenses


@router.get("/by_store_and_year/", response_model=List[Expense])
async def get_expenses_by_store_and_year(store: str, year: int):
    expenses = expense_service.get_expenses_by_store_and_year(store, year)
    return expenses


@router.get("/by_store_and_month_range/", response_model=List[Expense])
async def get_expenses_by_store_and_month_range(
    store: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_store_and_month_range(
        store, start_year, start_month, end_year, end_month
    )
    return expenses
