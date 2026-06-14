import { useState } from "react"
import toast from "react-hot-toast"
import Spinner from "./Spinner"

export default function BuyerDashboard({ walletAddress }) {
  const [loading, setLoading] = useState(false)
  const [batches] = useState([
    { id: 1, farmer: "GBHVG...DELW", crop: "Maize", quantity: 500, price: 1000, status: "Listed" },
    { id: 2, farmer: "GBXYZ...ABCD", crop: "Wheat", quantity: 200, price: 600, status: "Listed" },
  ])

  async function handleDeposit(id) {
    if (!walletAddress) {
      toast.error("Please connect your wallet first!")
      return
    }
    setLoading(true)
    const toastId = toast.loading(`Depositing escrow for batch #${id}...`)
    await new Promise(r => setTimeout(r, 2000))
    toast.success(`Escrow deposited for batch #${id}! Waiting for delivery confirmation.`, { id: toastId })
    setLoading(false)
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">🏪 Buyer Dashboard</h2>
      <p className="dashboard-desc">Browse available grain batches and deposit escrow to secure your purchase.</p>

      {!walletAddress && (
        <div className="warning-box">⚠️ Connect your wallet to deposit escrow.</div>
      )}

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
                <button className="btn btn-buyer" onClick={() => handleDeposit(batch.id)} disabled={loading}>
                  {loading ? <><Spinner size={16} color="#fff" />Depositing...</> : "Deposit Escrow"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>My Purchases</h3>
        <div className="empty-state">No active purchases yet.</div>
      </div>
    </div>
  )
}
