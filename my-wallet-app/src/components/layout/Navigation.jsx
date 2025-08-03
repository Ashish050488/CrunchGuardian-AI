"use client"

import { useAppContext } from "../../context/AppContext"

const NavigationItem = ({ id, label, icon, isActive, onClick, description }) => (
  <button
    onClick={() => onClick(id)}
    className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
      isActive ? "shadow-xl" : "shadow-lg hover:shadow-xl"
    }`}
    style={{
      backgroundColor: isActive ? "#A5B68D" : "#C1CFA1",
    }}
  >
    <div className="flex flex-col items-center space-y-3">
      <span className="text-4xl">{icon}</span>
      <div className="text-center">
        <h3 className={`text-xl font-bold ${isActive ? "text-white" : "text-gray-800"}`}>{label}</h3>
        <p className={`text-sm ${isActive ? "text-white/80" : "text-gray-600"}`}>{description}</p>
      </div>
    </div>
  </button>
)

export default function Navigation() {
  const { currentView, setCurrentView } = useAppContext()

  const navigationItems = [
    {
      id: "ai-reports",
      label: "AI Reports",
      icon: "🤖",
      description: "Comprehensive AI Analysis",
    },
    {
      id: "whale-tracker",
      label: "Whale Tracker",
      icon: "🐳",
      description: "Track Large Wallets",
    },
    {
      id: "nft-portfolio",
      label: "NFT Portfolio",
      icon: "🖼️",
      description: "Analyze NFT Collections",
    },
  ]

  return (
    <nav className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {navigationItems.map((item) => (
        <NavigationItem key={item.id} {...item} isActive={currentView === item.id} onClick={setCurrentView} />
      ))}
    </nav>
  )
}
