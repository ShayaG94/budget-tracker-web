from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class Income(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    date: datetime
    source: str
    category: str
    amount: float
    tags: Optional[List[str]] = None
    attachment: Optional[str] = None


class Expense(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    date: datetime
    store: str
    description: Optional[str] = None
    category: str
    amount: float
    tags: Optional[List[str]] = None
    attachment: Optional[str] = None
