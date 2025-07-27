"use client"

import { useState, useEffect, useRef } from "react"
import AnalysisForm from "./AnalysisForm"
import ReportDisplay from "./ReportDisplay"
import ErrorDisplay from "./ErrorDisplay"
import MetricsDashboard from "./MetricsDashboard"
import RiskBadge from "./RiskBadge"
import ParticleField from "./ParticleField"
import FloatingElements from "./FloatingElements"

export default function App() {
  const [report, setReport] = useState("")
  const [overallRiskLevel, setOverallRiskLevel] = useState("")
  const [formattedMetrics, setFormattedMetrics] = useState(null)
  const [rawCombinedData, setRawCombinedData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleAnalyze = async (address) => {
    if (!address) {
      setError("Please enter a wallet address.")
      return
    }

    setIsLoading(true)
    setError("")
    setReport("")
    setOverallRiskLevel("")
    setFormattedMetrics(null)
    setRawCombinedData(null)

    try {
      const response = await fetch("http://localhost:4000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })

      const data = await response.json()

      if (data.report) {
        setReport(data.report)
        setOverallRiskLevel(data.overallRiskLevel || "")
        setFormattedMetrics(data.formattedMetrics || null)
      } else {
        setRawCombinedData(data.raw_combined_data || data)
      }
    } catch (err) {
      console.error("Frontend Error:", err)
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Failed to fetch analysis. Ensure backend services are running and API keys are correct."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskTheme = (riskLevel) => {
    switch (riskLevel) {
      case "High Risk":
        return {
          primary: "from-red-500 via-pink-500 to-rose-500",
          secondary: "from-red-900 via-pink-900 to-rose-900",
          accent: "red",
        }
      case "Moderate Risk":
      case "Moderate Risk (Warning)":
        return {
          primary: "from-yellow-500 via-orange-500 to-amber-500",
          secondary: "from-yellow-900 via-orange-900 to-amber-900",
          accent: "orange",
        }
      case "Low Risk":
      case "Low Risk (Notable Holder)":
        return {
          primary: "from-green-500 via-emerald-500 to-teal-500",
          secondary: "from-green-900 via-emerald-900 to-teal-900",
          accent: "green",
        }
      default:
        return {
          primary: "from-blue-500 via-purple-500 to-indigo-500",
          secondary: "from-blue-900 via-purple-900 to-indigo-900",
          accent: "blue",
        }
    }
  }

  const theme = getRiskTheme(overallRiskLevel)

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)
        `,
      }}
    >
      {/* Particle Field Background */}
      <ParticleField mousePosition={mousePosition} />

      {/* Floating Geometric Elements */}
      <FloatingElements />

      {/* Dynamic Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 animate-gradient-shift"
          style={{
            backgroundSize: "400% 400%",
          }}
        ></div>
      </div>

      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `perspective(1000px) rotateX(60deg) translateZ(-100px)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8">
        {/* Floating Header with 3D Effect */}
        <div className="text-center mb-16 animate-float-in perspective-1000">
          <div className="relative group">
            {/* Holographic Logo Container */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8 transform-gpu transition-all duration-700 hover:scale-110 hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-purple-500/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl animate-pulse-glow"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl"></div>
              <div className="relative z-10 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>

            {/* Dynamic Title with Morphing Effect */}
            <div className="relative">
              <h1 className="text-7xl sm:text-8xl font-black mb-6 leading-none">
                <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-text-shimmer bg-300% transform-gpu hover:scale-105 transition-transform duration-500">
                  Crunch
                </span>
                <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-text-shimmer bg-300% animation-delay-500 transform-gpu hover:scale-105 transition-transform duration-500">
                  Guardian
                </span>
                <span className="block text-5xl sm:text-6xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-light animate-text-shimmer bg-300% animation-delay-1000 transform-gpu hover:scale-105 transition-transform duration-500">
                  AI
                </span>
              </h1>

              {/* Floating Accent Elements */}
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-purple-500 rounded-full animate-ping animation-delay-1000"></div>
            </div>

            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Next-generation AI-powered blockchain intelligence platform for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                comprehensive risk assessment
              </span>
            </p>
          </div>
        </div>

        {/* Morphing Analysis Form */}
        <div className="w-full max-w-3xl mb-12 transform-gpu">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} setError={setError} theme={theme} />
        </div>

        {/* Error Display with Enhanced Styling */}
        <ErrorDisplay message={error} />

        {/* Advanced Loading State */}
        {isLoading && !report && !error && (
          <div className="flex flex-col items-center space-y-8 mb-12 animate-float-in">
            <div className="relative">
              {/* Multi-layered Loading Animation */}
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 border-4 border-blue-200/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animate-reverse animation-delay-300"></div>
                <div className="absolute inset-4 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animation-delay-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-white animate-pulse">Analyzing Wallet</p>
              <p className="text-slate-400 text-lg">Gathering blockchain intelligence...</p>
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Risk Assessment Badge */}
        {overallRiskLevel && (
          <div className="mb-12 animate-scale-in animation-delay-300">
            <RiskBadge riskLevel={overallRiskLevel} theme={theme} />
          </div>
        )}

        {/* Advanced Metrics Dashboard */}
        {formattedMetrics && (
          <div className="w-full max-w-7xl mb-12 animate-slide-up animation-delay-500">
            <MetricsDashboard metrics={formattedMetrics} theme={theme} />
          </div>
        )}

        {/* Enhanced Report Display */}
        {report && (
          <div className="w-full max-w-5xl animate-fade-in-scale animation-delay-700">
            <ReportDisplay report={report} theme={theme} />
          </div>
        )}

        {/* Styled Raw Data Display */}
        {rawCombinedData && !report && (
          <div className="w-full max-w-5xl animate-fade-in-scale">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-white">Raw Combined Data</h2>
                <pre className="bg-slate-800/50 p-6 rounded-xl text-left overflow-x-auto text-sm text-slate-300 border border-slate-700/30 font-mono">
                  {JSON.stringify(rawCombinedData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
