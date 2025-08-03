import React from 'react';
import { useAppContext } from '../../context/AppContext';

const NavigationItem = ({ id, label, icon, isActive, onClick, badge = null }) => (
  <button
    onClick={() => onClick(id)}
    className={`minimal-nav-item flex items-center space-x-2 ${isActive ? 'active' : ''}`}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
    {badge && (
      <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-blue-600 text-white'}`}>
        {badge}
      </span>
    )}
  </button>
);

export default function Navigation() {
  const { currentView, setCurrentView } = useAppContext();

  const navigationItems = [
    { id: 'ai-reports', label: 'AI Reports', icon: '🤖', badge: 'AI' },
    { id: 'whale-tracker', label: 'Whale Tracker', icon: '🐳', badge: null },
    { id: 'nft-portfolio', label: 'NFT Portfolio', icon: '🖼️', badge: null },
  ];

  return (
    <nav className="relative z-10 bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 py-3 overflow-x-auto">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              {...item}
              isActive={currentView === item.id}
              onClick={setCurrentView}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}