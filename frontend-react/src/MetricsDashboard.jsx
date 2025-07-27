export default function MetricsDashboard({ metrics, theme }) {
  const metricCards = [
    {
      label: "Wallet Age",
      value: metrics.walletAge,
      icon: "📅",
      color: "from-blue-500 to-cyan-500",
      description: "Account creation date",
    },
    {
      label: "Current Balance",
      value: metrics.currentBalanceUsd,
      subValue: metrics.currentBalanceEth !== "negligible ETH" ? metrics.currentBalanceEth : null,
      icon: "💰",
      color: "from-green-500 to-emerald-500",
      description: "Total wallet value",
    },
    {
      label: "Total Transactions",
      value: metrics.totalTransactions,
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      description: "Historical activity",
    },
    {
      label: "Unique Tokens",
      value: metrics.uniqueTokensHeld,
      icon: "🎯",
      color: "from-orange-500 to-red-500",
      description: "Token diversity",
    },
    {
      label: "Inflow Addresses",
      value: metrics.inflowAddresses,
      icon: "📥",
      color: "from-teal-500 to-blue-500",
      description: "Funding sources",
    },
    {
      label: "Outflow Addresses",
      value: metrics.outflowAddresses,
      icon: "📤",
      color: "from-indigo-500 to-purple-500",
      description: "Destination wallets",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Key Metrics
          </span>
        </h2>
        <p className="text-xl text-slate-400">Comprehensive wallet analysis overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {metricCards.map((metric, index) => (
          <div
            key={index}
            className="group relative transform hover:scale-105 transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card Glow Effect */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${metric.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}
            ></div>

            {/* Main Card */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl h-full">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{metric.icon}</span>
                <div className={`w-4 h-4 bg-gradient-to-r ${metric.color} rounded-full animate-pulse`}></div>
              </div>

              {/* Metric Content */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-400">{metric.label}</p>
                <p className="text-3xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                  {metric.value}
                </p>
                {metric.subValue && <p className="text-sm text-slate-500">{metric.subValue}</p>}
                <p className="text-xs text-slate-600 mt-2">{metric.description}</p>
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Analytics Section */}
      <div className="mt-16 space-y-12">
        {/* Activity Pattern Analysis */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">📈</span>
              Activity Pattern Analysis
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Transaction Flow Visualization */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-300">Transaction Flow</h4>
                <div className="relative h-32 bg-slate-800/50 rounded-xl p-4 overflow-hidden">
                  <div className="flex items-center justify-between h-full">
                    {/* Inflow */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
                        <span className="text-2xl">📥</span>
                      </div>
                      <p className="text-sm text-green-400 font-semibold">{metrics.inflowAddresses}</p>
                      <p className="text-xs text-slate-400">Inflow Sources</p>
                    </div>

                    {/* Flow Animation */}
                    <div className="flex-1 mx-4 relative">
                      <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                      <div className="absolute top-0 left-0 w-4 h-1 bg-white rounded-full animate-flow"></div>
                    </div>

                    {/* Outflow */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2 animate-pulse animation-delay-500">
                        <span className="text-2xl">📤</span>
                      </div>
                      <p className="text-sm text-purple-400 font-semibold">{metrics.outflowAddresses}</p>
                      <p className="text-xs text-slate-400">Outflow Destinations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Maturity Score */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-300">Wallet Maturity</h4>
                <div className="relative">
                  <div className="h-32 bg-slate-800/50 rounded-xl p-6 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">🕐</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{metrics.walletAge}</p>
                        <p className="text-sm text-slate-400">Age</p>
                      </div>
                    </div>

                    {/* Maturity Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Established Wallet (High Maturity)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Diversity Analysis */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Portfolio Diversity Analysis
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Diversity Score */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(Number.parseInt(metrics.uniqueTokensHeld) / 100) * 251.2} 251.2`}
                      className="text-purple-500 animate-pulse"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {Math.min(Number.parseInt(metrics.uniqueTokensHeld) / 100, 99)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-purple-400 font-semibold">Diversity Score</p>
                <p className="text-xs text-slate-400">Very High</p>
              </div>

              {/* Token Categories */}
              <div className="col-span-2 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🪙</span>
                    <span className="text-white">Unique Tokens</span>
                  </div>
                  <span className="text-xl font-bold text-purple-400">{metrics.uniqueTokensHeld}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📊</span>
                    <span className="text-white">Total Transactions</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">{metrics.totalTransactions}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🔄</span>
                    <span className="text-white">Activity Level</span>
                  </div>
                  <span className="text-xl font-bold text-green-400">Very High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Analysis */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">🕸️</span>
              Network Connectivity Analysis
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Connection Strength */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-orange-300">Connection Strength</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Inflow Connections</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                      <span className="text-green-400 font-semibold text-sm">95%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Outflow Connections</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                      <span className="text-purple-400 font-semibold text-sm">88%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Network Centrality</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <span className="text-orange-400 font-semibold text-sm">92%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Indicators */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-orange-300">Risk Indicators</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">⚠️</div>
                    <p className="text-sm text-red-400 font-semibold">High Activity</p>
                    <p className="text-xs text-slate-400">206K+ transactions</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <p className="text-sm text-yellow-400 font-semibold">Complex Network</p>
                    <p className="text-xs text-slate-400">107K+ connections</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <p className="text-sm text-blue-400 font-semibold">Low Balance</p>
                    <p className="text-xs text-slate-400">Negligible funds</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm text-purple-400 font-semibold">High Diversity</p>
                    <p className="text-xs text-slate-400">8.5K+ tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
