from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "budget_app"
EXPENSE_CATEGORY_COLLECTION = "expense_categories"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
expense_categories_collection = db[EXPENSE_CATEGORY_COLLECTION]


def add_expense_category(category_data, user_id):
    """
    Adds a new expense category for a specific user.

    Args:
        category_data (dict): A dictionary containing the category name
                               (and optional parent_category).
        user_id (str): The ID of the user creating the category.

    Returns:
        pymongo.results.InsertOneResult or None: The result of the insert operation
                                                 or None if an error occurred.
    """
    category_data["user_id"] = user_id
    try:
        result = expense_categories_collection.insert_one(category_data)
        return result
    except Exception as e:
        print(f"Error adding expense category: {e}")
        return None


def get_expense_categories(user_id, parent_category=None):
    """
    Retrieves expense categories for a specific user, optionally filtered by parent category.

    Args:
        user_id (str): The ID of the user.
        parent_category (str, optional): The name of the parent category to filter by.
                                          Defaults to None (returns top-level categories).

    Returns:
        list: A list of expense category documents.
    """
    query = {"user_id": user_id}
    if parent_category:
        query["parent_category"] = parent_category
    try:
        categories = list(expense_categories_collection.find(query))
        return categories
    except Exception as e:
        print(f"Error getting expense categories: {e}")
        return []


if __name__ == "__main__":
    user = "test_user"

    # Add a top-level category
    new_category = {"name": "Food"}
    result = add_expense_category(new_category, user)
    if result:
        print(
            f"Expense category '{new_category['name']}' added with ID: {result.inserted_id}"
        )

    # Add a sub-category
    new_sub_category = {"name": "Dining Out", "parent_category": "Food"}
    result = add_expense_category(new_sub_category, user)
    if result:
        print(
            f"Expense sub-category '{new_sub_category['name']}' added with ID: {result.inserted_id}"
        )

    # Get all top-level expense categories for the user
    top_level_categories = get_expense_categories(user)
    print("\nTop-level expense categories:")
    for cat in top_level_categories:
        print(f"- {cat['name']}")

    # Get sub-categories for "Food"
    food_sub_categories = get_expense_categories(user, parent_category="Food")
    print("\nSub-categories for 'Food':")
    for sub_cat in food_sub_categories:
        print(f"- {sub_cat['name']}")

    client.close()
