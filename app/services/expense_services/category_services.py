from pymongo import MongoClient
import datetime
from typing import List
from app.models.models import Expense
from app.utils.date_utils import create_date_range_query
from app.utils.type_utils import create_type_query

client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
expense_collection = db["expenses"]


def get_expenses_by_category(category: str) -> List[Expense]:
    query = {"category": create_type_query(category)}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_category_and_month(
    category: str, year: int, month: int
) -> List[Expense]:
    date_query = create_date_range_query(year, month, year, month + 1)
    query = {
        "category": create_type_query(category),
        "date": date_query,
    }
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_category_and_year(category: str, year: int) -> List[Expense]:
    date_query = create_date_range_query(year, 1, year + 1, 1)
    query = {
        "category": create_type_query(category),
        "date": date_query,
    }
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Expense]:
    date_query = create_date_range_query(start_year, start_month, end_year, end_month)
    query = {
        "category": create_type_query(category),
        "date": date_query,
    }
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list
