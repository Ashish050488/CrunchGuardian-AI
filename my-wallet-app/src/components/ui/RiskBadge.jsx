export default function RiskBadge({ riskLevel }) {
  const getRiskConfig = (level) => {
    switch (level?.toLowerCase()) {
      case "high risk":
        return {
          backgroundColor: "#FEE2E2",
          borderColor: "#F87171",
          textColor: "#DC2626",
          icon: "⚠️",
          pulse: true,
        }
      case "medium risk":
        return {
          backgroundColor: "#FEF3C7",
          borderColor: "#F59E0B",
          textColor: "#D97706",
          icon: "⚡",
          pulse: false,
        }
      case "low risk":
        return {
          backgroundColor: "#D1FAE5",
          borderColor: "#10B981",
          textColor: "#059669",
          icon: "✅",
          pulse: false,
        }
      default:
        return {
          backgroundColor: "#F3F4F6",
          borderColor: "#9CA3AF",
          textColor: "#6B7280",
          icon: "❓",
          pulse: false,
        }
    }
  }

  const config = getRiskConfig(riskLevel)

  return (
    <div
      className={`rounded-2xl p-8 border-4 shadow-xl ${config.pulse ? "animate-pulse" : ""}`}
      style={{
        backgroundColor: config.backgroundColor,
        borderColor: config.borderColor,
      }}
    >
      <div className="flex items-center justify-center space-x-4">
        <span className="text-5xl">{config.icon}</span>
        <div className="text-center">
          <p className="text-lg font-medium opacity-80" style={{ color: config.textColor }}>
            Risk Assessment
          </p>
          <p className="text-4xl font-black" style={{ color: config.textColor }}>
            {riskLevel || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  )
}
