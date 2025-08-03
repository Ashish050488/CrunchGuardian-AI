export default function Card({ children, className = "", style = {}, padding = "p-8" }) {
  return (
    <div className={`rounded-3xl shadow-xl ${padding} ${className}`} style={{ backgroundColor: "#E7CCCC", ...style }}>
      {children}
    </div>
  )
}
