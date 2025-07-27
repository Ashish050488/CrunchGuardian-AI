"use client"

import { useState } from "react"

export default function AnalysisForm({ onAnalyze, isLoading, setError, theme }) {
  const [address, setAddress] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) {
      setError("Please enter a valid wallet address")
      return
    }
    onAnalyze(address.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        {/* Glowing Border Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>

        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="address" className="block text-lg font-semibold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Wallet Address
                </span>
              </label>

              <div className="relative">
                {/* Input Field with Advanced Styling */}
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter Ethereum wallet address (0x...)"
                  className={`
                    w-full px-6 py-5 bg-slate-800/50 border-2 rounded-xl text-white placeholder-slate-400 
                    focus:outline-none transition-all duration-300 text-lg font-mono
                    ${
                      isFocused
                        ? "border-blue-500 shadow-lg shadow-blue-500/25 bg-slate-800/70"
                        : "border-slate-600/50 hover:border-slate-500/70"
                    }
                  `}
                  disabled={isLoading}
                />

                {/* Animated Search Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                  <svg
                    className={`w-6 h-6 transition-all duration-300 ${
                      isFocused ? "text-blue-400 scale-110" : "text-slate-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Input Glow Effect */}
                {isFocused && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                )}
              </div>
            </div>

            {/* Advanced Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !address.trim()}
              className="group relative w-full overflow-hidden rounded-xl p-1 transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {/* Button Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600"></div>

              {/* Button Content */}
              <div className="relative bg-slate-900 rounded-lg px-8 py-4 transition-all duration-300 group-hover:bg-transparent">
                <div className="flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white font-bold text-lg">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-white font-bold text-lg">Analyze Wallet</span>
                    </>
                  )}
                </div>
              </div>

              {/* Button Shine Effect */}
              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
