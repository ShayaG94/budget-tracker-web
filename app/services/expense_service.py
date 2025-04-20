from app.models.models import Expense
from datetime import date
from typing import List

expenses: List[Expense] = []


def create_expense(expense: Expense) -> Expense:
    expense.id = len(expenses) + 1
    expenses.append(expense)
    return expense


def get_all_expenses() -> List[Expense]:
    return expenses


def get_expenses_by_month(year: int, month: int) -> List[Expense]:
    return [
        expense
        for expense in expenses
        if expense.date.year == year and expense.date.month == month
    ]


def get_expenses_by_year(year: int) -> List[Expense]:
    return [expense for expense in expenses if expense.date.year == year]


def get_expenses_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Expense]:
    return [
        expense
        for expense in expenses
        if (
            (expense.date.year > start_year)
            or (expense.date.year == start_year and expense.date.month >= start_month)
        )
        and (
            (expense.date.year < end_year)
            or (expense.date.year == end_year and expense.date.month <= end_month)
        )
    ]


def get_expenses_by_category(category: str) -> List[Expense]:
    return [
        expense for expense in expenses if expense.category.lower() == category.lower()
    ]


def get_expenses_by_category_and_month(
    category: str, year: int, month: int
) -> List[Expense]:
    return [
        expense
        for expense in expenses
        if expense.category.lower() == category.lower()
        and expense.date.year == year
        and expense.date.month == month
    ]


def get_expenses_by_category_and_year(category: str, year: int) -> List[Expense]:
    return [
        expense
        for expense in expenses
        if expense.category.lower() == category.lower() and expense.date.year == year
    ]


def get_expenses_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Expense]:
    return [
        expense
        for expense in expenses
        if expense.category.lower() == category.lower()
        and (
            (expense.date.year > start_year)
            or (expense.date.year == start_year and expense.date.month >= start_month)
        )
        and (
            (expense.date.year < end_year)
            or (expense.date.year == end_year and expense.date.month <= end_month)
        )
    ]
