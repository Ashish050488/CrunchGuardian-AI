import { useState } from "react"
export default function AnalysisForm({ onAnalyze, isLoading, setError }) {
  const [address, setAddress] = useState("")
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
      <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
        <label htmlFor="address" className="block text-lg font-semibold text-white mb-4">Wallet Address</label>
        <input
          type="text" id="address" value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum wallet address (0x...)"
          className="w-full px-6 py-5 bg-slate-800/50 border-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit" disabled={isLoading || !address.trim()}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg py-4 rounded-xl hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? "Analyzing..." : "Analyze Wallet"}
        </button>
      </div>
    </form>
  )
}