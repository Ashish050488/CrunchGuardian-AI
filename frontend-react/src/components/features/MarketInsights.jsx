import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import unleashNFTsAPI from '../../services/unleashNFTsAPI'

const MarketInsights = () => {
  const [marketData, setMarketData] = useState(null)
  const [topDeals, setTopDeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('analytics')

  useEffect(() => {
    fetchMarketInsights()
  }, [])

  const fetchMarketInsights = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('🔍 Fetching comprehensive market insights...')
      
      // Fetch multiple market insights endpoints
      const [analytics, washtrade, holders, traders, scores] = await Promise.allSettled([
        unleashNFTsAPI.getMarketInsightsAnalytics(),
        unleashNFTsAPI.getMarketInsightsWashtrade(),
        unleashNFTsAPI.getMarketInsightsHolders(),
        unleashNFTsAPI.getMarketInsightsTraders(),
        unleashNFTsAPI.getMarketInsightsScores()
      ])

      // Process successful responses
      const marketInsights = {
        analytics: analytics.status === 'fulfilled' ? analytics.value : null,
        washtrade: washtrade.status === 'fulfilled' ? washtrade.value : null,
        holders: holders.status === 'fulfilled' ? holders.value : null,
        traders: traders.status === 'fulfilled' ? traders.value : null,
        scores: scores.status === 'fulfilled' ? scores.value : null
      }

      setMarketData(marketInsights)
      console.log('📊 Market insights data:', marketInsights)

      // Fetch top deals with proper parameters
      try {
        const dealsResponse = await unleashNFTsAPI.getTopDeals('price', 'ethereum', 20)
        if (dealsResponse && dealsResponse.data) {
          setTopDeals(dealsResponse.data.slice(0, 10))
        }
      } catch (dealsError) {
        console.log('⚠️ Top deals API requires specific parameters:', dealsError.message)
      }

    } catch (err) {
      console.error('Error fetching market insights:', err)
      setError(`Failed to fetch market insights: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
    return num.toLocaleString()
  }

  const renderAnalytics = () => {
    if (!marketData?.analytics?.data) return <div className="text-gray-400">No analytics data available</div>

    const data = marketData.analytics.data[0] || {}
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="minimal-card text-center">
            <div className="text-2xl font-bold text-blue-400">
              {formatNumber(data.total_volume)}
            </div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="minimal-card text-center">
            <div className="text-2xl font-bold text-green-400">
              {formatNumber(data.total_items)}
            </div>
            <div className="text-sm text-gray-400">Total Items</div>
          </div>
          <div className="minimal-card text-center">
            <div className="text-2xl font-bold text-purple-400">
              {data.block_dates ? data.block_dates.length : 0}
            </div>
            <div className="text-sm text-gray-400">Active Days</div>
          </div>
          <div className="minimal-card text-center">
            <div className="text-2xl font-bold text-orange-400">
              {formatNumber(data.avg_price)}
            </div>
            <div className="text-sm text-gray-400">Avg Price</div>
          </div>
        </div>

        {data.block_dates && data.block_dates.length > 0 && (
          <div className="minimal-card">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="grid grid-cols-7 gap-2">
              {data.block_dates.slice(-14).map((date, index) => (
                <div key={index} className="text-center p-2 bg-gray-800 rounded">
                  <div className="text-xs text-gray-400">
                    {new Date(date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderWashTrade = () => {
    if (!marketData?.washtrade?.data || marketData.washtrade.data.length === 0) {
      return <div className="text-gray-400">No wash trading data available</div>
    }

    return (
      <div className="space-y-4">
        {marketData.washtrade.data.slice(0, 10).map((item, index) => (
          <div key={index} className="minimal-card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white">
                  {item.name || `Wash Trade #${index + 1}`}
                </h3>
                <p className="text-sm text-gray-400">
                  Level: {item.washtrade_level || 'Unknown'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-red-400 font-bold">
                  {((item.wash_trading_score || 0) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Wash Score</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderHolders = () => {
    if (!marketData?.holders?.data) return <div className="text-gray-400">No holders data available</div>

    const data = marketData.holders.data[0] || {}
    
    return (
      <div className="minimal-card">
        <h3 className="text-lg font-semibold mb-4">Holder Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xl font-bold text-blue-400">
              {formatNumber(data.unique_holders)}
            </div>
            <div className="text-sm text-gray-400">Unique Holders</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-400">
              {formatNumber(data.total_holdings)}
            </div>
            <div className="text-sm text-gray-400">Total Holdings</div>
          </div>
        </div>
      </div>
    )
  }

  const renderTraders = () => {
    if (!marketData?.traders?.data) return <div className="text-gray-400">No traders data available</div>

    const data = marketData.traders.data[0] || {}
    
    return (
      <div className="minimal-card">
        <h3 className="text-lg font-semibold mb-4">Trader Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xl font-bold text-purple-400">
              {formatNumber(data.active_traders)}
            </div>
            <div className="text-sm text-gray-400">Active Traders</div>
          </div>
          <div>
            <div className="text-xl font-bold text-orange-400">
              {formatNumber(data.trading_volume)}
            </div>
            <div className="text-sm text-gray-400">Trading Volume</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="minimal-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Market Insights</h1>
            <p className="text-gray-400">Real-time NFT market analytics and intelligence</p>
          </div>
          <button
            onClick={fetchMarketInsights}
            disabled={loading}
            className="minimal-btn"
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="minimal-alert minimal-alert-danger">
          <p>{error}</p>
          <button
            onClick={fetchMarketInsights}
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
          <p className="text-gray-400">Fetching market insights...</p>
        </div>
      )}

      {/* Tabs */}
      {!loading && marketData && (
        <>
          <div className="minimal-nav p-4 rounded-lg">
            <div className="flex space-x-2">
              {[
                { id: 'analytics', name: 'Analytics', icon: '📊' },
                { id: 'washtrade', name: 'Wash Trading', icon: '🚫' },
                { id: 'holders', name: 'Holders', icon: '👥' },
                { id: 'traders', name: 'Traders', icon: '💼' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`minimal-nav-item flex items-center space-x-2 ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'washtrade' && renderWashTrade()}
            {activeTab === 'holders' && renderHolders()}
            {activeTab === 'traders' && renderTraders()}
          </div>
        </>
      )}

      {/* API Status */}
      {marketData && (
        <div className="minimal-card">
          <h3 className="text-lg font-semibold mb-4">API Data Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(marketData).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  value && value.data ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="text-sm capitalize">{key}</div>
                <div className="text-xs text-gray-400">
                  {value && value.data ? 'Available' : 'No Data'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketInsights
