"use client"

export default function ModernButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "lg",
  className = "",
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: disabled
            ? "linear-gradient(135deg, #C1CFA1 0%, #A5B68D 100%)"
            : "linear-gradient(135deg, #A5B68D 0%, #8FA076 100%)",
          color: "white",
          boxShadow: disabled ? "none" : "0 10px 30px rgba(165, 182, 141, 0.4)",
        }
      case "secondary":
        return {
          background: "rgba(255, 255, 255, 0.8)",
          color: "#374151",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }
      case "ghost":
        return {
          background: "transparent",
          color: "#6B7280",
          border: "2px solid rgba(107, 114, 128, 0.2)",
        }
      default:
        return {}
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm"
      case "md":
        return "px-6 py-3 text-base"
      case "lg":
        return "px-8 py-4 text-lg"
      case "xl":
        return "px-10 py-5 text-xl"
      default:
        return "px-6 py-3 text-base"
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:opacity-60 disabled:cursor-not-allowed ${getSizeStyles()} ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </button>
  )
}
