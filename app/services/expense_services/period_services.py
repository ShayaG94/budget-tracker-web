from pymongo import MongoClient
from app.models.models import Expense
from typing import List
from app.utils.date_utils import create_date_range_query

client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
expense_collection = db["expenses"]


def get_expenses_by_month(year: int, month: int) -> List[Expense]:
    date_query = create_date_range_query(year, month, year, month + 1)
    query = {"date": date_query}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_year(year: int) -> List[Expense]:
    date_query = create_date_range_query(year, 1, year + 1, 1)
    query = {"date": date_query}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Expense]:
    date_query = create_date_range_query(start_year, start_month, end_year, end_month)
    query = {"date": date_query}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list
