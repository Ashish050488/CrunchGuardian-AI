export default function GlassCard({ children, className = "", gradient = false, hover = true }) {
  return (
    <div
      className={`rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 ${
        hover ? "hover:shadow-3xl hover:scale-105" : ""
      } ${className}`}
      style={{
        background: gradient
          ? "linear-gradient(135deg, rgba(231, 204, 204, 0.9) 0%, rgba(237, 232, 220, 0.8) 50%, rgba(193, 207, 161, 0.7) 100%)"
          : "rgba(255, 255, 255, 0.25)",
      }}
    >
      {children}
    </div>
  )
}
