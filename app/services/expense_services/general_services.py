from typing import List
from pymongo import MongoClient
from app.models.models import Expense


client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
expense_collection = db["expenses"]


def create_expense(expense: Expense) -> Expense:
    expense_data = expense.model_dump()
    result = expense_collection.insert_one(expense_data)
    expense.id = str(result.inserted_id)
    return expense


def get_all_expenses() -> List[Expense]:
    expenses_data = expense_collection.find()
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def get_expenses_by_tag(tags: List[str]) -> List[Expense]:
    query = {"tags": {"$in": tags}}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list
