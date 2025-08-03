// src/RecentTransactions.jsx
"use client"

const TransactionIcon = ({ type }) => {
    const config = {
        'Mint': { icon: '✨', color: 'bg-green-500/20 text-green-300' },
        'Sale': { icon: '💸', color: 'bg-blue-500/20 text-blue-300' },
        'Transfer': { icon: '↔️', color: 'bg-purple-500/20 text-purple-300' },
        'default': { icon: '🔗', color: 'bg-slate-500/20 text-slate-300' }
    };
    const { icon, color } = config[type] || config.default;
    return <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>{icon}</div>;
};

// New helper function to format the display name
const formatDisplayName = (name) => {
    if (!name) return "Unknown";
    // Check if it's a contract address (starts with 0x and is long)
    if (name.startsWith('0x') && name.length === 42) {
        return `${name.substring(0, 6)}...${name.substring(name.length - 4)}`;
    }
    return name;
};

export default function RecentTransactions({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return null;
    }

    return (
        <div className="w-full animate-fade-in-up animation-delay-500">
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-3xl mr-3">📜</span>
                    Recent NFT Transactions
                </h3>
                <div className="space-y-4">
                    {transactions.map((tx, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-slate-800/50 rounded-lg">
                            <TransactionIcon type={tx.type} />
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-white truncate font-mono text-sm">
                                    {formatDisplayName(tx.collection_name)}
                                </p>
                                <p className="text-sm text-slate-400">Type: {tx.type}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-semibold text-white">
                                    {tx.price_eth ? `${parseFloat(tx.price_eth).toFixed(4)} ETH` : ''}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {new Date(tx.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}