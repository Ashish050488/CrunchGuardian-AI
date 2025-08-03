"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-black/5 backdrop-blur-xl bg-white/30">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #A5B68D 0%, #C1CFA1 100%)",
              }}
            >
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              CrunchGuardian
            </h1>
            <p className="text-sm text-gray-500 font-medium">AI Analytics Platform</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-700">Live • {time}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">AI</span>
        </div>
      </div>
    </header>
  )
}
