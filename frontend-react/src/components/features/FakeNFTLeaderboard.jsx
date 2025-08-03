import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const FakeNFTCard = ({ nft, rank }) => {
  const getRiskColor = (score) => {
    if (score >= 90) return 'text-red-500 bg-red-500/20'
    if (score >= 70) return 'text-orange-500 bg-orange-500/20'
    if (score >= 50) return 'text-yellow-500 bg-yellow-500/20'
    return 'text-green-500 bg-green-500/20'
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  return (
    <div className="group bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-slate-400">
            {getRankIcon(rank)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
            <p className="text-sm text-slate-400">{nft.collection}</p>
            <p className="text-xs text-slate-500 font-mono mt-1">{nft.contractAddress}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(nft.fakeScore)}`}>
          {nft.fakeScore}% FAKE
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-sm text-slate-400">Reported Price</p>
          <p className="text-xl font-bold text-white">${nft.reportedPrice?.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-sm text-slate-400">Actual Value</p>
          <p className="text-xl font-bold text-red-400">${nft.actualValue?.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Wash Trading</span>
          <span className="text-red-400">{nft.washTradingScore}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Metadata Issues</span>
          <span className="text-orange-400">{nft.metadataIssues}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Suspicious Activity</span>
          <span className="text-yellow-400">{nft.suspiciousActivity}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">Reports: {nft.reportCount}</span>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
            Report
          </button>
          <button className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FakeNFTLeaderboard() {
  const { fakeNFTData, fetchFakeNFTData, isLoading, error } = useAppContext()
  const [sortBy, setSortBy] = useState('fakeScore')
  const [filterBy, setFilterBy] = useState('all')
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (!hasLoaded) {
      console.log('Loading fake NFT data...')
      fetchFakeNFTData()
      setHasLoaded(true)
    }
  }, [fetchFakeNFTData, hasLoaded])

  const displayData = fakeNFTData

  const sortedData = [...displayData].sort((a, b) => {
    switch (sortBy) {
      case 'fakeScore':
        return b.fakeScore - a.fakeScore
      case 'reportedPrice':
        return b.reportedPrice - a.reportedPrice
      case 'reportCount':
        return b.reportCount - a.reportCount
      case 'washTradingScore':
        return b.washTradingScore - a.washTradingScore
      default:
        return 0
    }
  })

  const filteredData = sortedData.filter(nft => {
    switch (filterBy) {
      case 'extreme':
        return nft.fakeScore >= 90
      case 'high':
        return nft.fakeScore >= 70 && nft.fakeScore < 90
      case 'moderate':
        return nft.fakeScore >= 50 && nft.fakeScore < 70
      default:
        return true
    }
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
          🚫 Fake NFT Wall of Shame
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Exposing fraudulent NFTs, wash trading schemes, and suspicious collections to protect the community
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/50 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="text-lg font-semibold text-red-400">Community Warning</h3>
            <p className="text-slate-300">
              These NFTs have been flagged for suspicious activity. Always verify authenticity before purchasing.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-slate-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
          >
            <option value="fakeScore">Fake Score</option>
            <option value="reportedPrice">Reported Price</option>
            <option value="reportCount">Report Count</option>
            <option value="washTradingScore">Wash Trading</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-slate-400">Risk Level:</label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
          >
            <option value="all">All Levels</option>
            <option value="extreme">Extreme (90%+)</option>
            <option value="high">High (70-89%)</option>
            <option value="moderate">Moderate (50-69%)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span>Active Reports: {filteredData.length}</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Total Flagged</h3>
          <p className="text-3xl font-bold text-white">{displayData.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Avg Fake Score</h3>
          <p className="text-3xl font-bold text-white">
            {Math.round(displayData.reduce((sum, nft) => sum + nft.fakeScore, 0) / displayData.length)}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Total Reports</h3>
          <p className="text-3xl font-bold text-white">
            {displayData.reduce((sum, nft) => sum + nft.reportCount, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Value at Risk</h3>
          <p className="text-3xl font-bold text-white">
            ${displayData.reduce((sum, nft) => sum + nft.reportedPrice, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-6">
        {filteredData.map((nft, index) => (
          <FakeNFTCard
            key={nft.contractAddress || index}
            nft={nft}
            rank={index + 1}
          />
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading Fake NFT Data...</h3>
          <p className="text-slate-400">Scanning blockchain for suspicious activity...</p>
        </div>
      )}

      {!isLoading && filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">{error ? 'Failed to Load Data' : 'No Fake NFTs Found'}</h3>
          <p className="text-slate-400">
            {error ? 'Unable to fetch fake NFT data from API. Please try again later.' : 'Great news! No NFTs match your current filters.'}
          </p>
          {error && (
            <button 
              onClick={() => { setHasLoaded(false); fetchFakeNFTData(); }}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry Loading
            </button>
          )}
        </div>
      )}
    </div>
  )
}
