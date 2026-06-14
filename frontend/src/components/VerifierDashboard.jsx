import { useState } from "react"
import toast from "react-hot-toast"

export default function VerifierDashboard({ walletAddress }) {
  const [loading, setLoading] = useState(false)
  const [batches] = useState([
    { id: 1, farmer: "GBHVG...DELW", buyer: "GCXYZ...1234", crop: "Maize", quantity: 500, price: 1000, status: "Funded" },
  ])

  async function handleConfirm(id) {
    if (!walletAddress) {
      toast.error("Please connect your wallet first!")
      return
    }
    setLoading(true)
    const toastId = toast.loading(`Confirming delivery for batch #${id}...`)
    await new Promise(r => setTimeout(r, 2000))
    toast.success(`Delivery confirmed for batch #${id}! Funds released to farmer automatically.`, { id: toastId })
    setLoading(false)
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">✅ Verifier Dashboard</h2>
      <p className="dashboard-desc">Confirm grain deliveries to release funds to farmers.</p>

      {!walletAddress && (
        <div className="warning-box">⚠️ Connect your wallet to confirm deliveries.</div>
      )}

      <div className="card">
        <h3>Pending Deliveries</h3>
        <div className="batch-list">
          {batches.map(batch => (
            <div className="batch-item" key={batch.id}>
              <div className="batch-info">
                <span className="batch-crop">{batch.crop}</span>
                <span className="batch-detail">{batch.quantity} kg</span>
                <span className="batch-detail">{batch.price} XLM</span>
                <span className="batch-farmer">Farmer: {batch.farmer}</span>
                <span className="batch-farmer">Buyer: {batch.buyer}</span>
              </div>
              <div className="batch-actions">
                <span className="badge badge-funded">{batch.status}</span>
                <button
                  className="btn btn-verifier"
                  onClick={() => handleConfirm(batch.id)}
                  disabled={loading}>
                  Confirm Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Completed Verifications</h3>
        <div className="empty-state">No completed verifications yet.</div>
      </div>
    </div>
  )
}
