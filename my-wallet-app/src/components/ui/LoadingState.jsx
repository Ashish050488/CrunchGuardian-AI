import Card from "./Card"

export default function LoadingState({ message }) {
  return (
    <Card className="text-center py-16">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div
            className="w-20 h-20 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#A5B68D", borderTopColor: "transparent" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
        </div>
        <p className="text-xl font-semibold text-gray-700">{message}</p>
      </div>
    </Card>
  )
}
