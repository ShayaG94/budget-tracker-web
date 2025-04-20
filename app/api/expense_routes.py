from fastapi import APIRouter
from app.models.models import Expense
from datetime import date
from typing import List

router = APIRouter()

expenses = []  # Make sure this is here or handled elsewhere


@router.post("/")
async def create_expense(expense: Expense):
    expense.id = len(expenses) + 1
    expenses.append(expense)
    print("Received expense data:", expense.model_dump_json(indent=2))
    return {"message": "Expense created successfully", "expense_data": expense}


@router.get("/")
async def get_all_expenses():
    return {"expenses": expenses}


@router.get("/by_month/")
async def get_expenses_by_month(year: int, month: int):
    filtered_expenses = [
        expense
        for expense in expenses
        if expense.date.year == year and expense.date.month == month
    ]
    return {"expenses": filtered_expenses}


@router.get("/by_month_range/")
async def get_expenses_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    filtered_expenses = []
    for expense in expenses:
        if expense.date.year > start_year or (
            expense.date.year == start_year and expense.date.month >= start_month
        ):
            if expense.date.year < end_year or (
                expense.date.year == end_year and expense.date.month <= end_month
            ):
                filtered_expenses.append(expense)
    return {"expenses": filtered_expenses}


@router.get("/by_year/")
async def get_expenses_by_year(year: int):
    filtered_expenses = [expense for expense in expenses if expense.date.year == year]
    return {"expenses": filtered_expenses}
