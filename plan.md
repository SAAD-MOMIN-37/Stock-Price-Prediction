# PRJ Stock Price Prediction - Plan

## Overview
Stock price prediction using GRU + LSTM neural network with multi-company training.

## Current State

### Models
- `backend/models/stock_model.h5` - GRU+LSTM model
- `backend/models/company_scalers.pkl` - Per-company MinMaxScaler dict
- `backend/models/n_steps.pkl` - Sequence length (10)
- `backend/models/prices.csv`, `backend/models/securities.csv` - Datasets
- Root files: `stock_model.h5`, `scaler.pkl`, `n_steps.pkl`, `prices.csv`, `securities.csv`, `company_scalers.pkl`, `stock_weights.keras`

### Data
- `prices.csv` - Historical stock prices (date, symbol, open, high, low, close, volume)
- `securities.csv` - Company info (Ticker symbol, Security)

### Notebooks
- `PRJ Stock Price Prediction Training.ipynb` - Training: loads data, MinMaxScaler per company, GRU+LSTM model, saves model + scalers
- `PRJ Stock Price Prediction Testing.ipynb` - Testing: loads model, predict_stock function with candlestick charts, interactive menu

### Bug
- Training cell 12 uses `scaler.inverse_transform()` but `scaler` is undefined - should use `company_scalers[symbol]` per company. This causes errors in inverse transform.

### Missing
- No backend API
- No frontend

## Tasks

### 1. Fix Training Notebook Bug
- [ ] Cell 12: Replace `scaler` with correct per-company scaler reference
- [ ] Cell 16: Save `company_scalers` instead of generic `scaler`
- [ ] Remove reference to undefined `company_symbol` variable in cell 14

### 2. Create Backend (`backend/`)
- [ ] Create `app/__init__.py`
- [ ] Create `app/main.py` - FastAPI app with CORS
- [ ] Create `app/router.py` - `/api/stock/predict` endpoint
- [ ] Create `app/service.py` - Load Keras model, company_scalers, prediction logic
- [ ] Create `run.py` - uvicorn entry point (port 8004)
- [ ] Create `requirements.txt` (fastapi, uvicorn, tensorflow/keras, pandas, numpy, scikit-learn)

### 3. Create Frontend (`frontend/`)
- [ ] Initialize Vite + React + TypeScript
- [ ] Create `package.json`
- [ ] Create `src/api/client.ts` and `src/api/stock.ts`
- [ ] Create `App.tsx` - Stock symbol input, days to predict, results display
- [ ] Build price prediction chart (using recharts or chart.js)
- [ ] Add CSS styling

### 4. Cleanup
- [ ] Remove duplicate files from root

## Run Commands
```bash
# Backend
cd backend && pip install -r requirements.txt && python run.py

# Frontend
cd frontend && npm install && npm run dev
```