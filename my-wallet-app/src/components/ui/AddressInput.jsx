"use client"

import { useState } from "react"
import Card from "./Card"

export default function AddressInput({ onAnalyze, loading, title, description, buttonText, quickActions = [] }) {
  const [address, setAddress] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    onAnalyze(address.trim())
  }

  const handleQuickAction = (actionAddress) => {
    setAddress(actionAddress)
    onAnalyze(actionAddress)
  }

  return (
    <Card>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">Wallet Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            disabled={loading}
            className="w-full px-6 py-4 text-lg rounded-2xl border-3 border-transparent focus:outline-none focus:border-opacity-70 transition-all duration-300 text-gray-800 placeholder-gray-500"
            style={{
              backgroundColor: "#EDE8DC",
              borderColor: "#A5B68D",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !address.trim()}
          className="w-full py-4 px-8 text-xl font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: loading || !address.trim() ? "#C1CFA1" : "#A5B68D",
            color: "white",
          }}
        >
          {loading ? "🔍 Analyzing..." : `🚀 ${buttonText}`}
        </button>
      </form>

      {quickActions.length > 0 && (
        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <p className="text-lg font-semibold text-gray-700 mb-4 text-center">Quick Test Wallets</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {quickActions.map(({ name, address: actionAddress }) => (
              <button
                key={name}
                onClick={() => handleQuickAction(actionAddress)}
                disabled={loading}
                className="px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundColor: "#C1CFA1",
                  color: "#374151",
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
