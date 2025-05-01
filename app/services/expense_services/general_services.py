from pymongo import MongoClient
from typing import List, Optional
from app.models.models import Expense
from bson import ObjectId


client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
expense_collection = db["expenses"]


def create_expense(expense: Expense) -> Expense:
    expense_data = expense.model_dump()
    result = expense_collection.insert_one(expense_data)
    expense.id = str(result.inserted_id)
    return expense


def get_all_expenses():
    expenses_data = expense_collection.find()
    expenses_list = []
    for expense in expenses_data:
        expense["id"] = str(expense.pop("_id"))
        expenses_list.append(Expense(**expense))
    return expenses_list


def get_expenses_by_tag(tags: List[str]) -> List[Expense]:
    query = {"tags": {"$in": tags}}
    expenses_data = expense_collection.find(query)
    expenses_list = [Expense(**expense) for expense in expenses_data]
    return expenses_list


def update_expense(expense_id: str, expense: Expense) -> Optional[Expense]:
    try:
        object_id = ObjectId(expense_id)
    except Exception:
        return None  # Invalid ObjectId

    existing_expense = expense_collection.find_one({"_id": object_id})
    if not existing_expense:
        return None  # Expense not found

    updated_data = expense.model_dump()
    #  updated_data["date"] = updated_data["date"]  # Keep original date
    result = expense_collection.update_one({"_id": object_id}, {"$set": updated_data})
    if result.modified_count > 0:
        updated_expense = expense_collection.find_one({"_id": object_id})
        return Expense(**updated_expense)  # Return as Expense model
    else:
        return None  # Return None if no update happened.


def delete_expense(expense_id: str) -> Optional[Expense]:
    try:
        object_id = ObjectId(expense_id)
    except Exception:
        return None  # Invalid ObjectId

    existing_expense = expense_collection.find_one({"_id": object_id})
    if not existing_expense:
        return None  # Expense not found

    result = expense_collection.delete_one({"_id": object_id})
    if result.deleted_count > 0:
        return Expense(**existing_expense)
    else:
        return None  # Return None if no deletion happened
