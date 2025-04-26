from fastapi import APIRouter, Query
from app.models.models import Income
from app.services import income_service
from typing import List, Optional

router = APIRouter()


@router.post("/", response_model=Income, status_code=201)
async def create_income(income: Income):
    created_income = income_service.create_income(income)
    print("Received income data:", created_income.model_dump())
    return created_income


@router.get("/", response_model=List[Income])
async def get_all_income():
    incomes = income_service.get_all_income()
    return incomes  # Return the list directly


@router.get("/by_month/", response_model=List[Income])
async def get_income_by_month(year: int = Query(...), month: int = Query(...)):
    incomes = income_service.get_income_by_month(year, month)
    return incomes  # Return the list directly


@router.get("/by_year/", response_model=List[Income])
async def get_income_by_year(year: int = Query(...)):
    incomes = income_service.get_income_by_year(year)
    return incomes  # Return the list directly


@router.get("/by_month_range/", response_model=List[Income])
async def get_income_by_month_range(
    start_year: int = Query(...),
    start_month: int = Query(...),
    end_year: int = Query(...),
    end_month: int = Query(...),
):
    incomes = income_service.get_income_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return incomes  # Return the list directly


@router.get("/by_category/", response_model=List[Income])
async def get_income_by_category(category: str = Query(...)):
    incomes = income_service.get_income_by_category(category)
    return incomes  # Return the list directly


@router.get("/by_category_and_month/", response_model=List[Income])
async def get_income_by_category_and_month(
    category: str = Query(...), year: int = Query(...), month: int = Query(...)
):
    incomes = income_service.get_income_by_category_and_month(category, year, month)
    return incomes  # Return the list directly


@router.get("/by_category_and_year/", response_model=List[Income])
async def get_income_by_category_and_year(
    category: str = Query(...), year: int = Query(...)
):
    incomes = income_service.get_income_by_category_and_year(category, year)
    return incomes  # Return the list directly


@router.get("/by_category_and_month_range/", response_model=List[Income])
async def get_income_by_category_and_month_range(
    category: str = Query(...),
    start_year: int = Query(...),
    start_month: int = Query(...),
    end_year: int = Query(...),
    end_month: int = Query(...),
):
    incomes = income_service.get_income_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return incomes  # Return the list directly


@router.get("/by_source/", response_model=List[Income])
async def get_income_by_source(source: str = Query(...)):
    incomes = income_service.get_income_by_source(source)
    return incomes  # Return the list directly


@router.get("/by_tag/", response_model=List[Income])
async def get_income_by_tag(tags: List[str] = Query(...)):
    incomes = income_service.get_income_by_tag(tags)
    return incomes  # Return the list directly


from fastapi import APIRouter, Query
from app.models.models import Income
from app.services import income_service
from typing import List, Optional

router = APIRouter()


@router.post("/", response_model=Income, status_code=201)
async def create_income(income: Income):
    created_income = income_service.create_income(income)
    print("Received income data:", created_income.model_dump())
    return created_income


@router.get("/", response_model=List[Income])
async def get_all_income():
    incomes = income_service.get_all_income()
    return incomes  # Return the list directly


@router.get("/by_month/", response_model=List[Income])
async def get_income_by_month(year: int = Query(...), month: int = Query(...)):
    incomes = income_service.get_income_by_month(year, month)
    return incomes  # Return the list directly


@router.get("/by_year/", response_model=List[Income])
async def get_income_by_year(year: int = Query(...)):
    incomes = income_service.get_income_by_year(year)
    return incomes  # Return the list directly


@router.get("/by_month_range/", response_model=List[Income])
async def get_income_by_month_range(
    start_year: int = Query(...),
    start_month: int = Query(...),
    end_year: int = Query(...),
    end_month: int = Query(...),
):
    incomes = income_service.get_income_by_month_range(
        start_year, start_month, end_year, end_month
    )
    return incomes  # Return the list directly


@router.get("/by_category/", response_model=List[Income])
async def get_income_by_category(category: str = Query(...)):
    incomes = income_service.get_income_by_category(category)
    return incomes  # Return the list directly


@router.get("/by_category_and_month/", response_model=List[Income])
async def get_income_by_category_and_month(
    category: str = Query(...), year: int = Query(...), month: int = Query(...)
):
    incomes = income_service.get_income_by_category_and_month(category, year, month)
    return incomes  # Return the list directly


@router.get("/by_category_and_year/", response_model=List[Income])
async def get_income_by_category_and_year(
    category: str = Query(...), year: int = Query(...)
):
    incomes = income_service.get_income_by_category_and_year(category, year)
    return incomes  # Return the list directly


@router.get("/by_category_and_month_range/", response_model=List[Income])
async def get_income_by_category_and_month_range(
    category: str = Query(...),
    start_year: int = Query(...),
    start_month: int = Query(...),
    end_year: int = Query(...),
    end_month: int = Query(...),
):
    incomes = income_service.get_income_by_category_and_month_range(
        category, start_year, start_month, end_year, end_month
    )
    return incomes  # Return the list directly


@router.get("/by_source/", response_model=List[Income])
async def get_income_by_source(source: str = Query(...)):
    incomes = income_service.get_income_by_source(source)
    return incomes  # Return the list directly


@router.get("/by_tag/", response_model=List[Income])
async def get_income_by_tag(tags: List[str] = Query(...)):
    incomes = income_service.get_income_by_tag(tags)
    return incomes  # Return the list directly
