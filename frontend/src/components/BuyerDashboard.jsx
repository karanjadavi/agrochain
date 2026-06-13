import { useState } from "react"

export default function BuyerDashboard() {
  const [batchId, setBatchId] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [batches] = useState([
    { id: 1, farmer: "GBHVG...DELW", crop: "Maize", quantity: 500, price: 1000, status: "Listed" },
    { id: 2, farmer: "GBXYZ...ABCD", crop: "Wheat", quantity: 200, price: 600, status: "Listed" },
  ])

  async function handleDeposit(id) {
    setLoading(true)
    setStatus(`Depositing escrow for batch #${id}...`)
    await new Promise(r => setTimeout(r, 2000))
    setStatus(`Escrow deposited for batch #${id}! Waiting for delivery confirmation.`)
    setLoading(false)
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">🏪 Buyer Dashboard</h2>
      <p className="dashboard-desc">Browse available grain batches and deposit escrow to secure your purchase.</p>

      <div className="card">
        <h3>Available Grain Batches</h3>
        <div className="batch-list">
          {batches.map(batch => (
            <div className="batch-item" key={batch.id}>
              <div className="batch-info">
                <span className="batch-crop">{batch.crop}</span>
                <span className="batch-detail">{batch.quantity} kg</span>
                <span className="batch-detail">{batch.price} XLM</span>
                <span className="batch-farmer">Farmer: {batch.farmer}</span>
              </div>
              <div className="batch-actions">
                <span className="badge badge-listed">{batch.status}</span>
                <button
                  className="btn btn-buyer"
                  onClick={() => handleDeposit(batch.id)}
                  disabled={loading}>
                  Deposit Escrow
                </button>
              </div>
            </div>
          ))}
        </div>
        {status && <p className="status-msg">{status}</p>}
      </div>

      <div className="card">
        <h3>My Purchases</h3>
        <div className="empty-state">No active purchases yet.</div>
      </div>
    </div>
  )
}
