// API Endpoint Tester for UnleashNFTs API
const BASE_URL = 'https://api.unleashnfts.com/api/v2';

// Test wallet address provided by user
const TEST_WALLET = '0x3ddfa8ec3052539b6c9549f12cea2c295c585276';

// Popular NFT contract addresses for testing
const TEST_CONTRACTS = {
  BAYC: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  CRYPTOPUNKS: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
  AZUKI: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
  MAYC: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'
};

// API endpoints to test
const ENDPOINTS_TO_TEST = [
  // Wallet-related endpoints
  { name: 'Wallet Balance NFT', url: `/wallet/balance/nft?wallet_address=${TEST_WALLET}` },
  { name: 'Wallet Balance Token', url: `/wallet/balance/token?wallet_address=${TEST_WALLET}` },
  { name: 'Wallet Balance DeFi', url: `/wallet/balance/defi?wallet_address=${TEST_WALLET}` },
  { name: 'Wallet Score', url: `/wallet/score?wallet_address=${TEST_WALLET}` },
  { name: 'Wallet Metrics', url: `/wallet/metrics?wallet_address=${TEST_WALLET}` },
  { name: 'Wallet Label', url: `/wallet/label?wallet_address=${TEST_WALLET}` },
  
  // NFT Wallet endpoints
  { name: 'NFT Wallet Analytics', url: `/nft/wallet/analytics?wallet_address=${TEST_WALLET}` },
  { name: 'NFT Wallet Scores', url: `/nft/wallet/scores?wallet_address=${TEST_WALLET}` },
  { name: 'NFT Wallet Traders', url: `/nft/wallet/traders?wallet_address=${TEST_WALLET}` },
  { name: 'NFT Wallet Washtrade', url: `/nft/wallet/washtrade?wallet_address=${TEST_WALLET}` },
  { name: 'NFT Wallet Profile', url: `/nft/wallet/profile?wallet_address=${TEST_WALLET}` },
  
  // Collection endpoints (using BAYC as test)
  { name: 'Collection Whales', url: `/nft/collection/whales?contract_address=${TEST_CONTRACTS.BAYC}` },
  { name: 'Collection Analytics', url: `/nft/collection/analytics?contract_address=${TEST_CONTRACTS.BAYC}` },
  { name: 'Collection Holders', url: `/nft/collection/holders?contract_address=${TEST_CONTRACTS.BAYC}` },
  { name: 'Collection Scores', url: `/nft/collection/scores?contract_address=${TEST_CONTRACTS.BAYC}` },
  { name: 'Collection Metadata', url: `/nft/collection/metadata?contract_address=${TEST_CONTRACTS.BAYC}` },
  
  // Market insights
  { name: 'Market Insights Analytics', url: '/nft/market-insights/analytics' },
  { name: 'Market Insights Washtrade', url: '/nft/market-insights/washtrade' },
  { name: 'Market Insights Holders', url: '/nft/market-insights/holders' },
  { name: 'Market Insights Traders', url: '/nft/market-insights/traders' },
  { name: 'Market Insights Scores', url: '/nft/market-insights/scores' },
  
  // General endpoints
  { name: 'Top Deals', url: '/nft/top_deals' },
  { name: 'Blockchains', url: '/blockchains' },
  { name: 'Floor Price', url: `/nft/floor_price?contract_address=${TEST_CONTRACTS.BAYC}` },
  { name: 'Transactions', url: `/nft/transactions?contract_address=${TEST_CONTRACTS.BAYC}` }
];

export const testAPIEndpoints = async () => {
  const results = [];
  
  console.log('🔍 Testing UnleashNFTs API endpoints...');
  console.log(`📍 Test wallet: ${TEST_WALLET}`);
  console.log('📍 Test contracts:', TEST_CONTRACTS);
  console.log('');
  
  for (const endpoint of ENDPOINTS_TO_TEST) {
    try {
      console.log(`Testing: ${endpoint.name}...`);
      
      const response = await fetch(`${BASE_URL}${endpoint.url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add API key here if needed
          // 'Authorization': 'Bearer YOUR_API_KEY'
        }
      });
      
      const data = await response.json();
      
      const result = {
        name: endpoint.name,
        url: endpoint.url,
        status: response.status,
        success: response.ok,
        hasData: data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0),
        dataType: Array.isArray(data) ? 'array' : typeof data,
        dataLength: Array.isArray(data) ? data.length : Object.keys(data || {}).length,
        sampleData: data
      };
      
      results.push(result);
      
      if (result.success && result.hasData) {
        console.log(`✅ ${endpoint.name}: SUCCESS (${result.dataLength} items)`);
      } else if (result.success && !result.hasData) {
        console.log(`⚠️  ${endpoint.name}: SUCCESS but no data`);
      } else {
        console.log(`❌ ${endpoint.name}: FAILED (${response.status})`);
      }
      
    } catch (error) {
      console.log(`❌ ${endpoint.name}: ERROR - ${error.message}`);
      results.push({
        name: endpoint.name,
        url: endpoint.url,
        success: false,
        error: error.message
      });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 API Test Results Summary:');
  const successful = results.filter(r => r.success && r.hasData);
  const empty = results.filter(r => r.success && !r.hasData);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Working endpoints with data: ${successful.length}`);
  console.log(`⚠️  Working endpoints with no data: ${empty.length}`);
  console.log(`❌ Failed endpoints: ${failed.length}`);
  
  console.log('\n🎯 Useful endpoints for dashboard:');
  successful.forEach(result => {
    console.log(`- ${result.name}: ${result.dataLength} items`);
  });
  
  return {
    successful,
    empty,
    failed,
    all: results
  };
};

// Test specific wallet functionality
export const testWalletData = async (walletAddress) => {
  const walletEndpoints = [
    `/wallet/balance/nft?wallet_address=${walletAddress}`,
    `/wallet/score?wallet_address=${walletAddress}`,
    `/wallet/metrics?wallet_address=${walletAddress}`,
    `/nft/wallet/analytics?wallet_address=${walletAddress}`,
    `/nft/wallet/profile?wallet_address=${walletAddress}`
  ];
  
  const results = {};
  
  for (const endpoint of walletEndpoints) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      results[endpoint] = {
        success: response.ok,
        data: data,
        hasData: data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
      };
    } catch (error) {
      results[endpoint] = {
        success: false,
        error: error.message
      };
    }
  }
  
  return results;
};
