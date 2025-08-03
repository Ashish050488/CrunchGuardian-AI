import React, { useState } from 'react';

const APITester = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testWallet, setTestWallet] = useState('0x3ddfa8ec3052539b6c9549f12cea2c295c585276');

  const BASE_URL = 'https://api.unleashnfts.com/api/v2';

  const testEndpoints = [
    { name: 'Wallet Balance NFT', url: `/wallet/balance/nft?wallet_address=${testWallet}` },
    { name: 'Wallet Balance Token', url: `/wallet/balance/token?wallet_address=${testWallet}` },
    { name: 'Wallet Score', url: `/wallet/score?wallet_address=${testWallet}` },
    { name: 'Wallet Metrics', url: `/wallet/metrics?wallet_address=${testWallet}` },
    { name: 'NFT Wallet Analytics', url: `/nft/wallet/analytics?wallet_address=${testWallet}` },
    { name: 'NFT Wallet Profile', url: `/nft/wallet/profile?wallet_address=${testWallet}` },
    { name: 'Market Insights Analytics', url: '/nft/market-insights/analytics' },
    { name: 'Market Insights Washtrade', url: '/nft/market-insights/washtrade' },
    { name: 'Top Deals', url: '/nft/top_deals' },
    { name: 'Blockchains', url: '/blockchains' }
  ];

  const testAPI = async () => {
    setIsLoading(true);
    const results = [];

    for (const endpoint of testEndpoints) {
      try {
        console.log(`Testing: ${endpoint.name}`);
        const response = await fetch(`${BASE_URL}${endpoint.url}`);
        const data = await response.json();

        const result = {
          name: endpoint.name,
          url: endpoint.url,
          status: response.status,
          success: response.ok,
          hasData: data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0),
          dataType: Array.isArray(data) ? 'array' : typeof data,
          dataLength: Array.isArray(data) ? data.length : Object.keys(data || {}).length,
          sampleData: JSON.stringify(data).slice(0, 200) + '...'
        };

        results.push(result);
      } catch (error) {
        results.push({
          name: endpoint.name,
          url: endpoint.url,
          success: false,
          error: error.message
        });
      }
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const getStatusColor = (result) => {
    if (!result.success) return 'text-red-500';
    if (result.hasData) return 'text-green-500';
    return 'text-yellow-500';
  };

  const getStatusText = (result) => {
    if (!result.success) return `❌ FAILED (${result.status || 'Error'})`;
    if (result.hasData) return `✅ SUCCESS (${result.dataLength} items)`;
    return '⚠️ SUCCESS (No data)';
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">UnleashNFTs API Tester</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Test Wallet Address:</label>
        <input
          type="text"
          value={testWallet}
          onChange={(e) => setTestWallet(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          placeholder="Enter wallet address to test"
        />
      </div>

      <button
        onClick={testAPI}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-6 disabled:opacity-50"
      >
        {isLoading ? 'Testing APIs...' : 'Test API Endpoints'}
      </button>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Test Results:</h2>
          
          <div className="grid gap-4">
            {testResults.map((result, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{result.name}</h3>
                  <span className={getStatusColor(result)}>
                    {getStatusText(result)}
                  </span>
                </div>
                
                <div className="text-sm text-gray-400 mb-2">
                  <code>{result.url}</code>
                </div>
                
                {result.success && result.hasData && (
                  <div className="text-sm">
                    <p className="text-green-400">Data Type: {result.dataType}</p>
                    <p className="text-green-400">Sample Data:</p>
                    <pre className="bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      {result.sampleData}
                    </pre>
                  </div>
                )}
                
                {result.error && (
                  <div className="text-red-400 text-sm">
                    Error: {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded">
            <h3 className="font-semibold mb-2">Summary:</h3>
            <p className="text-green-400">
              ✅ Working with data: {testResults.filter(r => r.success && r.hasData).length}
            </p>
            <p className="text-yellow-400">
              ⚠️ Working but no data: {testResults.filter(r => r.success && !r.hasData).length}
            </p>
            <p className="text-red-400">
              ❌ Failed: {testResults.filter(r => !r.success).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default APITester;
