from fastapi import FastAPI
from app.api import income_routes, expense_routes

app = FastAPI()

app.include_router(income_routes.router, prefix="/income", tags=["Income"])
app.include_router(expense_routes.router, prefix="/expenses", tags=["Expenses"])
