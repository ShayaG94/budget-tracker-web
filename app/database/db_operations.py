from pymongo import MongoClient

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017/"  # Default MongoDB URI
DATABASE_NAME = "budget_app"  # Choose a name for your database
TRANSACTION_COLLECTION = "transactions"

# Initialize the MongoDB client
client = MongoClient(MONGO_URI)

# Access the database
db = client[DATABASE_NAME]

# Access the transactions collection
transactions_collection = db[TRANSACTION_COLLECTION]


def add_transaction(transaction_data, user_id):
    """
    Inserts a new transaction into the transactions collection.

    Args:
        transaction_data (dict): A dictionary containing the transaction details
                                  (type, category, amount, date, description,
                                   file, user_id).

    Returns:
        pymongo.results.InsertOneResult or None: The result of the insert operation
                                                 or None if an error occurred.
    """
    try:
        result = transactions_collection.insert_one(transaction_data)
        return result
    except Exception as e:
        print(f"Error adding transaction: {e}")
        return None


if __name__ == "__main__":
    # Example usage:
    new_expense = {
        "type": "expense",
        "category": "Groceries",
        "amount": 52.30,
        "date": "2025-04-21",
        "description": "Weekend grocery run",
        "user_id": "user123",
    }

    user = "test_user"
    insertion_result = add_transaction(new_expense, user)

    if insertion_result:
        print(
            f"Transaction added successfully. Inserted ID: {insertion_result.inserted_id}"
        )
    else:
        print("Failed to add transaction.")

    # You can add more example transactions here

    # Close the MongoDB connection (it's often handled automatically on program exit,
    # but it's good practice to close it explicitly when you're done)
    client.close()
