export default function LoadingSpinner({ message, size = "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-8">
        <div
          className={`${sizeClasses[size]} border-4 border-t-transparent rounded-full animate-spin`}
          style={{
            borderColor: "#A5B68D",
            borderTopColor: "transparent",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${sizeClasses[size === "xl" ? "md" : "sm"]} rounded-full animate-pulse`}
            style={{ backgroundColor: "#C1CFA1" }}
          ></div>
        </div>
      </div>
      {message && <p className="text-xl font-semibold text-gray-700 text-center">{message}</p>}
    </div>
  )
}
