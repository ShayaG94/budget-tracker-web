def create_type_query(type):
    return {"$regex": f"^{type}$", "$options": "i"}
