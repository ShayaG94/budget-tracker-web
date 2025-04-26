from pymongo import MongoClient
import datetime
from typing import List
from app.models.models import Expense

client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
expense_collection = db["expenses"]


def get_expenses_by_category(category: str) -> List[Expense]:
    query = {"category": {"$regex": f"^{category}$", "$options": "i"}}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_category_and_month(
    category: str, year: int, month: int
) -> List[Expense]:
    start_of_month = datetime.datetime(year, month, 1)
    end_of_month = (
        datetime.datetime(year, month + 1, 1)
        if month < 12
        else datetime.datetime(year + 1, 1, 1)
    )
    query = {
        "category": {"$regex": f"^{category}$", "$options": "i"},
        "date": {"$gte": start_of_month, "$lt": end_of_month},
    }
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_category_and_year(category: str, year: int) -> List[Expense]:
    start_of_year = datetime.datetime(year, 1, 1)
    end_of_year = datetime.datetime(year + 1, 1, 1)
    query = {
        "category": {"$regex": f"^{category}$", "$options": "i"},
        "date": {"$gte": start_of_year, "$lt": end_of_year},
    }
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Expense]:
    start_date = datetime.datetime(start_year, start_month, 1)
    if end_month == 12:
        end_date = datetime.datetime(end_year + 1, 1, 1)
    else:
        end_date = datetime.datetime(end_year, end_month + 1, 1)
    query = {
        "category": {"$regex": f"^{category}$", "$options": "i"},
        "date": {"$gte": start_date, "$lt": end_date},
    }
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list
