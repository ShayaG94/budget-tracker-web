from app.models.models import Income
from datetime import date
from typing import List

incomes: List[Income] = []


def create_income(income: Income) -> Income:
    income.id = len(incomes) + 1
    incomes.append(income)
    return income


def get_all_income() -> List[Income]:
    return incomes


def get_income_by_month(year: int, month: int) -> List[Income]:
    return [
        income
        for income in incomes
        if income.date.year == year and income.date.month == month
    ]


def get_income_by_year(year: int) -> List[Income]:
    return [income for income in incomes if income.date.year == year]


def get_income_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Income]:
    return [
        income
        for income in incomes
        if (
            (income.date.year > start_year)
            or (income.date.year == start_year and income.date.month >= start_month)
        )
        and (
            (income.date.year < end_year)
            or (income.date.year == end_year and income.date.month <= end_month)
        )
    ]


def get_income_by_category(category: str) -> List[Income]:
    return [income for income in incomes if income.category.lower() == category.lower()]


def get_income_by_category_and_month(
    category: str, year: int, month: int
) -> List[Income]:
    return [
        income
        for income in incomes
        if income.category.lower() == category.lower()
        and income.date.year == year
        and income.date.month == month
    ]


def get_income_by_category_and_year(category: str, year: int) -> List[Income]:
    return [
        income
        for income in incomes
        if income.category.lower() == category.lower() and income.date.year == year
    ]


def get_income_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Income]:
    return [
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
