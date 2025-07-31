import Chart from "react-apexcharts"
export default function RiskCompositionChart({ data }) {
  const options = {
    chart: { type: 'donut', foreColor: '#E5E7EB' },
    labels: data.labels,
    colors: ['#EF4444', '#F97316', '#EAB308'],
    plotOptions: { pie: { donut: { labels: { show: true, total: { show: true, label: 'Total Risky Volume', color: '#9CA3AF', formatter: (w) => '$' + w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) } } } } },
    tooltip: { theme: 'dark', y: { formatter: (val) => `$${val.toLocaleString()}` } },
    legend: { position: 'bottom' },
    stroke: { width: 0 }
  }
  return <Chart options={options} series={data.values} type="donut" height={350} />
}