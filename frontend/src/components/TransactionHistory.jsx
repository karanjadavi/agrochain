export default function TransactionHistory() {
  const transactions = [
    { id: 1, type: "Batch Listed", crop: "Maize", quantity: 500, price: 1000, farmer: "GBHVG...DELW", status: "Listed", time: "2 mins ago" },
    { id: 2, type: "Escrow Deposited", crop: "Wheat", quantity: 200, price: 600, farmer: "GBXYZ...ABCD", status: "Funded", time: "15 mins ago" },
    { id: 3, type: "Delivery Confirmed", crop: "Sorghum", quantity: 300, price: 750, farmer: "GCABC...5678", status: "Delivered", time: "1 hour ago" },
    { id: 4, type: "Funds Released", crop: "Maize", quantity: 1000, price: 2000, farmer: "GDXYZ...9012", status: "Completed", time: "3 hours ago" },
    { id: 5, type: "Batch Listed", crop: "Barley", quantity: 150, price: 400, farmer: "GBPQR...3456", status: "Listed", time: "5 hours ago" },
  ]

  function statusColor(status) {
    if (status === "Listed") return "badge-listed"
    if (status === "Funded") return "badge-funded"
    if (status === "Delivered") return "badge-delivered"
    if (status === "Completed") return "badge-completed"
    return ""
  }

  return (
    <div className="card" style={{ marginTop: "16px" }}>
      <h3>📋 Recent Transactions</h3>
      <div className="tx-table">
        <div className="tx-header">
          <span>Type</span>
          <span>Crop</span>
          <span>Qty (kg)</span>
          <span>Price (XLM)</span>
          <span>Farmer</span>
          <span>Status</span>
          <span>Time</span>
        </div>
        {transactions.map(tx => (
          <div className="tx-row" key={tx.id}>
            <span className="tx-type">{tx.type}</span>
            <span>{tx.crop}</span>
            <span>{tx.quantity}</span>
            <span>{tx.price}</span>
            <span className="tx-farmer">{tx.farmer}</span>
            <span><span className={"badge " + statusColor(tx.status)}>{tx.status}</span></span>
            <span className="tx-time">{tx.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
