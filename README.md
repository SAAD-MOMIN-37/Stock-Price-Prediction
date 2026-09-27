# 📈 AI Stock Price Prediction System

![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep%20Learning-FF6F00?style=for-the-badge&logo=tensorflow)
![Git LFS](https://img.shields.io/badge/Git%20LFS-Model%20Storage-2088FF?style=for-the-badge&logo=gitlfs)

> **A full-stack AI-powered stock price forecasting system using GRU + LSTM neural networks, FastAPI, React, and TypeScript.**

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Workflow](#api-workflow)
- [Model Files](#model-files)
- [Application Preview](#application-preview)
- [Future Improvements](#future-improvements)
- [Disclaimer](#disclaimer)
- [Author](#author)
- [Project Highlights](#project-highlights)

---

<a id="overview"></a>
## 🚀 Overview

This project is a full-stack stock price prediction application that combines a deep-learning forecasting model with a modern web interface.

The system allows users to:

- 🔎 Search for available stocks
- 🏢 Browse supported companies
- 📊 Select a stock symbol
- 📅 Configure the forecast horizon
- 🤖 Generate future price predictions
- 📈 Visualize forecasted prices through an interactive line chart
- 📌 View key prediction metrics such as last price, predicted price, and price change

The application separates the **AI inference backend** from the **frontend interface**, providing a clean architecture suitable for further deployment and development.

---

<a id="key-features"></a>
## ✨ Key Features

### 🤖 AI Forecasting

- GRU + LSTM based neural-network forecasting
- Historical time-series based prediction
- Company-specific preprocessing/scaling
- Configurable forecast horizon

### 📊 Market Intelligence Dashboard

- Current/last observed price
- Predicted future price
- Price change visualization
- Forecast line chart
- Stock search functionality
- Supported-company listing

### ⚡ Backend API

- FastAPI-based REST backend
- Separate routing and service layers
- Model loading and inference handled on the backend
- JSON-based API communication

### 🎨 Modern Frontend

- React + TypeScript
- Dark glassmorphism interface
- Responsive dashboard
- Interactive forecast visualization
- Search and prediction controls

---

<a id="system-architecture"></a>
## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + TypeScript  │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │       FastAPI       │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  GRU + LSTM Model   │
                    │   TensorFlow/Keras  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Historical Stock    │
                    │       Data          │
                    └─────────────────────┘
```

---

<a id="machine-learning-pipeline"></a>
## 🧠 Machine Learning Pipeline

```text
Historical Stock Data
        ↓
Data Preprocessing
        ↓
Feature Scaling
        ↓
Time-Series Sequence Creation
        ↓
GRU + LSTM Neural Network
        ↓
Model Inference
        ↓
Inverse Scaling
        ↓
Future Price Prediction
        ↓
Frontend Visualization
```

---

<a id="technology-stack"></a>
## 🛠️ Technology Stack

### Machine Learning

* Python
* TensorFlow / Keras
* GRU
* LSTM
* NumPy
* Pandas
* Scikit-learn

### Backend

* FastAPI
* Python
* REST API

### Frontend

* React
* TypeScript
* Vite
* CSS
* SVG-based chart visualization

### Model & Data Storage

* HDF5 (`.h5`)
* Pickle (`.pkl`)
* CSV
* Git LFS

---

<a id="project-structure"></a>
## 📁 Project Structure

```text
Stock-Price-Prediction/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── router.py
│   │   └── service.py
│   │
│   ├── models/
│   │   ├── company_scalers.pkl
│   │   ├── n_steps.pkl
│   │   ├── prices.csv
│   │   ├── securities.csv
│   │   └── stock_model.h5
│   │
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── stock.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitattributes
├── .gitignore
└── plan.md
```

---

<a id="installation--setup"></a>
## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SAAD-MOMIN-37/Stock-Price-Prediction-.git
cd Stock-Price-Prediction-
```

### 2. Setup Backend

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
python run.py
```

---

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite in your browser.

---

<a id="api-workflow"></a>
## 📡 API Workflow

The frontend communicates with the FastAPI backend through REST endpoints.

Typical workflow:

```text
User selects stock
        ↓
Frontend sends prediction request
        ↓
FastAPI receives request
        ↓
Backend loads preprocessing configuration
        ↓
GRU + LSTM model performs inference
        ↓
Prediction is returned as JSON
        ↓
Frontend renders metrics + forecast chart
```

---

<a id="model-files"></a>
## 📦 Model Files

The trained model and preprocessing artifacts are stored using **Git LFS** because of their binary/model nature.

```text
backend/models/
├── stock_model.h5
├── company_scalers.pkl
└── n_steps.pkl
```

Git LFS is configured through:

```text
.gitattributes
```

with model patterns such as:

```text
*.h5
*.pkl
```

---

<a id="application-preview"></a>
## 🖥️ Application Preview

### AI Market Intelligence Dashboard

The application provides a dark, glass-style interface designed around stock forecasting and market intelligence.

**Core dashboard sections:**

* Stock configuration
* Stock search
* Company selection
* Prediction controls
* Forecast metrics
* Future-price line chart

---

<a id="future-improvements"></a>
## 🔮 Future Improvements

Potential extensions include:

* 📊 Additional technical indicators
* 📈 Historical vs predicted price comparison
* 🧠 Transformer-based forecasting
* 📉 Confidence intervals for predictions
* 🌐 Cloud deployment
* 🔐 Authentication and user portfolios
* 📱 Mobile-responsive optimization
* 📊 Model performance monitoring
* ⚡ Real-time market-data integration

---

<a id="disclaimer"></a>
## ⚠️ Disclaimer

This project is intended for **educational and experimental purposes only**.

Predictions generated by the system should not be considered financial advice or used as the sole basis for investment decisions.

---

<a id="author"></a>
## 👨‍💻 Author

**Saad Momin**

B.E. Computer Engineering — AI & ML

### Connect

* GitHub: [SAAD-MOMIN-37](https://github.com/SAAD-MOMIN-37)
* LinkedIn: [Saad Momin](https://www.linkedin.com/)

---

<a id="project-highlights"></a>
## ⭐ Project Highlights

```text
Full-Stack AI Application
        +
Deep Learning Forecasting
        +
GRU + LSTM
        +
FastAPI REST Backend
        +
React + TypeScript Frontend
        +
Git LFS Model Management
```

If you found this project useful, consider giving the repository a ⭐.
