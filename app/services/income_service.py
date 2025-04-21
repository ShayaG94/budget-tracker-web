from pymongo import MongoClient
from app.models.models import Income
import datetime
from datetime import date
from typing import List

# Initialize MongoDB client and database (adjust connection string as needed)
client = MongoClient("mongodb://localhost:27017/")  # Default MongoDB connection URI
db = client["budget_tracker_db"]  # Replace with your desired database name
income_collection = db["incomes"]  # Collection for income data


def create_income(income: Income) -> Income:
    income_data = income.model_dump()  # Convert Pydantic model to a dictionary
    result = income_collection.insert_one(income_data)
    income.id = str(
        result.inserted_id
    )  # MongoDB generates an ObjectId; convert to string for consistency
    return income


def get_all_income() -> List[Income]:
    incomes_data = income_collection.find()
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_month(year: int, month: int) -> List[Income]:
    start_date = date(year, month, 1)
    start_of_month = datetime.datetime(year, month, 1)
    end_of_month = (
        datetime.datetime(year, month + 1, 1)
        if month < 12
        else datetime.datetime(year + 1, 1, 1)
    )
    query = {"date": {"$gte": start_of_month, "$lt": end_of_month}}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_year(year: int) -> List[Income]:
    start_of_year = datetime.datetime(year, 1, 1)
    end_of_year = datetime.datetime(year + 1, 1, 1)
    query = {"date": {"$gte": start_of_year, "$lt": end_of_year}}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_month_range(
    start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Income]:
    start_date = datetime.datetime(start_year, start_month, 1)
    # Calculate end date of the end month
    if end_month == 12:
        end_date = datetime.datetime(end_year + 1, 1, 1)
    else:
        end_date = datetime.datetime(end_year, end_month + 1, 1)
    query = {"date": {"$gte": start_date, "$lt": end_date}}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category(category: str) -> List[Income]:
    query = {
        "category": {"$regex": f"^{category}$", "$options": "i"}
    }  # Case-insensitive exact match
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category_and_month(
    category: str, year: int, month: int
) -> List[Income]:
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
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category_and_year(category: str, year: int) -> List[Income]:
    start_of_year = datetime.datetime(year, 1, 1)
    end_of_year = datetime.datetime(year + 1, 1, 1)
    query = {
        "category": {"$regex": f"^{category}$", "$options": "i"},
        "date": {"$gte": start_of_year, "$lt": end_of_year},
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_category_and_month_range(
    category: str, start_year: int, start_month: int, end_year: int, end_month: int
) -> List[Income]:
    start_date = datetime.datetime(start_year, start_month, 1)
    if end_month == 12:
        end_date = datetime.datetime(end_year + 1, 1, 1)
    else:
        end_date = datetime.datetime(end_year, end_month + 1, 1)
    query = {
        "category": {"$regex": f"^{category}$", "$options": "i"},
        "date": {"$gte": start_date, "$lt": end_date},
    }
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list
