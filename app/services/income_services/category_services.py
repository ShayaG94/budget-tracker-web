from pymongo import MongoClient
from app.models.models import Income
import datetime
from typing import List
from app.utils.date_utils import create_date_range_query
from app.utils.type_utils import create_type_query

client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
income_collection = db["incomes"]


def get_income_by_category(category: str) -> List[Income]:
    query = {"category": create_type_query(category)}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category_and_month(
    category: str, year: int, month: int
) -> List[Income]:
    date_query = create_date_range_query(year, month, year, month)
    query = {
        "category": create_type_query(category),
        "date": date_query,
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category_and_year(category: str, year: int) -> List[Income]:
    date_query = create_date_range_query(year, 1, year + 1, 1)
    query = {
        "category": create_type_query(category),
        "date": date_query,
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Income]:
    date_query = create_date_range_query(start_year, start_month, end_year, end_month)
    query = {
        "category": create_type_query(category),
        "date": date_query,
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list
