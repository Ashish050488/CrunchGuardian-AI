"use client"

import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("ai-reports")

  const value = {
    currentView,
    setCurrentView,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
