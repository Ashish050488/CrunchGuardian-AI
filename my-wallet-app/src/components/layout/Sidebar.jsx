"use client"

import { useAppContext } from "../../context/AppContext"

const NavigationItem = ({ id, label, icon, isActive, onClick, description, badge }) => (
  <button
    onClick={() => onClick(id)}
    className={`group relative w-full p-6 rounded-3xl transition-all duration-500 transform hover:scale-105 ${
      isActive ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
    }`}
    style={{
      background: isActive
        ? "linear-gradient(135deg, #A5B68D 0%, #C1CFA1 100%)"
        : "linear-gradient(135deg, rgba(231, 204, 204, 0.8) 0%, rgba(193, 207, 161, 0.6) 100%)",
      backdropFilter: "blur(20px)",
    }}
  >
    <div className="flex flex-col items-start space-y-4">
      <div className="flex items-center justify-between w-full">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isActive ? "bg-white/20" : "bg-white/40"
          }`}
        >
          <span className="text-3xl">{icon}</span>
        </div>
        {badge && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isActive ? "bg-white/30 text-white" : "bg-black/10 text-gray-700"
            }`}
          >
            {badge}
          </div>
        )}
      </div>
      <div className="text-left">
        <h3 className={`text-xl font-bold mb-1 ${isActive ? "text-white" : "text-gray-800"}`}>{label}</h3>
        <p className={`text-sm leading-relaxed ${isActive ? "text-white/80" : "text-gray-600"}`}>{description}</p>
      </div>
    </div>
    {isActive && (
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
    )}
  </button>
)

export default function Sidebar() {
  const { currentView, setCurrentView } = useAppContext()

  const navigationItems = [
    {
      id: "ai-reports",
      label: "AI Reports",
      icon: "🤖",
      description: "Advanced AI-powered wallet analysis with comprehensive risk assessment",
      badge: "AI",
    },
    {
      id: "whale-tracker",
      label: "Whale Tracker",
      icon: "🐳",
      description: "Monitor and analyze large wallet movements with real-time insights",
    },
    {
      id: "nft-portfolio",
      label: "NFT Portfolio",
      icon: "🖼️",
      description: "Explore NFT collections with detailed metadata and risk scoring",
    },
  ]

  return (
    <aside className="w-80 p-6 border-r border-black/5 backdrop-blur-xl bg-white/20">
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center shadow-2xl">
            <span className="text-4xl">⚡</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Analytics Suite
          </h2>
          <p className="text-gray-600 text-sm">Choose your analysis tool</p>
        </div>

        <div className="space-y-4">
          {navigationItems.map((item) => (
            <NavigationItem key={item.id} {...item} isActive={currentView === item.id} onClick={setCurrentView} />
          ))}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xl">💡</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Pro Tip</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Use quick test wallets to explore features instantly
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
