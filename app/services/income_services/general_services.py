from pymongo import MongoClient
from typing import List, Optional
from app.models.models import Income
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017/")
db = client["budget_tracker_db"]
income_collection = db["incomes"]


def create_income(income: Income) -> Income:
    income_data = income.model_dump()
    result = income_collection.insert_one(income_data)
    income.id = str(result.inserted_id)
    return income


def get_all_incomes():
    incomes_data = income_collection.find()
    incomes_list = []
    for income in incomes_data:
        income["id"] = str(income.pop("_id"))
        incomes_list.append(Income(**income))
    return incomes_list


def get_income_by_tag(tags: List[str]) -> List[Income]:
    query = {"tags": {"$in": tags}}
    incomes_data = income_collection.find(query)
    incomes_list = [Income(**income) for income in incomes_data]
    return incomes_list


def update_income(income_id: str, income: Income) -> Optional[Income]:
    try:
        object_id = ObjectId(income_id)
    except Exception:
        return None  # Invalid ObjectId

    existing_income = income_collection.find_one({"_id": object_id})
    if not existing_income:
        return None  # Income not found

    updated_data = income.model_dump()
    result = income_collection.update_one({"_id": object_id}, {"$set": updated_data})
    if result.modified_count > 0:
        updated_income = income_collection.find_one({"_id": object_id})
        return Income(**updated_income)  # Return as Income model
    else:
        return None  # Return None if no update happened.


def delete_income(income_id: str) -> Optional[Income]:
    try:
        object_id = ObjectId(income_id)
    except Exception:
        return None  # Invalid ObjectId

    existing_income = income_collection.find_one({"_id": object_id})
    if not existing_income:
        return None  # Income not found

    result = income_collection.delete_one({"_id": object_id})
    if result.deleted_count > 0:
        return Income(**existing_income)
    else:
        return None  # Return None if no deletion happened
