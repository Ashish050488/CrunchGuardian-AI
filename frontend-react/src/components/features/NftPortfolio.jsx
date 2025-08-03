import React, { useState, useEffect } from 'react';
import aiBackendAPI from '../../services/aiBackendAPI';

const NftImage = ({ nft }) => {
    const [hasError, setHasError] = useState(false);
    const imageUrl = nft.metadata?.image_url || nft.metadata?.image;

    // If there is no URL, or if the URL has proven to be a broken link, show a placeholder.
    if (!imageUrl || hasError) {
        return (
            <div className="w-full h-48 rounded-md mb-3 flex items-center justify-center bg-gray-700">
                <p className="text-sm text-gray-400">No Image Found</p>
            </div>
        );
    }

    // Otherwise, attempt to render the image. If it fails, the onError will trigger the placeholder on the next render.
    return (
        <img 
            src={imageUrl} 
            alt={nft.name || 'NFT Image'} 
            className="w-full h-48 object-cover rounded-md mb-3"
            loading="lazy"
            onError={() => setHasError(true)} 
        />
    );
};

const NftCard = ({ nft }) => {
    const name = nft.metadata?.name || nft.name || `#${nft.token_id}`;
    // FIX: This logic ensures the collection name is only shown if it exists and is different from the NFT's own name.
    const collectionName = (nft.metadata?.collection_name && nft.metadata.collection_name !== name) 
                         ? nft.metadata.collection_name 
                         : (nft.collection_name && nft.collection_name !== name)
                         ? nft.collection_name
                         : null;
                         
    const traits = nft.metadata?.traits || [];
    const riskScore = nft.metadata?.risk_score;

    const getRiskColor = (score) => {
        if (score >= 70) return 'bg-red-500/20 text-red-400';
        if (score >= 40) return 'bg-yellow-500/20 text-yellow-400';
        if (score > 0) return 'bg-green-500/20 text-green-400';
        return 'bg-gray-500/20 text-gray-400';
    };

    return (
        <div className="minimal-card bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
                <div className="relative">
                    {!nft.metadata ? (
                        <div className="w-full h-48 rounded-md mb-3 flex items-center justify-center bg-gray-700">
                            <div className="minimal-loading"></div>
                        </div>
                    ) : (
                        <NftImage nft={nft} />
                    )}
                    {nft.metadata && typeof riskScore === 'number' && (
                        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded ${getRiskColor(riskScore)}`}>
                            Risk: {riskScore}
                        </div>
                    )}
                </div>
                <h3 className="font-bold text-white truncate" title={name}>{name}</h3>
                {collectionName && <p className="text-sm text-gray-400 truncate" title={collectionName}>{collectionName}</p>}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                <div className="text-xs flex justify-between">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="font-semibold text-white">{nft.quantity || 1}</span>
                </div>
                {traits.slice(0, 2).map((trait, index) => (
                    <div key={index} className="text-xs flex justify-between">
                        <span className="text-gray-400 truncate pr-2">{trait.trait_type || 'Trait'}:</span>
                        <span className="font-semibold text-white truncate">{trait.value || 'N/A'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const NftPortfolio = () => {
    const [allNfts, setAllNfts] = useState([]);
    const [displayedNfts, setDisplayedNfts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');
    const [blockchain, setBlockchain] = useState('ethereum');

    const PAGE_SIZE = 12;

    const fetchInitialList = async (e) => {
        if (e) e.preventDefault();
        if (!address.trim()) return;

        setLoading(true);
        setError(null);
        setAllNfts([]);
        setDisplayedNfts([]);
        setPage(0);
        try {
            const data = await aiBackendAPI.getNftPortfolio(address, blockchain);
            setAllNfts(Array.isArray(data) ? data : []);
            setPage(1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page === 0 || allNfts.length === 0) return;

        const loadNextPageMetadata = async () => {
            setLoadingMore(true);
            const startIndex = (page - 1) * PAGE_SIZE;
            const endIndex = page * PAGE_SIZE;
            const nftsForPage = allNfts.slice(startIndex, endIndex);

            if (nftsForPage.length === 0) {
                setLoadingMore(false);
                return;
            }

            try {
                const placeholders = nftsForPage.map(nft => ({ ...nft, metadata: null }));
                setDisplayedNfts(prev => [...prev, ...placeholders]);
                
                const payload = nftsForPage.map(nft => ({
                    contract_address: nft.contract_address,
                    token_id: nft.token_id
                }));
                const metadataMap = await aiBackendAPI.getBatchNftMetadata(payload, blockchain);
                
                setDisplayedNfts(currentDisplayedNfts => {
                    const updatedNfts = [...currentDisplayedNfts];
                    for (let i = startIndex; i < endIndex; i++) {
                        if (updatedNfts[i]) {
                            const nft = updatedNfts[i];
                            const identifier = `${nft.contract_address}:${nft.token_id}`;
                            updatedNfts[i] = { ...nft, metadata: metadataMap[identifier] || { error: true } };
                        }
                    }
                    return updatedNfts;
                });

            } catch (err) {
                console.error("Failed to load page metadata:", err);
            } finally {
                setLoadingMore(false);
            }
        };

        loadNextPageMetadata();
    }, [page, allNfts, blockchain]);

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            <div className="minimal-card">
                <h1 className="text-3xl font-bold text-white">🖼️ NFT Portfolio</h1>
                <p className="text-gray-400">NFTs load in pages to prevent API errors.</p>
            </div>
            <form onSubmit={fetchInitialList} className="minimal-card space-y-4">
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter wallet address (0x...)" className="minimal-input w-full"/>
                <select value={blockchain} onChange={(e) => setBlockchain(e.target.value)} className="minimal-input w-full">
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                </select>
                <button type="submit" disabled={loading} className="minimal-btn w-full">
                    {loading ? 'Fetching NFT List...' : 'Fetch NFT Portfolio'}
                </button>
            </form>

            {error && <div className="minimal-alert minimal-alert-danger">{error}</div>}
            {loading && <div className="text-center py-12"><div className="minimal-loading mx-auto"></div></div>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedNfts.map(nft => (
                    <NftCard key={`${nft.contract_address}:${nft.token_id}`} nft={nft} />
                ))}
            </div>

            {allNfts.length > displayedNfts.length && (
                <div className="text-center mt-6">
                    <button onClick={handleLoadMore} disabled={loadingMore} className="minimal-btn">
                        {loadingMore ? 'Loading More...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default NftPortfolio;