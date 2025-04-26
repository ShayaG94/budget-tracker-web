from fastapi import APIRouter
from . import period_routes
from . import category_routes
from . import store_routes
from . import general_routes

router = APIRouter()

router.include_router(general_routes.router)
router.include_router(period_routes.router, prefix="/period")
router.include_router(category_routes.router, prefix="/category")
router.include_router(store_routes.router, prefix="/store")
