from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "budget_app"
INCOME_CATEGORY_COLLECTION = "income_categories"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
income_categories_collection = db[INCOME_CATEGORY_COLLECTION]


def add_income_category(category_data, user_id):
    """
    Adds a new income category for a specific user.

    Args:
        category_data (dict): A dictionary containing the category name.
        user_id (str): The ID of the user creating the category.

    Returns:
        pymongo.results.InsertOneResult or None: The result of the insert operation
                                                 or None if an error occurred.
    """
    category_data["user_id"] = user_id
    try:
        result = income_categories_collection.insert_one(category_data)
        return result
    except Exception as e:
        print(f"Error adding income category: {e}")
        return None


def get_income_categories(user_id):
    """
    Retrieves all income categories for a specific user.

    Args:
        user_id (str): The ID of the user.

    Returns:
        list: A list of income category documents.
    """
    query = {"user_id": user_id}
    try:
        categories = list(income_categories_collection.find(query))
        return categories
    except Exception as e:
        print(f"Error getting income categories: {e}")
        return []


if __name__ == "__main__":
    user = "test_user"

    # Add income categories
    salary_category = {"name": "Salary"}
    salary_result = add_income_category(salary_category, user)
    if salary_result:
        print(
            f"Income category '{salary_category['name']}' added with ID: {salary_result.inserted_id}"
        )

    business_category = {"name": "Business"}
    business_result = add_income_category(business_category, user)
    if business_result:
        print(
            f"Income category '{business_category['name']}' added with ID: {business_result.inserted_id}"
        )

    # Get all income categories for the user
    income_categories = get_income_categories(user)
    print("\nIncome categories:")
    for cat in income_categories:
        print(f"- {cat['name']}")

    client.close()
