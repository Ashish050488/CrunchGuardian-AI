// AI Backend API Service
// This service acts as the bridge between the React frontend and the Python backend.
const AI_BACKEND_URL = 'http://localhost:8000';

class AIBackendAPI {
  constructor() {
    this.baseURL = AI_BACKEND_URL;
  }

  /**
   * A generic helper function to make POST requests to the backend.
   * It handles sending JSON data and parsing the JSON response.
   * @param {string} endpoint - The backend endpoint to hit (e.g., '/generate-report').
   * @param {object} body - The JSON object to send in the request body.
   * @returns {Promise<any>} - The JSON data from the backend response.
   */
  async _postRequest(endpoint, body = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // If the response is not successful, parse the error and throw it.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `API Error: ${response.status}`);
      }

      // If successful, return the JSON response.
      return await response.json();
    } catch (error) {
      // Log any network or other errors to the console for debugging.
      console.error(`❌ API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Fetches the comprehensive AI-powered report for a given wallet address.
   * @param {string} walletAddress - The wallet address to analyze.
   * @returns {Promise<object>} - The full report data object.
   */
  async generateComprehensiveReport(walletAddress) {
    return await this._postRequest('/generate-report', { address: walletAddress });
  }

  /**
   * Fetches the list of NFTs owned by a wallet.
   * @param {string} walletAddress - The wallet address to check.
   * @param {string} blockchain - The blockchain to query (e.g., 'ethereum').
   * @returns {Promise<Array>} - An array of NFT objects.
   */
  async getNftPortfolio(walletAddress, blockchain = 'ethereum') {
    return await this._postRequest('/nft-portfolio', { address: walletAddress, blockchain: blockchain });
  }
 
  /**
   * Fetches metadata for a batch of NFTs in a single call.
   * @param {Array<object>} nfts - An array of NFT identifiers ({ contract_address, token_id }).
   * @param {string} blockchain - The blockchain to query.
   * @returns {Promise<object>} - A map of NFT metadata.
   */
  async getBatchNftMetadata(nfts, blockchain = 'ethereum') {
    return await this._postRequest('/batch-nft-metadata', { nfts: nfts, blockchain: blockchain });
  }
}

// Create and export a single instance of the API service to be used throughout the app.
const aiBackendAPI = new AIBackendAPI();
export default aiBackendAPI;
