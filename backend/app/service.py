"""Stock Price Prediction Service"""
import pickle
from pathlib import Path
import pandas as pd
import numpy as np
import os
import keras

MODELS_DIR = Path(__file__).resolve().parent.parent / "models"

model = None
company_scalers = None
n_steps = None
prices = None
securities = None


def load_models():
    global model, company_scalers, n_steps, prices, securities
    model = keras.models.load_model(str(MODELS_DIR / "stock_model.h5"))
    with open(MODELS_DIR / "company_scalers.pkl", "rb") as f:
        company_scalers = pickle.load(f)
    with open(MODELS_DIR / "n_steps.pkl", "rb") as f:
        n_steps = pickle.load(f)
    prices = pd.read_csv(MODELS_DIR / "prices.csv")
    securities = pd.read_csv(MODELS_DIR / "securities.csv")


def get_available_companies():
    return list(company_scalers.keys())


def predict_stock(symbol: str, days_to_predict: int = 30):
    symbol = symbol.upper()
    if symbol not in company_scalers:
        available = get_available_companies()
        return {"error": f"Symbol '{symbol}' not available", "available": available[:20]}

    company_data = prices[prices['symbol'] == symbol].copy()
    company_data = company_data.sort_values('date')

    company_info = securities[securities['Ticker symbol'] == symbol]
    company_name = company_info['Security'].values[0] if len(company_info) > 0 else symbol

    scaler = company_scalers[symbol]
    stocks = company_data['close'].values.reshape(-1, 1)
    stocks_scaled = scaler.transform(stocks)

    last_sequence = stocks_scaled[-n_steps:].reshape(1, 1, n_steps)

    predictions = []
    current_sequence = last_sequence.copy()

    for _ in range(days_to_predict):
        pred = model.predict(current_sequence, verbose=0)
        predictions.append(pred[0, 0])
        current_sequence = np.roll(current_sequence, -1)
        current_sequence[0, 0, -1] = pred[0, 0]

    predictions_actual = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))

    last_price = float(stocks[-1][0])
    predicted_price = float(predictions_actual[-1][0])
    change = predicted_price - last_price
    change_pct = ((predicted_price / last_price) - 1) * 100

    return {
        "symbol": symbol,
        "company_name": company_name,
        "last_price": round(last_price, 2),
        "predicted_price": round(predicted_price, 2),
        "change": round(change, 2),
        "change_pct": round(change_pct, 2),
        "predictions": [round(float(p[0]), 2) for p in predictions_actual],
        "days_to_predict": days_to_predict,
    }


def search_stocks(keyword: str, limit: int = 20):
    keyword = keyword.upper()
    results = securities[
        (securities['Ticker symbol'].str.contains(keyword, na=False)) |
        (securities['Security'].str.upper().str.contains(keyword, na=False))
    ]
    output = []
    for _, row in results.head(limit).iterrows():
        symbol = row['Ticker symbol']
        output.append({
            "symbol": symbol,
            "name": row['Security'],
            "available": symbol in company_scalers,
        })
    return output
