import React, { useState, useEffect } from 'react'
import unleashNFTsAPI from '../../services/unleashNFTsAPI'

const TopDeals = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('price')
  const [blockchain, setBlockchain] = useState('ethereum')

  useEffect(() => {
    fetchTopDeals()
  }, [sortBy, blockchain])

  const fetchTopDeals = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`🔍 Fetching top deals sorted by ${sortBy} on ${blockchain}...`)
      
      const response = await unleashNFTsAPI.getTopDeals(sortBy, blockchain, 20)
      
      if (response && response.data && Array.isArray(response.data)) {
        setDeals(response.data)
        console.log('💎 Top deals data:', response.data.length, 'deals')
      } else {
        setError('No top deals data available from API')
        setDeals([])
      }
      
    } catch (err) {
      console.error('Error fetching top deals:', err)
      setError(`Failed to fetch top deals: ${err.message}`)
      setDeals([])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (!price) return '0 ETH'
    if (price >= 1000) return `${(price / 1000).toFixed(1)}K ETH`
    return `${price.toFixed(3)} ETH`
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  const getRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case 'legendary': return 'text-yellow-400'
      case 'epic': return 'text-purple-400'
      case 'rare': return 'text-blue-400'
      case 'uncommon': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="minimal-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Top NFT Deals</h1>
            <p className="text-gray-400">Discover the hottest NFT deals and transactions</p>
          </div>
          <button
            onClick={fetchTopDeals}
            disabled={loading}
            className="minimal-btn"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="minimal-card">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="minimal-input"
            >
              <option value="price">Price</option>
              <option value="volume">Volume</option>
              <option value="date">Date</option>
              <option value="rarity">Rarity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Blockchain
            </label>
            <select
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value)}
              className="minimal-input"
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="bsc">BSC</option>
              <option value="arbitrum">Arbitrum</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="minimal-alert minimal-alert-danger">
          <p>{error}</p>
          <button
            onClick={fetchTopDeals}
            className="minimal-btn-secondary mt-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="minimal-loading mx-auto mb-4"></div>
          <p className="text-gray-400">Fetching top deals...</p>
        </div>
      )}

      {/* Deals Grid */}
      {!loading && deals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <div key={index} className="minimal-card hover:bg-gray-800 transition-colors">
              {/* NFT Image */}
              {deal.image_url && (
                <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={deal.image_url}
                    alt={deal.name || 'NFT'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}

              {/* Deal Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-white truncate">
                    {deal.name || deal.token_name || `NFT #${deal.token_id || index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">
                    {deal.collection_name || deal.collection || 'Unknown Collection'}
                  </p>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {formatPrice(deal.price || deal.last_sale_price)}
                    </div>
                    <div className="text-xs text-gray-400">Current Price</div>
                  </div>
                  {deal.floor_price && (
                    <div className="text-right">
                      <div className="text-sm text-gray-300">
                        {formatPrice(deal.floor_price)}
                      </div>
                      <div className="text-xs text-gray-400">Floor</div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {deal.rarity && (
                    <div>
                      <div className={`font-medium ${getRarityColor(deal.rarity)}`}>
                        {deal.rarity}
                      </div>
                      <div className="text-gray-400">Rarity</div>
                    </div>
                  )}
                  {deal.rank && (
                    <div>
                      <div className="font-medium text-blue-400">
                        #{deal.rank}
                      </div>
                      <div className="text-gray-400">Rank</div>
                    </div>
                  )}
                  {deal.volume && (
                    <div>
                      <div className="font-medium text-purple-400">
                        {formatNumber(deal.volume)}
                      </div>
                      <div className="text-gray-400">Volume</div>
                    </div>
                  )}
                  {deal.sales_count && (
                    <div>
                      <div className="font-medium text-orange-400">
                        {formatNumber(deal.sales_count)}
                      </div>
                      <div className="text-gray-400">Sales</div>
                    </div>
                  )}
                </div>

                {/* Contract Address */}
                {deal.contract_address && (
                  <div className="pt-2 border-t border-gray-700">
                    <div className="text-xs text-gray-400">Contract</div>
                    <div className="text-xs font-mono text-gray-300 truncate">
                      {deal.contract_address}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Data State */}
      {!loading && deals.length === 0 && !error && (
        <div className="minimal-card text-center py-12">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Deals Found</h3>
          <p className="text-gray-400">
            No top deals available for the selected criteria. Try different filters.
          </p>
        </div>
      )}

      {/* API Status */}
      <div className="minimal-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              deals.length > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm text-gray-400">
              API Status: {deals.length > 0 ? 'Connected' : 'No Data'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {deals.length} deals loaded
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopDeals
