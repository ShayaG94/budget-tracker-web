from datetime import datetime


def create_date_range_query(
    start_year: int, start_month: int, end_year: int, end_month: int
) -> dict:
    start_date = datetime(start_year, start_month, 1)
    if end_month == 12:
        end_date = datetime(end_year + 1, 1, 1)
    else:
        end_date = datetime(end_year, end_month + 1, 1)
    return {"$gte": start_date, "$lt": end_date}
