// src/GraphDashboard.jsx
"use client"
import RiskCompositionChart from "./RiskCompositionChart"
import TransactionBreakdownChart from "./TransactionBreakdownChart"

function ChartCard({ title, icon, children }) {
  return (
    <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><span className="text-3xl mr-3">{icon}</span>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default function GraphDashboard({ graphData }) {
  if (!graphData) return null

  const hasBreakdownData = graphData.transaction_breakdown_chart?.values?.some(v => v > 0);
  const hasRiskData = graphData.risk_composition_chart?.values?.some(v => v > 0);

  // Don't render the component at all if there is no data for any chart
  if (!hasBreakdownData && !hasRiskData) { 
    return null;
  }

  return (
    <div className="w-full animate-fade-in-up animation-delay-300 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {hasBreakdownData && (
        <ChartCard title="Transaction Breakdown" icon="⚖️">
            <TransactionBreakdownChart data={graphData.transaction_breakdown_chart} />
        </ChartCard>
      )}
      {hasRiskData && (
        <ChartCard title="Risky Volume Composition" icon="⚠️">
            <RiskCompositionChart data={graphData.risk_composition_chart} />
        </ChartCard>
      )}
    </div>
  )
}