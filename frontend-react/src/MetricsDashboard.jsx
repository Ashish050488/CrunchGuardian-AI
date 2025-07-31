function MetricCard({ label, value, subValue, icon }) {
    return (
        <div className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative">
                <p className="text-3xl mb-3">{icon}</p>
                <p className="text-sm font-medium text-slate-400">{label}</p>
                <p className="text-3xl font-black text-white break-words">{value}</p>
                {subValue && <p className="text-sm text-slate-500 break-words mt-1">{subValue}</p>}
            </div>
        </div>
    );
}
export default function MetricsDashboard({ metrics }) {
    const metricCards = [
        { label: "Wallet Age", value: metrics.walletAge, icon: "📅" },
        { label: "Current Balance", value: metrics.currentBalanceUsd, subValue: metrics.currentBalanceEth, icon: "💰" },
        { label: "Total Transactions", value: metrics.totalTransactions, icon: "📊" },
        { label: "Unique Tokens Held", value: metrics.uniqueTokensHeld, icon: "🎯" },
        { label: "Inflow Addresses", value: metrics.inflowAddresses, icon: "📥" },
        { label: "Outflow Addresses", value: metrics.outflowAddresses, icon: "📤" },
        { label: "Sanctioned Volume", value: metrics.sanctionVolumeMetrics, icon: "🚫" },
        { label: "Mixer Volume", value: metrics.mixerVolumeMetrics, icon: "🌀" },
        { label: "Wash Traded NFTs", value: metrics.totalWashTradedNfts, icon: "🧼" },
        { label: "Is Shark?", value: metrics.isShark, icon: "🦈" },
        { label: "Is Whale?", value: metrics.isWhale, icon: "🐳" },
        { label: "Is Contract?", value: metrics.isContract, icon: "📜" },
    ];
    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center">
                <h2 className="text-4xl font-black text-white"><span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Key Metrics</span></h2>
                <p className="text-xl text-slate-400 mt-2">Comprehensive wallet analysis overview</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {metricCards.map((metric) => (<MetricCard key={metric.label} {...metric} />))}
            </div>
        </div>
    )
}