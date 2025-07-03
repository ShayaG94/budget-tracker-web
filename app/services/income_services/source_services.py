from pymongo import MongoClient
from app.models.models import Income
from typing import List
from app.utils.date_utils import create_date_range_query
from app.utils.type_utils import create_type_query


client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
income_collection = db["incomes"]


def get_income_by_source(source: str) -> List[Income]:
    query = {"source": create_type_query(source)}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_source_and_month(source: str, year: int, month: int) -> List[Income]:
    date_query = create_date_range_query(year, month, year, month + 1)
    query = {
        "source": create_type_query(source),
        "date": date_query,
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_source_and_year(source: str, year: int) -> List[Income]:
    date_query = create_date_range_query(year, 1, year + 1, 1)
    query = {
        "source": create_type_query(source),
        "date": date_query,
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_source_and_month_range(
    source: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Income]:
    date_query = create_date_range_query(start_year, start_month, end_year, end_month)
    query = {
        "source": create_type_query(source),
        "date": date_query,
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list
