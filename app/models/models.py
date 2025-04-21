from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class Income(BaseModel):
    id: Optional[int] = None
    date: datetime
    source: str
    category: str
    amount: float
    attachment: Optional[str] = None


class Expense(BaseModel):
    id: Optional[int] = None
    date: datetime
    description: str
    category: str
    amount: float
    attachment: Optional[str] = None
