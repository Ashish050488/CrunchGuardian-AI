"use client"

import { useState } from "react"
import Card from "./Card"
import Input from "./Input"
import Button from "./Button"

export default function AddressInputForm({ onAnalyze, loading, title, placeholder, buttonText, quickActions = [] }) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    onAnalyze(inputValue.trim())
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              disabled={loading}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={loading || !inputValue.trim()} className="w-full md:w-auto">
              {loading ? "Analyzing..." : buttonText}
            </Button>
          </div>
        </div>
      </form>

      {quickActions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Quick Test:</span>
          {quickActions.map(({ name, address }) => (
            <button
              key={name}
              onClick={() => {
                setInputValue(address)
                onAnalyze(address)
              }}
              disabled={loading}
              className="text-xs px-3 py-1 rounded-lg text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
              style={{ backgroundColor: "#C1CFA1" }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </Card>
  )
}
