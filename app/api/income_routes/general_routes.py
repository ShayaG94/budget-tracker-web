from fastapi import APIRouter, HTTPException
from app.models.models import Income
from app.services.income_services import general_services
from typing import List

router = APIRouter()


@router.post("/", response_model=Income, status_code=201)
async def create_income(income: Income):
    created_income = general_services.create_income(income)
    print("Received income data:", created_income.model_dump())
    return created_income


@router.get("/", response_model=List[Income])
async def get_all_incomes():
    incomes = general_services.get_all_incomes()
    return incomes


@router.get("/{income_id}", response_model=dict)
async def get_income(income_id):
    income = general_services.get_income(income_id)
    income["_id"] = str(income["_id"])
    return income


@router.get("/tag/", response_model=List[Income])
async def get_income_by_tag(tags: List[str]):
    incomes = general_services.get_income_by_tag(tags)
    return incomes


@router.put("/{income_id}", response_model=Income)
async def update_income(income_id: str, income: Income):
    updated_income = general_services.update_income(income_id, income)
    if updated_income is None:
        raise HTTPException(status_code=404, detail="Income not found")
    return updated_income


@router.delete("/{income_id}", response_model=dict)
async def delete_income(income_id: str):
    deleted_income = general_services.delete_income(income_id)
    if deleted_income is None:
        raise HTTPException(status_code=404, detail="Income not found")
    return {"message": "Income deleted successfully"}
