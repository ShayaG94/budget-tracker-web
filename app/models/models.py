from pydantic import BaseModel
from datetime import date
from typing import Optional


class Income(BaseModel):
    id: Optional[int] = None
    date: date
    source: str
    category: str
    amount: float
    attachment: Optional[str] = None


class Expense(BaseModel):
    id: Optional[int] = None
    date: date
    description: str
    category: str
    amount: float
    attachment: Optional[str] = None
