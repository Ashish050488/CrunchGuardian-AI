import React from 'react'
import { useAppContext } from '../../context/AppContext'
import AnalysisForm from '../../AnalysisForm'
import ReportDisplay from '../../ReportDisplay'
import ErrorDisplay from '../../ErrorDisplay'
import MetricsDashboard from '../../MetricsDashboard'
import GraphDashboard from '../../charts/GraphDashboard'
import RiskBadge from '../../RiskBadge'
import RecentTransactions from '../../RecentTransactions'

export default function MainDashboard() {
  const {
    report,
    overallRiskLevel,
    formattedMetrics,
    graphData,
    transactions,
    isLoading,
    error,
    handleAnalyze,
    setError
  } = useAppContext()

  return (
    <div className="space-y-8">
      {/* Analysis Form Section */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Wallet Analysis</h2>
          <p className="text-slate-400">Enter a wallet address to analyze risk, transactions, and NFT holdings</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} setError={setError} />
        </div>
      </div>

      {/* Error Display */}
      <ErrorDisplay message={error} />

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-2xl font-bold text-white">Analyzing Wallet...</span>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      <div className="space-y-8">
        {overallRiskLevel && (
          <div className="animate-fade-in-up">
            <RiskBadge riskLevel={overallRiskLevel} />
          </div>
        )}

        {formattedMetrics && (
          <div className="animate-fade-in-up animation-delay-200">
            <MetricsDashboard metrics={formattedMetrics} />
          </div>
        )}

        {graphData && (
          <div className="animate-fade-in-up animation-delay-400">
            <GraphDashboard graphData={graphData} />
          </div>
        )}

        {transactions.length > 0 && (
          <div className="animate-fade-in-up animation-delay-600">
            <RecentTransactions transactions={transactions} />
          </div>
        )}

        {report && (
          <div className="animate-fade-in-up animation-delay-800">
            <ReportDisplay report={report} />
          </div>
        )}
      </div>

      {/* Quick Stats Section */}
      {formattedMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Risk Assessment</h3>
            <p className="text-3xl font-bold text-white">{overallRiskLevel}</p>
            <p className="text-sm text-slate-400 mt-1">Overall risk level</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Portfolio Value</h3>
            <p className="text-3xl font-bold text-white">{formattedMetrics.currentBalanceUsd}</p>
            <p className="text-sm text-slate-400 mt-1">Current balance</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Activity Level</h3>
            <p className="text-3xl font-bold text-white">{formattedMetrics.totalTransactions}</p>
            <p className="text-sm text-slate-400 mt-1">Total transactions</p>
          </div>
        </div>
      )}
    </div>
  )
}
