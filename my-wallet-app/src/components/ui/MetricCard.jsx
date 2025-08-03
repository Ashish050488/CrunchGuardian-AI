export default function MetricCard({ label, value, subValue, icon, trend }) {
  return (
    <div
      className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      style={{ backgroundColor: "#C1CFA1" }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {trend && (
          <span
            className={`text-sm px-2 py-1 rounded-full ${trend > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {trend > 0 ? "↗️" : "↘️"}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
        <p className="text-2xl font-bold text-gray-800 break-words leading-tight">{value}</p>
        {subValue && <p className="text-sm text-gray-600 mt-1 break-words">{subValue}</p>}
      </div>
    </div>
  )
}
