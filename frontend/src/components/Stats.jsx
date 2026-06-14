export default function Stats() {
  const stats = [
    { label: "Batches Listed", value: "24", icon: "🌾" },
    { label: "XLM in Escrow", value: "12,500", icon: "💰" },
    { label: "Deliveries Confirmed", value: "18", icon: "✅" },
    { label: "Grain Traded (kg)", value: "9,200", icon: "📦" },
  ]

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div className="stat-card" key={i}>
          <span className="stat-icon">{stat.icon}</span>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
