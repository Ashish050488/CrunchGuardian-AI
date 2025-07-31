export default function ErrorDisplay({ message }) {
  if (!message) return null
  return (
    <div className="w-full max-w-3xl mb-8">
      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-red-300 mb-2">Analysis Error</h3>
        <p className="text-red-200 leading-relaxed">{message}</p>
      </div>
    </div>
  )
}