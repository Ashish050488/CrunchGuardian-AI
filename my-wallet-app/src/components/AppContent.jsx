import { useAppContext } from "../context/AppContext"
import Header from "./layout/Header"
import Sidebar from "./layout/Sidebar"
import WhaleTracker from "./features/WhaleTracker"
import AIReports from "./features/AIReports"
import NFTPortfolio from "./features/NFTPortfolio"

export default function AppContent() {
  const { currentView } = useAppContext()

  const renderCurrentView = () => {
    switch (currentView) {
      case "whale-tracker":
        return <WhaleTracker />
      case "nft-portfolio":
        return <NFTPortfolio />
      case "ai-reports":
        return <AIReports />
      default:
        return <AIReports />
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#EDE8DC" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderCurrentView()}</div>
        </main>
      </div>
    </div>
  )
}
