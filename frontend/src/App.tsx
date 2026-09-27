import { useState } from 'react'
import {
  predictStock,
  searchStocks,
  getCompanies,
  StockPrediction,
} from './api/stock'
import './App.css'

function App() {
  const [symbol, setSymbol] = useState('AAPL')
  const [days, setDays] = useState(30)
  const [result, setResult] = useState<StockPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<any[] | null>(null)

  const handlePredict = async () => {
    if (!symbol.trim()) return

    setLoading(true)
    setError(null)
    setSearchResults(null)

    try {
      const res = await predictStock(
        symbol.toUpperCase(),
        days
      )

      setResult(res.data)
    } catch (err: any) {
      console.error('Prediction error:', err)

      setError(
        err?.response?.data?.detail ||
        err?.message ||
        'Prediction failed'
      )

      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!symbol.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await searchStocks(
        symbol.toUpperCase(),
        20
      )

      setSearchResults(res.data.results)
    } catch (err: any) {
      console.error('Search error:', err)

      setError(
        err?.response?.data?.detail ||
        err?.message ||
        'Search failed'
      )

      setSearchResults(null)
    } finally {
      setLoading(false)
    }
  }

  const handleListCompanies = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await getCompanies(50)

      setSearchResults(
        res.data.companies.map((company: string) => ({
          symbol: company,
          name: '',
        }))
      )
    } catch (err: any) {
      console.error('Companies error:', err)

      setError(
        err?.response?.data?.detail ||
        err?.message ||
        'Failed to load companies'
      )

      setSearchResults(null)
    } finally {
      setLoading(false)
    }
  }

  const isPositive = result
    ? result.change > 0
    : false

  return (
    <div className="app">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="app-header">

        <div className="brand-mark">
          ↗
        </div>

        <div className="eyebrow">
          AI MARKET INTELLIGENCE
        </div>

        <h1>
          Stock Price Prediction
        </h1>

        <p>
          Neural-network based forecasting powered by GRU + LSTM
        </p>

      </header>


      <main className="app-main">

        {/* =====================================================
            CONTROL PANEL
            ===================================================== */}

        <section className="glass-card control-panel">

          <div className="section-top">

            <div>

              <span className="section-kicker">
                FORECAST CONFIGURATION
              </span>

              <h2>
                Configure Prediction
              </h2>

            </div>

            <span className="status-dot">
              MODEL READY
            </span>

          </div>


          <div className="input-grid">

            {/* Stock Symbol */}

            <div className="input-group">

              <label htmlFor="symbol">
                Stock Symbol
              </label>

              <div className="input-shell">

                <span className="input-prefix">
                  $
                </span>

                <input
                  id="symbol"
                  type="text"
                  value={symbol}
                  onChange={(e) =>
                    setSymbol(
                      e.target.value.toUpperCase()
                    )
                  }
                  placeholder="AAPL"
                  disabled={loading}
                />

              </div>

            </div>


            {/* Forecast Horizon */}

            <div className="input-group">

              <label htmlFor="days">
                Forecast Horizon
              </label>

              <div className="input-shell">

                <input
                  id="days"
                  type="number"
                  value={days}
                  onChange={(e) =>
                    setDays(
                      parseInt(e.target.value) || 1
                    )
                  }
                  min={1}
                  max={60}
                  disabled={loading}
                />

                <span className="input-suffix">
                  days
                </span>

              </div>

            </div>

          </div>


          {/* Actions */}

          <div className="action-row">

            <button
              className="btn-primary"
              onClick={handlePredict}
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner" />
                  Predicting...
                </>
              ) : (
                <>
                  Predict Price
                  <span>→</span>
                </>
              )}

            </button>


            <button
              className="btn-secondary"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </button>


            <button
              className="btn-secondary"
              onClick={handleListCompanies}
              disabled={loading}
            >
              Companies
            </button>

          </div>

        </section>


        {/* =====================================================
            ERROR
            ===================================================== */}

        {error && (
          <div className="error-box">

            <span>
              !
            </span>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* =====================================================
            SEARCH RESULTS
            ===================================================== */}

        {searchResults && (
          <section className="glass-card results-list">

            <div className="section-heading">

              <div>

                <span className="section-kicker">
                  MARKET SEARCH
                </span>

                <h2>
                  Available Stocks
                </h2>

              </div>

              <span className="result-count">
                {searchResults.length} results
              </span>

            </div>


            <ul>

              {searchResults.map(
                (item, index) => (

                  <li key={index}>

                    <span className="stock-symbol">
                      {item.symbol}
                    </span>

                    {item.name && (
                      <span className="stock-company">
                        {item.name}
                      </span>
                    )}

                  </li>

                )
              )}

            </ul>

          </section>
        )}


        {/* =====================================================
            PREDICTION RESULT
            ===================================================== */}

        {result && (
          <section className="glass-card prediction-result">

            {/* Prediction Header */}

            <div className="prediction-header">

              <div>

                <span className="section-kicker">
                  FORECAST RESULT
                </span>

                <h2>
                  {result.company_name}
                </h2>

                <span className="symbol-tag">
                  {result.symbol}
                </span>

              </div>


              <div
                className={`change-badge ${
                  isPositive
                    ? 'positive'
                    : 'negative'
                }`}
              >

                <span>
                  {isPositive ? '↑' : '↓'}
                </span>

                {result.change_pct.toFixed(2)}%

              </div>

            </div>


            {/* =================================================
                METRICS
                ================================================= */}

            <div className="price-grid">

              {/* Last Price */}

              <div className="metric-card">

                <span className="metric-label">
                  LAST PRICE
                </span>

                <strong>
                  ${result.last_price.toFixed(2)}
                </strong>

              </div>


              {/* Predicted Price */}

              <div className="metric-card featured">

                <span className="metric-label">
                  PREDICTED PRICE
                </span>

                <strong>
                  ${result.predicted_price.toFixed(2)}
                </strong>

              </div>


              {/* Price Change */}

              <div className="metric-card">

                <span className="metric-label">
                  PRICE CHANGE
                </span>

                <strong
                  className={
                    isPositive
                      ? 'text-positive'
                      : 'text-negative'
                  }
                >
                  {isPositive ? '+' : ''}
                  ${result.change.toFixed(2)}
                </strong>

              </div>

            </div>


            {/* =================================================
                LINE CHART
                ================================================= */}

            <div className="chart-container">

              <div className="chart-header">

                <div>

                  <span className="section-kicker">
                    MODEL OUTPUT
                  </span>

                  <h3>
                    Next {result.days_to_predict} Days
                  </h3>

                </div>

                <span className="chart-badge">
                  GRU + LSTM
                </span>

              </div>


              {(() => {

                /*
                 * Include today's actual price
                 * followed by all predicted prices.
                 */
                const chartValues = [
                  result.last_price,
                  ...result.predictions,
                ]


                const minPrice = Math.min(
                  ...chartValues
                )

                const maxPrice = Math.max(
                  ...chartValues
                )


                /*
                 * SVG coordinate system
                 */
                const chartWidth = 1000
                const chartHeight = 300

                const paddingX = 35
                const paddingY = 30

                const usableWidth =
                  chartWidth -
                  paddingX * 2

                const usableHeight =
                  chartHeight -
                  paddingY * 2


                /*
                 * Convert prices into SVG points.
                 */
                const points = chartValues.map(
                  (price, index) => {

                    const x =
                      paddingX +
                      (index /
                        (chartValues.length - 1)) *
                        usableWidth


                    const normalized =
                      (price - minPrice) /
                      (maxPrice - minPrice || 1)


                    const y =
                      chartHeight -
                      paddingY -
                      normalized *
                        usableHeight


                    return {
                      x,
                      y,
                      price,
                    }

                  }
                )


                /*
                 * Polyline points
                 */
                const linePoints =
                  points
                    .map(
                      (point) =>
                        `${point.x},${point.y}`
                    )
                    .join(' ')


                /*
                 * Area below the line.
                 */
                const areaPoints = [
                  `${points[0].x},${
                    chartHeight - paddingY
                  }`,

                  ...points.map(
                    (point) =>
                      `${point.x},${point.y}`
                  ),

                  `${points[points.length - 1].x},${
                    chartHeight - paddingY
                  }`,
                ].join(' ')


                return (
                  <div className="line-chart">

                    {/* Y-axis scale */}

                    <div className="chart-scale">

                      <span>
                        ${maxPrice.toFixed(2)}
                      </span>

                      <span>
                        ${
                          (
                            (maxPrice +
                              minPrice) /
                            2
                          ).toFixed(2)
                        }
                      </span>

                      <span>
                        ${minPrice.toFixed(2)}
                      </span>

                    </div>


                    {/* SVG Chart */}

                    <svg
                      className="forecast-svg"
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      preserveAspectRatio="none"
                    >

                      {/* Top Grid */}

                      <line
                        x1={paddingX}
                        y1={paddingY}
                        x2={
                          chartWidth -
                          paddingX
                        }
                        y2={paddingY}
                        className="chart-grid-line"
                      />


                      {/* Middle Grid */}

                      <line
                        x1={paddingX}
                        y1={
                          chartHeight / 2
                        }
                        x2={
                          chartWidth -
                          paddingX
                        }
                        y2={
                          chartHeight / 2
                        }
                        className="chart-grid-line"
                      />


                      {/* Bottom Grid */}

                      <line
                        x1={paddingX}
                        y1={
                          chartHeight -
                          paddingY
                        }
                        x2={
                          chartWidth -
                          paddingX
                        }
                        y2={
                          chartHeight -
                          paddingY
                        }
                        className="chart-grid-line"
                      />


                      {/* Area under forecast */}

                      <polygon
                        points={areaPoints}
                        className="chart-area"
                      />


                      {/* Forecast Line */}

                      <polyline
                        points={linePoints}
                        fill="none"
                        className="forecast-line"
                      />


                      {/* Data Points */}

                      {points.map(
                        (point, index) => (

                          <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r={
                              index === 0
                                ? 5
                                : 3.5
                            }
                            className={
                              index === 0
                                ? 'chart-point current'
                                : 'chart-point'
                            }
                          >

                            <title>
                              Day{' '}
                              {index === 0
                                ? 0
                                : index}
                              : $
                              {point.price.toFixed(
                                2
                              )}
                            </title>

                          </circle>

                        )
                      )}

                    </svg>


                    {/* X-axis */}

                    <div className="chart-axis">

                      <span>
                        Today
                      </span>

                      <span>
                        Day{' '}
                        {Math.round(
                          result.days_to_predict /
                            2
                        )}
                      </span>

                      <span>
                        Day{' '}
                        {result.days_to_predict}
                      </span>

                    </div>

                  </div>
                )

              })()}

            </div>

          </section>
        )}

      </main>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="app-footer">

        <span>
          AI • MACHINE LEARNING • TIME SERIES
        </span>

        <p>
          For educational purposes only. Not financial advice.
        </p>

      </footer>

    </div>
  )
}

export default App