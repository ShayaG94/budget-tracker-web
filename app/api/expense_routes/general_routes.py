from fastapi import APIRouter, Depends
from typing import List
from app.models.models import Expense
from app.services.expense_services import general_services


router = APIRouter()


@router.post("/", response_model=Expense, status_code=201)
async def create_expense(expense: Expense):
    created_expense = general_services.create_expense(expense)
    print("Received expense data:", created_expense.model_dump_json(indent=2))
    return created_expense


@router.get("/", response_model=List[Expense])
async def get_expenses():
    expenses = general_services.get_all_expenses()
    return expenses


@router.get("/tag/", response_model=List[Expense])
async def get_expenses_by_tag(tags: List[str] = Depends()):
    expenses = general_services.get_expenses_by_tag(tags)
    return expenses
