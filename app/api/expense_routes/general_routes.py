from fastapi import APIRouter, Depends, HTTPException
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


@router.put("/{expense_id}", response_model=Expense)
async def update_expense(expense_id: str, expense: Expense):
    updated_expense = general_services.update_expense(expense_id, expense)
    if updated_expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return updated_expense


@router.delete("/{expense_id}", response_model=dict)
async def delete_expense(expense_id: str):
    deleted_expense = general_services.delete_expense(expense_id)
    if deleted_expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"message": "Expense deleted successfully"}
