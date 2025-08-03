export default function StatsCard({ title, value, subtitle, icon, trend, color = "default" }) {
  const getColorStyles = () => {
    switch (color) {
      case "success":
        return {
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
          iconBg: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          textColor: "#059669",
        }
      case "warning":
        return {
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)",
          iconBg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          textColor: "#D97706",
        }
      case "danger":
        return {
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)",
          iconBg: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
          textColor: "#DC2626",
        }
      default:
        return {
          background: "linear-gradient(135deg, rgba(165, 182, 141, 0.1) 0%, rgba(193, 207, 161, 0.05) 100%)",
          iconBg: "linear-gradient(135deg, #A5B68D 0%, #C1CFA1 100%)",
          textColor: "#6B7280",
        }
    }
  }

  const styles = getColorStyles()

  return (
    <div
      className="p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
      style={{ background: styles.background }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: styles.iconBg }}
        >
          <span className="text-2xl text-white">{icon}</span>
        </div>
        {trend && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              trend > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {trend > 0 ? "↗️ +" : "↘️ "}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1 break-words leading-tight">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 break-words">{subtitle}</p>}
      </div>
    </div>
  )
}
