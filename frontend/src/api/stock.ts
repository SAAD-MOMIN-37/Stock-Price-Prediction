import client from './client'

export interface StockPrediction {
  symbol: string
  company_name: string
  last_price: number
  predicted_price: number
  change: number
  change_pct: number
  predictions: number[]
  days_to_predict: number
}

export const predictStock = (symbol: string, days: number = 30) =>
  client.get<StockPrediction>('/api/stock/predict', { params: { symbol, days } })

export const searchStocks = (query: string, limit: number = 20) =>
  client.get<{ results: { symbol: string; name: string; available: boolean }[] }>('/api/stock/search', { params: { query, limit } })

export const getCompanies = (limit: number = 50) =>
  client.get<{ companies: string[]; total: number }>('/api/stock/companies', { params: { limit } })
