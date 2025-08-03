export default function RiskIndicator({ level, className = "" }) {
  const getRiskConfig = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "high risk":
        return {
          gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
          bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)",
          icon: "⚠️",
          pulse: true,
          glow: "0 0 30px rgba(239, 68, 68, 0.3)",
        }
      case "medium risk":
        return {
          gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)",
          icon: "⚡",
          pulse: false,
          glow: "0 0 20px rgba(245, 158, 11, 0.2)",
        }
      case "low risk":
        return {
          gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
          icon: "✅",
          pulse: false,
          glow: "0 0 20px rgba(16, 185, 129, 0.2)",
        }
      default:
        return {
          gradient: "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)",
          bgGradient: "linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(75, 85, 99, 0.05) 100%)",
          icon: "❓",
          pulse: false,
          glow: "0 0 10px rgba(107, 114, 128, 0.1)",
        }
    }
  }

  const config = getRiskConfig(level)

  return (
    <div
      className={`relative p-8 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl ${
        config.pulse ? "animate-pulse" : ""
      } ${className}`}
      style={{
        background: config.bgGradient,
        boxShadow: config.glow,
      }}
    >
      <div className="flex items-center justify-center space-x-6">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ background: config.gradient }}
        >
          <span className="text-4xl">{config.icon}</span>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600 mb-2">Risk Assessment</p>
          <p className="text-4xl font-black text-gray-900">{level || "Unknown"}</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-transparent opacity-50"></div>
    </div>
  )
}
