"use client"

export default function Button({ children, onClick, disabled = false, variant = "primary", className = "", ...props }) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? "#C1CFA1" : "#A5B68D",
          color: disabled ? "#6B7280" : "white",
        }
      case "secondary":
        return {
          backgroundColor: "#C1CFA1",
          color: "#374151",
        }
      default:
        return {
          backgroundColor: "#A5B68D",
          color: "white",
        }
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </button>
  )
}
