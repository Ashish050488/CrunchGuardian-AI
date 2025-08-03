"use client"

import { useState, useEffect } from "react"
import GlassCard from "../ui/GlassCard"
import ModernButton from "../ui/ModernButton"
import ModernInput from "../ui/ModernInput"
import LoadingSpinner from "../ui/LoadingSpinner"
import { aiBackendAPI } from "../../services/aiBackendAPI"

const NFTImage = ({ nft }) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageUrl = nft.metadata?.image_url || nft.metadata?.image

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-64 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center">
          <span className="text-4xl mb-2 block">🖼️</span>
          <p className="text-sm font-medium text-gray-500">No Image</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin border-gray-400"></div>
        </div>
      )}
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={nft.name || "NFT"}
        className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
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

const NFTCard = ({ nft }) => {
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
    if (score >= 70) return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" }
    if (score >= 40) return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" }
    if (score > 0) return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" }
    return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
  }

  const riskColors = getRiskColor(riskScore)

  return (
    <GlassCard className="p-6 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl">
          {!nft.metadata ? (
            <div className="w-full h-64 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin border-gray-400"></div>
            </div>
          ) : (
            <NFTImage nft={nft} />
          )}
          {nft.metadata && typeof riskScore === "number" && (
            <div
              className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-xl shadow-lg border ${riskColors.bg} ${riskColors.text} ${riskColors.border}`}
            >
              Risk: {riskScore}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 truncate" title={name}>
            {name}
          </h3>
          {collectionName && (
            <p className="text-sm text-gray-600 truncate flex items-center" title={collectionName}>
              <span className="mr-1">📁</span>
              {collectionName}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-3 border-t border-white/20">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Quantity:</span>
            <span className="px-3 py-1 text-sm font-bold rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg">
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
    </GlassCard>
  )
}

export default function NFTPortfolio() {
  const [allNfts, setAllNfts] = useState([])
  const [displayedNfts, setDisplayedNfts] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [address, setAddress] = useState("")
  const [blockchain, setBlockchain] = useState("ethereum")

  const PAGE_SIZE = 12

  const fetchInitialList = async (e) => {
    if (e) e.preventDefault()
    if (!address.trim()) return

    setLoading(true)
    setError(null)
    setAllNfts([])
    setDisplayedNfts([])
    setPage(0)

    try {
      const data = await aiBackendAPI.getNftPortfolio(address, blockchain)
      setAllNfts(Array.isArray(data) ? data : [])
      setPage(1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (page === 0 || allNfts.length === 0) return

    const loadNextPageMetadata = async () => {
      setLoadingMore(true)
      const startIndex = (page - 1) * PAGE_SIZE
      const endIndex = page * PAGE_SIZE
      const nftsForPage = allNfts.slice(startIndex, endIndex)

      if (nftsForPage.length === 0) {
        setLoadingMore(false)
        return
      }

      try {
        const placeholders = nftsForPage.map((nft) => ({ ...nft, metadata: null }))
        setDisplayedNfts((prev) => [...prev, ...placeholders])

        const payload = nftsForPage.map((nft) => ({
          contract_address: nft.contract_address,
          token_id: nft.token_id,
        }))

        const metadataMap = await aiBackendAPI.getBatchNftMetadata(payload, blockchain)

        setDisplayedNfts((currentDisplayedNfts) => {
          const updatedNfts = [...currentDisplayedNfts]
          for (let i = startIndex; i < endIndex; i++) {
            if (updatedNfts[i]) {
              const nft = updatedNfts[i]
              const identifier = `${nft.contract_address}:${nft.token_id}`
              updatedNfts[i] = { ...nft, metadata: metadataMap[identifier] || { error: true } }
            }
          }
          return updatedNfts
        })
      } catch (err) {
        console.error("Failed to load page metadata:", err)
      } finally {
        setLoadingMore(false)
      }
    }

    loadNextPageMetadata()
  }, [page, allNfts, blockchain])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🖼️</span>
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
          NFT Portfolio Explorer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover and analyze NFT collections with advanced insights, metadata, and risk scoring
        </p>
      </div>

      {/* Input Section */}
      <GlassCard gradient className="p-8">
        <form onSubmit={fetchInitialList} className="space-y-6">
          <ModernInput
            label="Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            disabled={loading}
            icon="🔍"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 ml-1">Blockchain Network</label>
            <select
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value)}
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-opacity-30 transition-all duration-300 text-gray-800 backdrop-blur-sm bg-white/80 focus:border-opacity-100 focus:shadow-2xl focus:scale-105"
              style={{ borderColor: "#A5B68D" }}
            >
              <option value="ethereum">🔷 Ethereum</option>
              <option value="polygon">🟣 Polygon</option>
            </select>
          </div>

          <ModernButton type="submit" disabled={loading || !address.trim()} size="xl" className="w-full">
            {loading ? "🔍 Fetching Portfolio..." : "🚀 Explore NFT Portfolio"}
          </ModernButton>
        </form>
      </GlassCard>

      {/* Error State */}
      {error && (
        <GlassCard className="p-8 border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <span className="text-3xl text-white">❌</span>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">Portfolio Error</h3>
            <p className="text-lg text-red-700">{error}</p>
          </div>
        </GlassCard>
      )}

      {/* Loading State */}
      {loading && (
        <GlassCard gradient>
          <LoadingSpinner message="🖼️ Loading NFT portfolio..." size="xl" />
        </GlassCard>
      )}

      {/* Results */}
      {displayedNfts.length > 0 && (
        <div className="space-y-8">
          <GlassCard gradient className="p-8">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Portfolio Overview</h2>
                  <p className="text-gray-600">NFT collection analytics</p>
                </div>
              </div>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-3xl font-black text-gray-900 mb-2">{displayedNfts.length}</div>
                <div className="text-sm font-medium text-gray-600">NFTs Loaded</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50">
                <div className="text-3xl font-black text-gray-900 mb-2">{allNfts.length}</div>
                <div className="text-sm font-medium text-gray-600">Total Found</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-3xl font-black text-gray-900 mb-2">
                  {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
                </div>
                <div className="text-sm font-medium text-gray-600">Network</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedNfts.map((nft, index) => (
                <NFTCard key={`${nft.contract_address}:${nft.token_id}:${index}`} nft={nft} />
              ))}
            </div>

            {allNfts.length > displayedNfts.length && (
              <div className="text-center mt-8 pt-6 border-t border-white/20">
                <ModernButton onClick={handleLoadMore} disabled={loadingMore} size="lg">
                  {loadingMore
                    ? "🔄 Loading More..."
                    : `📥 Load More NFTs (${allNfts.length - displayedNfts.length} remaining)`}
                </ModernButton>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  )
}
