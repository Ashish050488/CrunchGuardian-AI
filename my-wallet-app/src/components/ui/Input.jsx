"use client"

export default function Input({ value, onChange, placeholder, disabled = false, className = "", ...props }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl border-2 border-transparent focus:outline-none focus:border-opacity-50 transition-all duration-200 text-gray-800 placeholder-gray-500 ${className}`}
      style={{
        backgroundColor: "#EDE8DC",
        borderColor: "#C1CFA1",
      }}
      {...props}
    />
  )
}
