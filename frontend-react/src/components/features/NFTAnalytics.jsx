import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'

const NFTAnalysisCard = ({ analysis }) => (
  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
        <p className="text-slate-400">{analysis.collection}</p>
        <p className="text-xs text-slate-500 font-mono mt-1">{analysis.contractAddress}</p>
      </div>
      <div className="text-right">
        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
          analysis.riskScore >= 70 ? 'bg-red-500/20 text-red-400' :
          analysis.riskScore >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          Risk: {analysis.riskScore}/100
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-sm text-slate-400 mb-1">Current Value</p>
        <p className="text-xl font-bold text-white">${analysis.currentValue?.toLocaleString()}</p>
      </div>
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-sm text-slate-400 mb-1">Floor Price</p>
        <p className="text-xl font-bold text-white">${analysis.floorPrice?.toLocaleString()}</p>
      </div>
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-sm text-slate-400 mb-1">Volume (24h)</p>
        <p className="text-xl font-bold text-white">${analysis.volume24h?.toLocaleString()}</p>
      </div>
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-sm text-slate-400 mb-1">Holders</p>
        <p className="text-xl font-bold text-white">{analysis.holderCount?.toLocaleString()}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Risk Factors</h4>
        <div className="space-y-2">
          {analysis.riskFactors?.map((factor, index) => (
            <div key={index} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3">
              <span className="text-slate-300">{factor.name}</span>
              <span className={`font-bold ${
                factor.score >= 70 ? 'text-red-400' :
                factor.score >= 40 ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {factor.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default function NFTAnalytics() {
  const { nftAnalyticsData, analyzeNFT, isLoading, error } = useAppContext()
  const [nftAddress, setNftAddress] = useState('')
  const [analysisHistory, setAnalysisHistory] = useState([])

  // Update analysis history when new data comes in
  useEffect(() => {
    if (nftAnalyticsData && nftAnalyticsData.contractAddress) {
      setAnalysisHistory(prev => {
        const exists = prev.find(item => item.contractAddress === nftAnalyticsData.contractAddress)
        if (!exists) {
          return [{
            ...nftAnalyticsData,
            timestamp: new Date().toISOString()
          }, ...prev.slice(0, 4)]
        }
        return prev
      })
    }
  }, [nftAnalyticsData])

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!nftAddress.trim()) return

    try {
      // Call the real API
      await analyzeNFT(nftAddress)
      setNftAddress('')
    } catch (error) {
      console.error('Error analyzing NFT:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          🎨 NFT Risk Analytics
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Advanced NFT analysis with risk scoring, valuation models, and fraud detection
        </p>
      </div>

      {/* Analysis Form */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Analyze NFT</h2>
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              NFT Contract Address or Token ID
            </label>
            <input
              type="text"
              value={nftAddress}
              onChange={(e) => setNftAddress(e.target.value)}
              placeholder="0x... or collection-name/token-id"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-slate-400">Try these NFT addresses:</span>
            {[
              '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC
              '0x60E4d786628Fea6478F785A6d7e704777c86a7c6', // MAYC
              '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', // CryptoPunks
              '0xED5AF388653567Af2F388E6224dC7C4b3241C544'  // Azuki
            ].map((addr, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setNftAddress(addr)}
                className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
              >
                {['BAYC', 'MAYC', 'Punks', 'Azuki'][index]}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading || !nftAddress.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            {isLoading ? 'Analyzing...' : 'Analyze NFT'}
          </button>
        </form>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Analyzed Today</h3>
          <p className="text-3xl font-bold text-white">{analysisHistory.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Avg Risk Score</h3>
          <p className="text-3xl font-bold text-white">
            {analysisHistory.length > 0 
              ? Math.round(analysisHistory.reduce((sum, item) => sum + (item.riskScore || 0), 0) / analysisHistory.length)
              : '--'
            }
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Safe NFTs</h3>
          <p className="text-3xl font-bold text-white">
            {analysisHistory.filter(item => (item.riskScore || 0) < 40).length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-2">High Risk</h3>
          <p className="text-3xl font-bold text-white">
            {analysisHistory.filter(item => (item.riskScore || 0) >= 70).length}
          </p>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisHistory.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Recent Analysis</h2>
          {analysisHistory.map((analysis, index) => (
            <NFTAnalysisCard key={index} analysis={analysis} />
          ))}
        </div>
      )}

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">Deep Analysis</h3>
          <p className="text-slate-400">
            Comprehensive risk assessment including wash trading detection, price manipulation analysis, and authenticity verification.
          </p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="text-3xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-white mb-2">Valuation Models</h3>
          <p className="text-slate-400">
            AI-powered valuation using market data, rarity scores, historical sales, and collection metrics.
          </p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h3>
          <p className="text-slate-400">
            Live tracking of price movements, ownership changes, and market sentiment for your NFT portfolio.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Analyzing NFT...</h3>
          <p className="text-slate-400">Performing comprehensive risk analysis...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-red-400">Analysis Failed</h3>
              <p className="text-slate-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && analysisHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-white mb-2">Start Your NFT Analysis</h3>
          <p className="text-slate-400">Enter an NFT contract address above to begin comprehensive risk analysis</p>
        </div>
      )}
    </div>
  )
}
