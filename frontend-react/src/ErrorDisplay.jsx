export default function ErrorDisplay({ message }) {
  if (!message) return null

  return (
    <div className="w-full max-w-3xl mb-8 animate-shake">
      <div className="relative group">
        {/* Error Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>

        {/* Error Container */}
        <div className="relative bg-red-900/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-400 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-300 mb-2">Analysis Error</h3>
              <p className="text-red-200 leading-relaxed">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
