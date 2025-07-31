import React, { useState } from "react"
import AnalysisForm from "./AnalysisForm"
import ReportDisplay from "./ReportDisplay"
import ErrorDisplay from "./ErrorDisplay"
import MetricsDashboard from "./MetricsDashboard"
import GraphDashboard from "../src/charts/GraphDashboard"
import RiskBadge from "./RiskBadge"
import RecentTransactions from "./RecentTransactions"

export default function App() {
  const [report, setReport] = useState("")
  const [overallRiskLevel, setOverallRiskLevel] = useState("")
  const [formattedMetrics, setFormattedMetrics] = useState(null)
  const [graphData, setGraphData] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async (address) => {
    setIsLoading(true)
    setError("")
    setReport("")
    setOverallRiskLevel("")
    setFormattedMetrics(null)
    setGraphData(null)
    setTransactions([])

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      setReport(data.report || "")
      setOverallRiskLevel(data.overallRiskLevel || "")
      setFormattedMetrics(data.formattedMetrics || null)
      setGraphData(data.graph_data || null)
      setTransactions(data.transactions || [])
    } catch (err) {
      console.error("Frontend Error:", err)
      setError(err.message || "Failed to fetch analysis.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 text-white font-sans">
      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 min-h-screen">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-7xl sm:text-8xl font-black mb-6">CrunchGuardian AI</h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto">
            Next-generation AI-powered blockchain intelligence platform.
          </p>
        </div>
        <div className="w-full max-w-3xl mb-8 sm:mb-12">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} setError={setError} />
        </div>
        <ErrorDisplay message={error} />
        {isLoading && <div className="text-2xl font-bold text-white animate-pulse">Analyzing Wallet...</div>}
        <div className="w-full max-w-7xl space-y-12">
          {overallRiskLevel && <RiskBadge riskLevel={overallRiskLevel} />}
          {formattedMetrics && <MetricsDashboard metrics={formattedMetrics} />}
          {graphData && <GraphDashboard graphData={graphData} />}
          {transactions.length > 0 && <RecentTransactions transactions={transactions} />}
          {report && <ReportDisplay report={report} />}
        </div>
      </div>
    </div>
  )
}