from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class Income(BaseModel):
    date: datetime
    source: str
    category: str
    amount: float
    tags: Optional[List[str]] = None
    attachment: Optional[str] = None


class Expense(BaseModel):
    date: datetime
    store: str
    description: Optional[str] = None
    category: str
    amount: float
    tags: Optional[List[str]] = None
    attachment: Optional[str] = None
