from fastapi import FastAPI
from app.api import budget_routes  # We'll create this file next

app = FastAPI()

app.include_router(budget_routes.router)
