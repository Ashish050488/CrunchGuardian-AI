"use client"

import { useState } from "react"

const NFTImage = ({ nft }) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageUrl = nft.metadata?.image_url || nft.metadata?.image

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-64 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#C1CFA1" }}>
        <div className="text-center">
          <span className="text-4xl mb-2 block">🖼️</span>
          <p className="text-sm font-medium text-gray-600">No Image</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#C1CFA1" }}>
          <div
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#A5B68D", borderTopColor: "transparent" }}
          ></div>
        </div>
      )}
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={nft.name || "NFT"}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

const formatTokenId = (tokenId) => {
  if (!tokenId) return "Unknown"
  const id = tokenId.toString()
  if (id.length > 10) {
    return `#${id.substring(0, 6)}...${id.substring(id.length - 4)}`
  }
  return `#${id}`
}

export default function NFTCard({ nft }) {
  const name = nft.metadata?.name || nft.name || formatTokenId(nft.token_id)
  const collectionName =
    nft.metadata?.collection_name && nft.metadata.collection_name !== name
      ? nft.metadata.collection_name
      : nft.collection_name && nft.collection_name !== name
        ? nft.collection_name
        : null

  const traits = nft.metadata?.traits || []
  const riskScore = nft.metadata?.risk_score

  const getRiskColor = (score) => {
    if (score >= 70) return { backgroundColor: "#FEE2E2", color: "#DC2626" }
    if (score >= 40) return { backgroundColor: "#FEF3C7", color: "#D97706" }
    if (score > 0) return { backgroundColor: "#D1FAE5", color: "#059669" }
    return { backgroundColor: "#F3F4F6", color: "#6B7280" }
  }

  return (
    <div
      className="rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      style={{ backgroundColor: "#E7CCCC" }}
    >
      <div className="space-y-4">
        <div className="relative">
          {!nft.metadata ? (
            <div
              className="w-full h-64 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#C1CFA1" }}
            >
              <div
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: "#A5B68D", borderTopColor: "transparent" }}
              ></div>
            </div>
          ) : (
            <NFTImage nft={nft} />
          )}
          {nft.metadata && typeof riskScore === "number" && (
            <div
              className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-xl shadow-lg"
              style={getRiskColor(riskScore)}
            >
              Risk: {riskScore}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800 truncate" title={name}>
            {name}
          </h3>
          {collectionName && (
            <p className="text-sm text-gray-600 truncate" title={collectionName}>
              📁 {collectionName}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-3 border-t-2 border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Quantity:</span>
            <span
              className="px-3 py-1 text-sm font-bold rounded-xl"
              style={{ backgroundColor: "#A5B68D", color: "white" }}
            >
              {nft.quantity || 1}
            </span>
          </div>

          {traits.slice(0, 2).map((trait, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 truncate pr-2">{trait.trait_type || "Trait"}:</span>
              <span className="font-semibold text-gray-800 truncate max-w-24" title={trait.value || "N/A"}>
                {trait.value || "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
