export default function Alert({ children, type = "error", className = "" }) {
  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          backgroundColor: "#FEE2E2",
          borderColor: "#F87171",
          color: "#DC2626",
        }
      case "warning":
        return {
          backgroundColor: "#FEF3C7",
          borderColor: "#F59E0B",
          color: "#D97706",
        }
      case "success":
        return {
          backgroundColor: "#D1FAE5",
          borderColor: "#10B981",
          color: "#059669",
        }
      default:
        return {
          backgroundColor: "#E7CCCC",
          borderColor: "#A5B68D",
          color: "#374151",
        }
    }
  }

  return (
    <div className={`p-4 rounded-xl border-2 ${className}`} style={getTypeStyles()}>
      {children}
    </div>
  )
}
