"""Stock Price Prediction FastAPI App"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .service import load_models
from . import service
from .router import router

app = FastAPI(
    title="Stock Price Prediction API",
    description="Stock price prediction using GRU + LSTM neural network",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def startup_event():
    load_models()
    print("Stock model loaded successfully")


@app.get("/")
async def root():
    return {"message": "Stock Price Prediction API", "status": "running", "model_loaded": service.model is not None}


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "model_loaded": service.model is not None,
    }
