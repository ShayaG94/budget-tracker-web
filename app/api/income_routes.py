from fastapi import APIRouter
from app.models.models import Income
from app.services import income_service

router = APIRouter()


@router.post("/")
async def create_income(income: Income):
    created_income = income_service.create_income(income)
    print("Received income data:", created_income.model_dump_json(indent=2))
    return {"message": "Income created successfully", "income_data": created_income}


@router.get("/")
async def get_all_income():
    incomes = income_service.get_all_income()
    return {"incomes": incomes}


@router.get("/by_month/")
async def get_income_by_month(year: int, month: int):
    incomes = income_service.get_income_by_month(year, month)
    return {"incomes": incomes}


@router.get("/by_year/")
async def get_income_by_year(year: int):
    incomes = income_service.get_income_by_year(year)
    return {"incomes": incomes}


@router.get("/by_month_range/")
async def get_income_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    incomes = income_service.get_income_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return {"incomes": incomes}


@router.get("/by_category/")
async def get_income_by_category(category: str):
    incomes = income_service.get_income_by_category(category)
    return {"incomes": incomes}


@router.get("/by_category_and_month/")
async def get_income_by_category_and_month(category: str, year: int, month: int):
    incomes = income_service.get_income_by_category_and_month(category, year, month)
    return {"incomes": incomes}


@router.get("/by_category_and_year/")
async def get_income_by_category_and_year(category: str, year: int):
    incomes = income_service.get_income_by_category_and_year(category, year)
    return {"incomes": incomes}


@router.get("/by_category_and_month_range/")
async def get_income_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    incomes = income_service.get_income_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return {"incomes": incomes}
