from fastapi import APIRouter
from app.models.models import Income
from datetime import date
from typing import List

router = APIRouter()

incomes = []  # Make sure this is here or handled elsewhere if you plan to persist data


@router.post("/")
async def create_income(income: Income):
    income.id = len(incomes) + 1
    incomes.append(income)
    print("Received income data:", income.model_dump_json(indent=2))
    return {"message": "Income created successfully", "income_data": income}


@router.get("/")
async def get_all_income():
    return {"incomes": incomes}


@router.get("/by_month/")
async def get_income_by_month(year: int, month: int):
    filtered_incomes = [
        income
        for income in incomes
        if income.date.year == year and income.date.month == month
    ]
    return {"incomes": filtered_incomes}


@router.get("/by_month_range/")
async def get_income_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
):
    filtered_incomes = []
    for income in incomes:
        if income.date.year > start_year or (
            income.date.year == start_year and income.date.month >= start_month
        ):
            if income.date.year < end_year or (
                income.date.year == end_year and income.date.month <= end_month
            ):
                filtered_incomes.append(income)
    return {"incomes": filtered_incomes}


@router.get("/by_year/")
async def get_income_by_year(year: int):
    filtered_incomes = [income for income in incomes if income.date.year == year]
    return {"incomes": filtered_incomes}


@router.get("/by_category/")
async def get_income_by_category(category: str):
    filtered_incomes = [
        income for income in incomes if income.category.lower() == category.lower()
    ]
    return {"incomes": filtered_incomes}


@router.get("/by_category_and_month/")
async def get_income_by_category_and_month(category: str, year: int, month: int):
    filtered_incomes = [
        income
        for income in incomes
        if income.category.lower() == category.lower()
        and income.date.year == year
        and income.date.month == month
    ]
    return {"incomes": filtered_incomes}


@router.get("/by_category_and_year/")
async def get_income_by_category_and_year(category: str, year: int):
    filtered_incomes = [
        income
        for income in incomes
        if income.category.lower() == category.lower() and income.date.year == year
    ]
    return {"incomes": filtered_incomes}


@router.get("/by_category_and_month_range/")
async def get_income_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
):
    filtered_incomes = [
        income
        for income in incomes
        if income.category.lower() == category.lower()
        and (
            (income.date.year > start_year)
            or (income.date.year == start_year and income.date.month >= start_month)
        )
        and (
            (income.date.year < end_year)
            or (income.date.year == end_year and income.date.month <= end_month)
        )
    ]
    return {"incomes": filtered_incomes}
