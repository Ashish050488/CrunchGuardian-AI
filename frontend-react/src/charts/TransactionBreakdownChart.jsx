import Chart from "react-apexcharts"
export default function TransactionBreakdownChart({ data }) {
  const options = {
    chart: { type: 'pie', foreColor: '#E5E7EB' },
    labels: data.labels,
    colors: ['#22C55E', '#A855F7'],
    tooltip: { theme: 'dark', y: { formatter: (val) => `${val.toLocaleString()} transactions` } },
    legend: { position: 'bottom' }
  }
  return <Chart options={options} series={data.values} type="pie" height={350} />
}