export default function ReportDisplay({ report, theme }) {
  if (!report) return null

  const parseMarkdown = (text) => {
    const lines = text.split("\n")
    const sections = []
    let currentSection = null

    lines.forEach((line, index) => {
      // Main report title
      if (line.includes("CrunchGuardian AI Report for")) {
        const address = line.split("for ")[1]
        sections.push({
          type: "header",
          content: { title: "CrunchGuardian AI Report", address },
          index,
        })
        return
      }

      // Risk assessment
      if (line.includes("Overall Risk Assessment:")) {
        const riskLevel = line.split(":")[1]?.trim()
        sections.push({
          type: "risk",
          content: { level: riskLevel },
          index,
        })
        return
      }

      // Section headers
      if (
        line === "Summary" ||
        line === "Key Metrics" ||
        line === "Activity Analysis" ||
        line === "Authenticity & NFT Scores Insights" ||
        line === "Analyst's Verdict"
      ) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          type: "section",
          title: line,
          content: [],
          index,
        }
        return
      }

      // Content lines
      if (currentSection && line.trim()) {
        currentSection.content.push(line)
      }
    })

    if (currentSection) {
      sections.push(currentSection)
    }

    return sections.map((section, idx) => {
      switch (section.type) {
        case "header":
          return <ReportHeader key={idx} {...section.content} />
        case "risk":
          return <RiskAssessment key={idx} {...section.content} />
        case "section":
          return <ReportSection key={idx} {...section} />
        default:
          return null
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Analysis Report
          </span>
        </h2>
        <p className="text-xl text-slate-400">Detailed blockchain intelligence findings</p>
      </div>

      {/* Report Container */}
      <div className="relative group">
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

        {/* Main Report */}
        <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-12">{parseMarkdown(report)}</div>
        </div>
      </div>
    </div>
  )
}

// Report Header Component
function ReportHeader({ title, address }) {
  return (
    <div className="text-center mb-12 animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl animate-pulse-glow">
        <span className="text-3xl">🛡️</span>
      </div>
      <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 max-w-2xl mx-auto border border-slate-700/30">
        <p className="text-sm text-slate-400 mb-2">Wallet Address</p>
        <p className="font-mono text-lg text-blue-300 break-all">{address}</p>
      </div>
    </div>
  )
}

// Risk Assessment Component
function RiskAssessment({ level }) {
  const getRiskConfig = (riskLevel) => {
    if (riskLevel?.includes("High")) {
      return {
        gradient: "from-red-500 via-pink-500 to-rose-500",
        icon: "⚠️",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        textColor: "text-red-300",
        severity: "CRITICAL",
        description: "Immediate attention required",
      }
    }
    if (riskLevel?.includes("Moderate")) {
      return {
        gradient: "from-yellow-500 via-orange-500 to-amber-500",
        icon: "⚡",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        textColor: "text-yellow-300",
        severity: "WARNING",
        description: "Caution advised",
      }
    }
    if (riskLevel?.includes("Low")) {
      return {
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        icon: "✅",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textColor: "text-green-300",
        severity: "SAFE",
        description: "Low risk detected",
      }
    }
    return {
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      icon: "🔍",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300",
      severity: "UNKNOWN",
      description: "Further analysis needed",
    }
  }

  const config = getRiskConfig(level)

  return (
    <div className="my-12 animate-scale-in">
      <div className="relative group">
        {/* Pulsing Background */}
        <div
          className={`absolute -inset-4 bg-gradient-to-r ${config.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`}
        ></div>

        {/* Main Risk Card */}
        <div
          className={`relative ${config.bgColor} backdrop-blur-xl border-2 ${config.borderColor} rounded-2xl p-8 shadow-2xl`}
        >
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">{config.icon}</div>
              <div className={`text-xs font-bold ${config.textColor} tracking-wider`}>{config.severity}</div>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-slate-400 mb-2">Overall Risk Assessment</p>
              <p className="text-4xl font-black text-white mb-2">{level}</p>
              <p className={`text-sm ${config.textColor}`}>{config.description}</p>
            </div>
          </div>

          {/* Risk Level Indicator */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className={`bg-gradient-to-r ${config.gradient} h-3 rounded-full transition-all duration-1000 animate-pulse`}
                style={{
                  width: level?.includes("High") ? "90%" : level?.includes("Moderate") ? "60%" : "30%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Report Section Component
function ReportSection({ title, content }) {
  const getSectionConfig = (sectionTitle) => {
    switch (sectionTitle) {
      case "Summary":
        return { icon: "📋", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500/5" }
      case "Key Metrics":
        return { icon: "📊", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/5" }
      case "Activity Analysis":
        return { icon: "⚡", color: "from-green-500 to-emerald-500", bgColor: "bg-green-500/5" }
      case "Authenticity & NFT Scores Insights":
        return { icon: "🎨", color: "from-orange-500 to-red-500", bgColor: "bg-orange-500/5" }
      case "Analyst's Verdict":
        return { icon: "⚖️", color: "from-red-500 to-pink-500", bgColor: "bg-red-500/5" }
      default:
        return { icon: "📄", color: "from-slate-500 to-slate-600", bgColor: "bg-slate-500/5" }
    }
  }

  const config = getSectionConfig(title)

  const renderContent = () => {
    if (title === "Key Metrics") {
      return <KeyMetricsSection content={content} />
    }
    if (title === "Activity Analysis") {
      return <ActivityAnalysisSection content={content} />
    }
    if (title === "Authenticity & NFT Scores Insights") {
      return <NFTInsightsSection content={content} />
    }
    if (title === "Analyst's Verdict") {
      return <AnalystVerdictSection content={content} />
    }
    return <DefaultSection content={content} />
  }

  return (
    <div className="mb-12 animate-fade-in-up">
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div
          className={`w-14 h-14 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center shadow-lg`}
        >
          <span className="text-2xl">{config.icon}</span>
        </div>
        <div>
          <h4 className="text-3xl font-bold text-white">{title}</h4>
          <div className={`w-32 h-1 bg-gradient-to-r ${config.color} rounded-full mt-2`}></div>
        </div>
      </div>

      {/* Section Content */}
      <div className={`${config.bgColor} backdrop-blur-xl rounded-2xl p-8 border border-slate-700/30`}>
        {renderContent()}
      </div>
    </div>
  )
}

// Key Metrics Section
function KeyMetricsSection({ content }) {
  const metrics = content
    .filter((line) => line.includes(":"))
    .map((line) => {
      const [label, value] = line.split(":")
      return { label: label.replace("**", "").trim(), value: value.replace("**", "").trim() }
    })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="group bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                {metric.value}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl">📊</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Activity Analysis Section
function ActivityAnalysisSection({ content }) {
  const text = content.join(" ")

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-xl">⚡</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Activity Pattern</h5>
            <p className="text-slate-300 leading-relaxed">{highlightKeywords(text)}</p>
          </div>
        </div>
      </div>

      {/* Activity Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-700/20">
          <div className="text-3xl mb-2">📥</div>
          <p className="text-sm text-green-400 font-semibold">Primary Role</p>
          <p className="text-xs text-slate-400">Fund Receiver</p>
        </div>
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-700/20">
          <div className="text-3xl mb-2">🏦</div>
          <p className="text-sm text-blue-400 font-semibold">Wallet Type</p>
          <p className="text-xs text-slate-400">Collection/Distribution</p>
        </div>
        <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-700/20">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-sm text-green-400 font-semibold">Clean Status</p>
          <p className="text-xs text-slate-400">No Illicit Activity</p>
        </div>
      </div>
    </div>
  )
}

// NFT Insights Section
function NFTInsightsSection({ content }) {
  const text = content.join(" ")

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🎨</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">NFT Analysis</h5>
            <p className="text-slate-300 leading-relaxed">{highlightKeywords(text)}</p>
          </div>
        </div>
      </div>

      {/* NFT Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
          <div className="text-3xl mb-2">💰</div>
          <p className="text-sm text-red-400 font-semibold">Price Score</p>
          <p className="text-lg font-bold text-white">$0.00</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
          <div className="text-3xl mb-2">⭐</div>
          <p className="text-sm text-red-400 font-semibold">Rarity Score</p>
          <p className="text-lg font-bold text-white">0.00</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="text-sm text-red-400 font-semibold">Wash Trade</p>
          <p className="text-lg font-bold text-white">True</p>
        </div>
      </div>
    </div>
  )
}

// Analyst's Verdict Section
function AnalystVerdictSection({ content }) {
  const text = content.join(" ")

  return (
    <div className="space-y-6">
      <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Final Assessment</h5>
            <p className="text-slate-300 leading-relaxed">{highlightKeywords(text)}</p>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h6 className="text-sm font-semibold text-red-300">Risk Factors</h6>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Sanctioned flagging</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Wash trading activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Low-value NFT patterns</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h6 className="text-sm font-semibold text-blue-300">Recommendations</h6>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Further investigation required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Monitor transaction patterns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-300">Assess entity relationships</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default Section
function DefaultSection({ content }) {
  return (
    <div className="space-y-4">
      {content.map((line, index) => (
        <p key={index} className="text-slate-300 leading-relaxed text-lg">
          {highlightKeywords(line)}
        </p>
      ))}
    </div>
  )
}

// Utility function to highlight keywords
function highlightKeywords(text) {
  const keywords = [
    "High Risk",
    "Moderate Risk",
    "Low Risk",
    "sanctioned",
    "mixer",
    "illicit",
    "wash trade",
    "forgeries",
    "established",
    "active",
    "minimal",
    "True",
    "False",
  ]

  let highlightedText = text
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    highlightedText = highlightedText.replace(regex, (match) => {
      const isRisk = match.toLowerCase().includes("risk")
      const isNegative = ["sanctioned", "mixer", "illicit", "wash trade", "forgeries"].includes(match.toLowerCase())
      const isPositive = ["established", "active"].includes(match.toLowerCase())

      let className = "bg-blue-400/20 text-blue-300"
      if (isRisk) className = "bg-red-400/20 text-red-300"
      else if (isNegative) className = "bg-red-400/20 text-red-300"
      else if (isPositive) className = "bg-green-400/20 text-green-300"

      return `<span class="${className} px-2 py-1 rounded font-semibold">${match}</span>`
    })
  })

  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
}
