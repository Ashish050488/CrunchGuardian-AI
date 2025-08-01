import React from "react"
import { AppProvider, useAppContext } from "./context/AppContext"
import Header from "./components/layout/Header"
import Navigation from "./components/layout/Navigation"
import MainDashboard from "./components/dashboard/MainDashboard"
import WhaleTracker from './components/features/WhaleTracker'
import FakeNFTLeaderboard from './components/features/FakeNFTLeaderboard'
import NFTAnalytics from './components/features/NFTAnalytics'
import MarketInsights from './components/features/MarketInsights'
import "./App.css"
import "./styles/minimal-theme.css"

function AppContent() {
  const { currentView } = useAppContext()

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MainDashboard />
      case 'whale-tracker':
        return <WhaleTracker />
      case 'market-insights':
        return <MarketInsights />
      case 'fake-nft-leaderboard':
        return <FakeNFTLeaderboard />
      case 'nft-analytics':
        return <NFTAnalytics />
      case 'portfolio-tracker':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Portfolio Tracker</h2>
            <p className="text-gray-500">Coming Soon - Advanced Portfolio Analytics</p>
          </div>
        )
      default:
        return <MainDashboard />
    }
  }

  return (
    <div className="minimal-theme min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="container mx-auto px-4 py-6">
        <Header />
        <Navigation />
        <main className="mt-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}