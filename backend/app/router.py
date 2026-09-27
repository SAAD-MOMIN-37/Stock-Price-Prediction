"""Stock Price Prediction API Router"""
from fastapi import APIRouter, HTTPException, Query
from .service import predict_stock, search_stocks, get_available_companies

router = APIRouter(prefix="/api/stock", tags=["Stock Price Prediction"])


@router.get("/predict")
async def predict(symbol: str = Query(...), days: int = Query(30)):
    result = predict_stock(symbol, days)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result


@router.get("/search")
async def search(query: str = Query(...), limit: int = Query(20)):
    return {"results": search_stocks(query, limit)}


@router.get("/companies")
async def companies(limit: int = Query(50)):
    all_companies = get_available_companies()
    return {"companies": all_companies[:limit], "total": len(all_companies)}
