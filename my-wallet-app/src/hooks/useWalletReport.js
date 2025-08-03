"use client"

import { useState, useCallback } from "react"
import { aiBackendAPI } from "../services/aiBackendAPI"

export const useWalletReport = () => {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeWallet = useCallback(async (walletAddress) => {
    setLoading(true)
    setError(null)
    setReportData(null)

    try {
      const data = await aiBackendAPI.generateComprehensiveReport(walletAddress)
      setReportData(data)
    } catch (err) {
      setError(err.message || "An unknown error occurred.")
    } finally {
      setLoading(false)
    }
  }, [])

  return { reportData, loading, error, analyzeWallet }
}
