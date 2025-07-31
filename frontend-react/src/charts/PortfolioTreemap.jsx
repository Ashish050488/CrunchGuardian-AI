import Chart from "react-apexcharts"
export default function PortfolioTreemap({ data }) {
  const options = {
    chart: { type: 'treemap', foreColor: '#E5E7EB' },
    legend: { show: false },
    dataLabels: { enabled: true, style: { fontSize: '14px', colors: ["#fff"] }, offsetY: -4 },
    plotOptions: { treemap: { distributed: true, enableShades: false } },
    tooltip: { theme: 'dark', y: { formatter: (val) => `$${val.toLocaleString()}` } }
  }
  const series = [{ data: data }]
  return <Chart options={options} series={series} type="treemap" height={350} />
}