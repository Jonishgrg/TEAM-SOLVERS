import { useState, useEffect } from 'react'

export default function MarketPrices() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/market-prices')
      const data = await response.json()
      setPrices(data.data || [])
    } catch (error) {
      console.error('Error fetching prices:', error)
      setPrices([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPrices = prices.filter(price =>
    price.commodity?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="market-prices-page">
      <h1>Market Prices</h1>
      <p>Real-time prices from Kalimati Market, Kathmandu</p>

      <div className="price-controls">
        <input
          type="text"
          placeholder="Search commodities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchPrices} className="btn-refresh">🔄 Refresh</button>
      </div>

      {loading ? (
        <div className="loading">Loading prices...</div>
      ) : (
        <div className="prices-grid">
          {filteredPrices.slice(0, 12).map((price, idx) => (
            <div key={idx} className="price-card">
              <h3>{price.commodity}</h3>
              <p className="unit">{price.unit}</p>
              <p className="price">₹ {price.price}</p>
              <p className="date">{new Date().toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
