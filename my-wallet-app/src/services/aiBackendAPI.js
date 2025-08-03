const AI_BACKEND_URL = "http://localhost:8000" // Ensure this matches your FastAPI server address

class AIBackendAPI {
  constructor() {
    this.baseURL = AI_BACKEND_URL
  }

  async _postRequest(endpoint, body = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `API Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error)
      throw error
    }
  }

  async _getRequest(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${this.baseURL}${endpoint}?${queryString}`
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `API Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error)
      throw error
    }
  }

  async generateComprehensiveReport(walletAddress) {
    return await this._postRequest("/generate-report", { address: walletAddress })
  }

  async getNftPortfolio(walletAddress, blockchain = "ethereum") {
    return await this._postRequest("/nft-portfolio", {
      address: walletAddress,
      blockchain: blockchain,
    })
  }

  async getBatchNftMetadata(nfts, blockchain = "ethereum") {
    return await this._postRequest("/batch-nft-metadata", {
      nfts: nfts,
      blockchain: blockchain,
    })
  }

  async getMarketInsights(blockchain = "ethereum", timeRange = "24h") {
    // The backend uses POST for market-insights, so we'll use _postRequest
    return await this._postRequest("/market-insights", {
      blockchain: blockchain,
      time_range: timeRange,
    })
  }
}

export const aiBackendAPI = new AIBackendAPI()
