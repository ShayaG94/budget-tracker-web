from fastapi import FastAPI
from app.api import income_routes, expense_routes  # Import the routers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(income_routes.router, prefix="/incomes")
app.include_router(expense_routes.router, prefix="/expenses")


@app.get("/")
async def root():
    return {"message": "Welcome to the Budget Tracker API"}
