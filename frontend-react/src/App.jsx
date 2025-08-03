import React from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import WhaleTracker from './components/features/WhaleTracker';
import NftPortfolio from './components/features/NftPortfolio';
import AIReports from './components/features/AIReports';
import "./App.css";
import "./styles/minimal-theme.css";

function AppContent() {
  const { currentView } = useAppContext();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'whale-tracker':
        return <WhaleTracker />;
      case 'nft-portfolio':
        return <NftPortfolio />;
      case 'ai-reports':
        return <AIReports />;
      default:
        return <AIReports />;
    }
  };

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
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}