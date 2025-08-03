import React from 'react'
import { useAppContext } from '../../context/AppContext'

const NavigationItem = ({ id, label, icon, isActive, onClick, badge = null }) => (
  <button
    onClick={() => onClick(id)}
    className={`minimal-nav-item flex items-center space-x-2 ${isActive ? 'active' : ''}`}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
    {badge && (
      <span className="px-2 py-1 text-xs rounded-full" style={{
        backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--color-accent)',
        color: 'white'
      }}>
        {badge}
      </span>
    )}
  </button>
)

export default function Navigation() {
  const { currentView, setCurrentView, whaleData, fakeNFTData, nftAnalyticsData } = useAppContext()

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      badge: null
    },
    {
      id: 'whale-tracker',
      label: 'Whale Tracker',
      icon: '🐳',
      badge: whaleData.length > 0 ? whaleData.length : null
    },
    {
      id: 'market-insights',
      label: 'Market Insights',
      icon: '📊',
      badge: 'Live'
    },
    {
      id: 'fake-nft-leaderboard',
      label: 'Fake NFT Wall of Shame',
      icon: '🚫',
      badge: fakeNFTData.length > 0 ? fakeNFTData.length : null
    },
    {
      id: 'nft-analytics',
      label: 'NFT Analytics',
      icon: '🔍',
      badge: nftAnalyticsData ? '1' : null
    },
    {
      id: 'portfolio-tracker',
      label: 'Portfolio Tracker',
      icon: '💼',
      badge: 'Soon'
    }
  ]

  return (
    <nav className="relative z-10 bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-4 py-4 overflow-x-auto">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={currentView === item.id}
              onClick={setCurrentView}
              badge={item.badge}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
