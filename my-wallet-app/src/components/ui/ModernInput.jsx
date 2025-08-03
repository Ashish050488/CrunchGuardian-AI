"use client"

import { useState } from "react"

export default function ModernInput({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  icon,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {label && <label className="block text-sm font-semibold text-gray-700 mb-3 ml-1">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full ${icon ? "pl-14" : "pl-6"} pr-6 py-4 text-lg rounded-2xl border-2 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm ${
            focused ? "border-opacity-100 shadow-2xl transform scale-105" : "border-opacity-30 shadow-lg"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            borderColor: focused ? "#A5B68D" : "rgba(165, 182, 141, 0.3)",
          }}
          {...props}
        />
      </div>
    </div>
  )
}
