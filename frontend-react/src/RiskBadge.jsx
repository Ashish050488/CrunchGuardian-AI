export default function RiskBadge({ riskLevel }) {
  const config = {
    "High Risk": { gradient: "from-red-500 to-rose-500", icon: "⚠️" },
    "Moderate Risk": { gradient: "from-yellow-500 to-amber-500", icon: "⚡" },
    "Low Risk": { gradient: "from-green-500 to-teal-500", icon: "✅" },
    "default": { gradient: "from-slate-500 to-slate-600", icon: "❓" }
  }
  const { gradient, icon } = config[riskLevel] || config.default;
  return (
    <div className={`relative bg-gradient-to-r ${gradient} rounded-2xl p-8 shadow-lg`}>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-4xl">{icon}</span>
        <div className="text-center">
          <p className="text-sm font-medium text-white/80">Risk Assessment</p>
          <p className="text-3xl font-black text-white">{riskLevel}</p>
        </div>
      </div>
    </div>
  )
}