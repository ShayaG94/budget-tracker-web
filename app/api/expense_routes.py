from fastapi import APIRouter
from app.models.models import Expense
from app.services import expense_service

router = APIRouter()


@router.post("/")
async def create_expense(expense: Expense):
    created_expense = expense_service.create_expense(expense)
    print("Received expense data:", created_expense.model_dump_json(indent=2))
    return {"message": "Expense created successfully", "expense_data": created_expense}


@router.get("/")
async def get_all_expenses():
    expenses = expense_service.get_all_expenses()
    return {"expenses": expenses}


@router.get("/by_month/")
async def get_expenses_by_month(year: int, month: int):
    expenses = expense_service.get_expenses_by_month(year, month)
    return {"expenses": expenses}


@router.get("/by_year/")
async def get_expenses_by_year(year: int):
    expenses = expense_service.get_expenses_by_year(year)
    return {"expenses": expenses}


@router.get("/by_month_range/")
async def get_expenses_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return {"expenses": expenses}


@router.get("/by_category/")
async def get_expenses_by_category(category: str):
    expenses = expense_service.get_expenses_by_category(category)
    return {"expenses": expenses}


@router.get("/by_category_and_month/")
async def get_expenses_by_category_and_month(category: str, year: int, month: int):
    expenses = expense_service.get_expenses_by_category_and_month(category, year, month)
    return {"expenses": expenses}


@router.get("/by_category_and_year/")
async def get_expenses_by_category_and_year(category: str, year: int):
    expenses = expense_service.get_expenses_by_category_and_year(category, year)
    return {"expenses": expenses}


@router.get("/by_category_and_month_range/")
async def get_expenses_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    expenses = expense_service.get_expenses_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return {"expenses": expenses}
