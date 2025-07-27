export default function RiskBadge({ riskLevel, theme }) {
  const getRiskConfig = (level) => {
    switch (level) {
      case "High Risk":
        return {
          gradient: "from-red-500 via-pink-500 to-rose-500",
          shadow: "shadow-red-500/50",
          icon: "⚠️",
          pulse: "animate-pulse",
          glow: "shadow-2xl shadow-red-500/30",
        }
      case "Moderate Risk":
      case "Moderate Risk (Warning)":
        return {
          gradient: "from-yellow-500 via-orange-500 to-amber-500",
          shadow: "shadow-yellow-500/50",
          icon: "⚡",
          pulse: "",
          glow: "shadow-2xl shadow-yellow-500/30",
        }
      case "Low Risk":
      case "Low Risk (Notable Holder)":
        return {
          gradient: "from-green-500 via-emerald-500 to-teal-500",
          shadow: "shadow-green-500/50",
          icon: "✅",
          pulse: "",
          glow: "shadow-2xl shadow-green-500/30",
        }
      case "New/Inactive Wallet (Further Assessment Needed)":
        return {
          gradient: "from-blue-500 via-indigo-500 to-purple-500",
          shadow: "shadow-blue-500/50",
          icon: "🔍",
          pulse: "",
          glow: "shadow-2xl shadow-blue-500/30",
        }
      default:
        return {
          gradient: "from-slate-500 via-gray-500 to-slate-600",
          shadow: "shadow-slate-500/50",
          icon: "❓",
          pulse: "",
          glow: "shadow-2xl shadow-slate-500/30",
        }
    }
  }

  const config = getRiskConfig(riskLevel)

  return (
    <div className="relative group">
      {/* Outer Glow Ring */}
      <div
        className={`absolute -inset-4 bg-gradient-to-r ${config.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 ${config.pulse}`}
      ></div>

      {/* Main Badge */}
      <div
        className={`
        relative bg-gradient-to-r ${config.gradient} 
        rounded-2xl p-8 ${config.glow}
        transform hover:scale-105 transition-all duration-500
        border border-white/20 backdrop-blur-xl
        ${config.pulse}
      `}
      >
        <div className="flex items-center justify-center space-x-4">
          <span className="text-4xl animate-bounce">{config.icon}</span>
          <div className="text-center">
            <p className="text-sm font-medium text-white/80 mb-1">Risk Assessment</p>
            <p className="text-3xl font-black text-white drop-shadow-lg">{riskLevel}</p>
          </div>
        </div>

        {/* Inner Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  )
}
