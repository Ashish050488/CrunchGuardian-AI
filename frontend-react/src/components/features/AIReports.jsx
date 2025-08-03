// src/components/features/AIReports.jsx
import React from 'react';
import { useWalletReport } from '../../hooks/useWalletReport';
import AddressInputForm from '../../ui/AddressInputForm';

const AIReports = () => {
  const { reportData, loading, error, analyzeWallet } = useWalletReport();

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low risk': return 'text-green-400';
      case 'medium risk': return 'text-yellow-400';
      case 'high risk': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const quickActions = [
    { name: 'Test Wallet 1', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { name: 'Vitalik.eth', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }
  ];

  return (
    <div className="space-y-6">
      <div className="minimal-card">
        <h1 className="text-3xl font-bold text-white">🤖 AI-Powered Reports</h1>
        <p className="text-gray-400">Comprehensive wallet analysis powered by artificial intelligence</p>
      </div>

      <AddressInputForm
        onAnalyze={analyzeWallet}
        loading={loading}
        title="Wallet Address for AI Analysis"
        placeholder="Enter wallet address (0x...)"
        buttonText="Generate AI Report"
        quickActions={quickActions}
      />

      {error && <div className="minimal-alert minimal-alert-danger"><p>{error}</p></div>}
      
      {loading && (
        <div className="text-center py-12">
          <div className="minimal-loading mx-auto mb-4"></div>
          <p className="text-gray-400">AI is analyzing the wallet...</p>
        </div>
      )}

      {reportData && (
        <div className="space-y-6">
          <div className="minimal-card">
            <h2 className="text-xl font-bold text-white mb-4">AI Risk Assessment</h2>
            <div className={`text-3xl font-bold ${getRiskLevelColor(reportData.overallRiskLevel)}`}>
              {reportData.overallRiskLevel || 'Unknown'}
            </div>
          </div>
          
          {reportData.report && (
            <div className="minimal-card">
              <h2 className="text-xl font-bold text-white mb-4">🤖 AI Analysis Report</h2>
              <div
                className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: reportData.report.replace(/\n/g, '<br/>') }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIReports;