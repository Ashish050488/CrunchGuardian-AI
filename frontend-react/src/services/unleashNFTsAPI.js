// UnleashNFTs API Service Layer for CrunchGuardian AI
const BASE_URL = 'https://api.unleashnfts.com/api/v2'

class UnleashNFTsAPI {
  constructor() {
    this.baseURL = BASE_URL
    this.headers = {
      'accept': 'application/json',
      'x-api-key': 'dc7d118fdfcf403994609b75cfc7e2a8'
    }
  }

  async makeRequest(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseURL}${endpoint}`)
      
      // Add query parameters
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key])
        }
      })

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('UnleashNFTs API Error:', error)
      throw error
    }
  }

  // ============ WHALE TRACKER ENDPOINTS ============
  async getCollectionWhales(contractAddress, blockchain = 'ethereum', limit = 50) {
    return this.makeRequest('/nft/collection/whales', {
      contract_address: contractAddress,
      blockchain,
      limit
    })
  }

  async getWalletNFTBalance(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/wallet/balance/nft', {
      wallet_address: walletAddress,
      blockchain
    })
  }

  async getWalletMetrics(walletAddress, blockchain = 'ethereum', timeRange = 'all') {
    return this.makeRequest('/wallet/metrics', {
      wallet: walletAddress,
      blockchain,
      time_range: timeRange,
      offset: 0,
      limit: 30
    })
  }

  async getWalletNFTAnalytics(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/wallet/analytics', {
      wallet_address: walletAddress,
      blockchain
    })
  }

  // ============ FAKE NFT DETECTION ENDPOINTS ============
  async getMarketWashTrading(blockchain = 'ethereum', limit = 100) {
    return this.makeRequest('/nft/market-insights/washtrade', {
      blockchain,
      limit
    })
  }

  async getCollectionWashTrading(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/washtrade', {
      contract_address: contractAddress,
      blockchain
    })
  }

  async getWalletWashTrading(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/wallet/washtrade', {
      wallet_address: walletAddress,
      blockchain
    })
  }

  async getNFTWashTrading(contractAddress, tokenId, blockchain = 'ethereum') {
    return this.makeRequest('/nft/washtrade', {
      contract_address: contractAddress,
      token_id: tokenId,
      blockchain
    })
  }

  // ============ NFT ANALYTICS ENDPOINTS ============
  async getMarketInsightsAnalytics() {
    return this.makeRequest('/nft/market-insights/analytics')
  }
  
  async getMarketInsightsWashtrade() {
    return this.makeRequest('/nft/market-insights/washtrade')
  }
  
  async getMarketInsightsHolders() {
    return this.makeRequest('/nft/market-insights/holders')
  }
  
  async getMarketInsightsTraders() {
    return this.makeRequest('/nft/market-insights/traders')
  }
  
  async getMarketInsightsScores() {
    return this.makeRequest('/nft/market-insights/scores')
  }
  
  async getTopDeals(sortBy = 'price', blockchain = 'ethereum', limit = 50) {
    return this.makeRequest('/nft/top_deals', {
      sort_by: sortBy,
      blockchain,
      limit
    })
  }
  
  async getNFTTransactions(contractAddress, tokenId = null, blockchain = 'ethereum') {
    const params = {
      contract_address: contractAddress,
      blockchain
    }
    if (tokenId) params.token_id = tokenId
    return this.makeRequest('/nft/transactions', params)
  }
  
  async getNFTFloorPrice(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/floor_price', {
      contract_address: contractAddress,
      blockchain
    })
  }
  
  async getNFTAnalytics(contractAddress, tokenId = null, blockchain = 'ethereum') {
    const params = {
      contract_address: contractAddress,
      blockchain
    }
    if (tokenId) params.token_id = tokenId
    return this.makeRequest('/nft/analytics', params)
  }
  
  async getNFTScores(contractAddress, tokenId = null, blockchain = 'ethereum') {
    const params = {
      contract_address: contractAddress,
      blockchain
    }
    if (tokenId) params.token_id = tokenId
    return this.makeRequest('/nft/scores', params)
  }
  
  async getCollectionWhales(contractAddress, blockchain = 'ethereum', limit = 50) {
    return this.makeRequest('/nft/collection/whales', {
      contract_address: contractAddress,
      blockchain,
      limit
    })
  }
  
  async getCollectionAnalytics(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/analytics', {
      contract_address: contractAddress,
      blockchain
    })
  }
  
  async getCollectionWashtrade(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/washtrade', {
      contract_address: contractAddress,
      blockchain
    })
  }
  
  async getCollectionScores(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/scores', {
      contract_address: contractAddress,
      blockchain
    })
  }
  
  async getWalletNFTBalance(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/wallet/balance/nft', {
      wallet: walletAddress,
      blockchain
    })
  }
  
  async getWalletTokenBalance(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/wallet/balance/token', {
      wallet: walletAddress,
      blockchain
    })
  }
  
  async getWalletScore(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/wallet/score', {
      wallet: walletAddress,
      blockchain
    })
  }
  
  async getWalletNFTAnalytics(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/wallet/analytics', {
      wallet: walletAddress,
      blockchain
    })
  }
  
  async getWalletWashtrade(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/wallet/washtrade', {
      wallet: walletAddress,
      blockchain
    })
  }
  
  async getBlockchains() {
    return this.makeRequest('/blockchains')
  }

  async getMarketInsights(blockchain = 'ethereum', timeframe = '24h') {
    return this.makeRequest('/nft/market-insights/analytics', {
      blockchain,
      timeframe
    })
  }

  async getCollectionAnalytics(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/analytics', {
      contract_address: contractAddress,
      blockchain
    })
  }

  async getNFTAnalytics(contractAddress, tokenId, blockchain = 'ethereum') {
    return this.makeRequest('/nft/analytics', {
      contract_address: contractAddress,
      token_id: tokenId,
      blockchain
    })
  }

  async getNFTScores(contractAddress, tokenId, blockchain = 'ethereum') {
    return this.makeRequest('/nft/scores', {
      contract_address: contractAddress,
      token_id: tokenId,
      blockchain
    })
  }

  async getCollectionScores(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/scores', {
      contract_address: contractAddress,
      blockchain
    })
  }

  async getWalletScore(walletAddress, blockchain = 'ethereum') {
    return this.makeRequest('/wallet/score', {
      wallet_address: walletAddress,
      blockchain
    })
  }

  // ============ ENHANCED FEATURES ============
  async getTopDeals(blockchain = 'ethereum', timeframe = '24h', limit = 50) {
    return this.makeRequest('/nft/top_deals', {
      blockchain,
      timeframe,
      limit
    })
  }

  async getFloorPrice(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/floor_price', {
      contract_address: contractAddress,
      blockchain
    })
  }

  async getNFTTransactions(contractAddress, tokenId, blockchain = 'ethereum', limit = 50) {
    return this.makeRequest('/nft/transactions', {
      contract_address: contractAddress,
      token_id: tokenId,
      blockchain,
      limit
    })
  }

  async getCollectionMetadata(contractAddress, blockchain = 'ethereum') {
    return this.makeRequest('/nft/collection/metadata', {
      contract_address: contractAddress,
      blockchain
    })
  }

  async getNFTMetadata(contractAddress, tokenId, blockchain = 'ethereum') {
    return this.makeRequest('/nft/metadata', {
      contract_address: contractAddress,
      token_id: tokenId,
      blockchain
    })
  }

  // ============ UTILITY METHODS ============
  async getBlockchains() {
    return this.makeRequest('/blockchains')
  }

  async getCollectionHolders(contractAddress, blockchain = 'ethereum', limit = 100) {
    return this.makeRequest('/nft/collection/holders', {
      contract_address: contractAddress,
      blockchain,
      limit
    })
  }

  async getCollectionTraders(contractAddress, blockchain = 'ethereum', limit = 100) {
    return this.makeRequest('/nft/collection/traders', {
      contract_address: contractAddress,
      blockchain,
      limit
    })
  }

  // ============ COMPREHENSIVE WHALE ANALYSIS ============
  async getComprehensiveWhaleData(blockchain = 'ethereum') {
    try {
      // Get top collections first
      const marketInsights = await this.getMarketInsights(blockchain)
      
      // Popular collection addresses (you can expand this list)
      const popularCollections = [
        '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // BAYC
        '0x60E4d786628Fea6478F785A6d7e704777c86a7c6', // MAYC
        '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', // CryptoPunks
        '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e', // Doodles
        '0xED5AF388653567Af2F388E6224dC7C4b3241C544', // Azuki
      ]

      const whalePromises = popularCollections.map(async (contractAddress) => {
        try {
          const whales = await this.getCollectionWhales(contractAddress, blockchain, 20)
          const metadata = await this.getCollectionMetadata(contractAddress, blockchain)
          return {
            contractAddress,
            collectionName: metadata?.name || 'Unknown Collection',
            whales: whales || []
          }
        } catch (error) {
          console.warn(`Failed to fetch whales for ${contractAddress}:`, error)
          return null
        }
      })

      const results = await Promise.allSettled(whalePromises)
      return results
        .filter(result => result.status === 'fulfilled' && result.value)
        .map(result => result.value)
    } catch (error) {
      console.error('Error fetching comprehensive whale data:', error)
      throw error
    }
  }

  // ============ COMPREHENSIVE FAKE NFT DETECTION ============
  async getComprehensiveFakeNFTData(blockchain = 'ethereum') {
    try {
      const [marketWashTrading, topDeals] = await Promise.allSettled([
        this.getMarketWashTrading(blockchain, 100),
        this.getTopDeals(blockchain, '7d', 100)
      ])

      return {
        washTradingData: marketWashTrading.status === 'fulfilled' ? marketWashTrading.value : [],
        suspiciousDeals: topDeals.status === 'fulfilled' ? topDeals.value : []
      }
    } catch (error) {
      console.error('Error fetching comprehensive fake NFT data:', error)
      throw error
    }
  }
}

// Create and export a singleton instance
const unleashNFTsAPI = new UnleashNFTsAPI()
export default unleashNFTsAPI
