import React from 'react'
import { useAppContext } from '../../context/AppContext'

export default function Header() {
  const { selectedWallet, resetAnalysis } = useAppContext()

  return (
    <header className="minimal-card mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
              <span className="text-xl font-bold text-white">🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                CrunchGuardian AI
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>NFT Analytics & Risk Assessment</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-8">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-success)' }}></div>
            <span className="text-sm font-medium" style={{ color: 'var(--color-success)' }}>Live</span>
          </div>
        </div>
      </div>
    </header>
  )
}
