from pymongo import MongoClient
from app.models.models import Income
from typing import List

client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
income_collection = db["incomes"]


def create_income(income: Income) -> Income:
    income_data = income.model_dump()
    result = income_collection.insert_one(income_data)
    income.id = str(result.inserted_id)
    return income


def get_all_income() -> List[Income]:
    incomes_data = income_collection.find()
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def get_income_by_tag(tags: List[str]) -> List[Income]:
    query = {"tags": {"$in": tags}}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list
