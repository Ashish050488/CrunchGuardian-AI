"use client"

import { useState, useCallback } from "react"
import GlassCard from "../ui/GlassCard"
import ModernButton from "../ui/ModernButton"
import ModernInput from "../ui/ModernInput"
import RiskIndicator from "../ui/RiskIndicator"
import LoadingSpinner from "../ui/LoadingSpinner"
import { aiBackendAPI } from "../../services/aiBackendAPI"
// Add `ReactMarkdown` import
import ReactMarkdown from "react-markdown"

// Add these component definitions outside of the AIReports function, preferably at the top of the file or in a separate utility file if preferred for reusability.
const markdownComponents = {
  h3: ({ node, ...props }) => (
    <h3 className="text-3xl font-extrabold text-gray-900 mt-10 mb-5 flex items-center">
      <span className="mr-3">🔍</span>
      <span {...props} />
    </h3>
  ),
  h4: ({ node, ...props }) => (
    <h4 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
      <span className="mr-2">📌</span>
      <span {...props} />
    </h4>
  ),
  p: ({ node, ...props }) => {
    // Special styling for the "Important Disclaimer" block
    if (
      props.children &&
      typeof props.children[0] === "string" &&
      props.children[0].startsWith("**Important Disclaimer:")
    ) {
      return (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 mt-8">
          <p className="text-sm font-bold text-gray-900">
            <span {...props} />
          </p>
        </div>
      )
    }
    return <p className="text-lg leading-relaxed text-gray-700 mb-4" {...props} />
  },
  strong: ({ node, ...props }) => <strong className="font-extrabold text-gray-900" {...props} />,
  hr: ({ node, ...props }) => <hr className="my-8 border-t-2 border-gray-300" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-6 space-y-3 text-lg text-gray-700" {...props} />,
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside ml-6 space-y-3 text-lg text-gray-700" {...props} />
  ),
  li: ({ node, ...props }) => <li className="text-lg leading-relaxed text-gray-700" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-600 hover:underline font-medium" {...props} />,
}

export default function AIReports() {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [address, setAddress] = useState("")

  const analyzeWallet = useCallback(async (walletAddress) => {
    setLoading(true)
    setError(null)
    setReportData(null)

    try {
      const data = await aiBackendAPI.generateComprehensiveReport(walletAddress)
      setReportData(data)
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    analyzeWallet(address.trim())
  }

  const quickActions = [
    { name: "Test Wallet 1", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
    { name: "Vitalik.eth", address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🤖</span>
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
          AI-Powered Analysis
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Harness the power of artificial intelligence to get comprehensive wallet analysis with advanced risk
          assessment
        </p>
      </div>

      {/* Input Section */}
      <GlassCard gradient className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ModernInput
            label="Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            disabled={loading}
            icon="🔍"
          />

          <ModernButton type="submit" disabled={loading || !address.trim()} size="xl" className="w-full">
            {loading ? "🔍 Analyzing..." : "🚀 Generate AI Report"}
          </ModernButton>

          {quickActions.length > 0 && (
            <div className="pt-6 border-t border-white/20">
              <p className="text-lg font-semibold text-gray-700 mb-4 text-center">Quick Test Wallets</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {quickActions.map(({ name, address: actionAddress }) => (
                  <ModernButton
                    key={name}
                    onClick={() => {
                      setAddress(actionAddress)
                      analyzeWallet(actionAddress)
                    }}
                    disabled={loading}
                    variant="secondary"
                    size="sm"
                  >
                    {name}
                  </ModernButton>
                ))}
              </div>
            </div>
          )}
        </form>
      </GlassCard>

      {/* Error State */}
      {error && (
        <GlassCard className="p-8 border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <span className="text-3xl text-white">❌</span>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">Analysis Error</h3>
            <p className="text-lg text-red-700">{error}</p>
          </div>
        </GlassCard>
      )}

      {/* Loading State */}
      {loading && (
        <GlassCard gradient>
          <LoadingSpinner message="🤖 AI is analyzing the wallet..." size="xl" />
        </GlassCard>
      )}

      {/* Results */}
      {reportData && (
        <div className="space-y-8">
          <RiskIndicator level={reportData.overallRiskLevel} />

          {reportData.report &&
            (() => {
              if (!reportData.report) return null
              const reportLines = reportData.report.split("\n")
              const reportTitle = reportLines[0] // e.g., "CrunchGuardian AI Report for 0x..."
              const riskAssessmentLine = reportLines[1] // e.g., "**Overall Risk Assessment:** High Risk"
              const mainReportContent = reportLines.slice(2).join("\n").trim().replace(/🔍#/g, "###") // Replace custom heading with standard Markdown H3

              return (
                <GlassCard gradient className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 mr-4 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-2xl text-white">📊</span>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">AI Analysis Report</h2>
                        <p className="text-gray-600">Comprehensive wallet assessment</p>
                      </div>
                    </div>
                    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  </div>

                  {/* Render the extracted title and risk assessment prominently */}
                  <h3 className="text-3xl font-black text-gray-900 mb-2">{reportTitle}</h3>
                  <p className="text-xl font-bold text-gray-900 mb-6">{riskAssessmentLine}</p>

                  {/* Render the rest of the markdown content using ReactMarkdown */}
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown components={markdownComponents}>{mainReportContent}</ReactMarkdown>
                  </div>
                </GlassCard>
              )
            })()}
        </div>
      )}
    </div>
  )
}
