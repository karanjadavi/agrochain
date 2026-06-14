import { useState } from "react"
import toast from "react-hot-toast"
import Spinner from "./Spinner"

export default function FarmerDashboard({ walletAddress }) {
  const [form, setForm] = useState({
    buyer: "",
    verifier: "",
    crop: "",
    quantity: "",
    price: ""
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!walletAddress) {
      toast.error("Please connect your wallet first!")
      return
    }
    if (!form.crop || !form.quantity || !form.price || !form.buyer || !form.verifier) {
      toast.error("Please fill in all fields.")
      return
    }
    setLoading(true)
    const toastId = toast.loading("Submitting batch to Stellar testnet...")
    await new Promise(r => setTimeout(r, 2000))
    toast.success("Batch listed successfully! Waiting for buyer to deposit escrow.", { id: toastId })
    setLoading(false)
    setForm({ buyer: "", verifier: "", crop: "", quantity: "", price: "" })
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">🧑‍🌾 Farmer Dashboard</h2>
      <p className="dashboard-desc">List your grain batch and set up the escrow deal.</p>

      {!walletAddress && (
        <div className="warning-box">⚠️ Connect your wallet to list a batch.</div>
      )}

      <div className="card">
        <h3>List a Grain Batch</h3>
        <div className="form-group">
          <label>Crop Type</label>
          <input name="crop" placeholder="e.g. Maize, Wheat, Sorghum" value={form.crop} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Quantity (kg)</label>
          <input name="quantity" type="number" placeholder="e.g. 500" value={form.quantity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price (XLM)</label>
          <input name="price" type="number" placeholder="e.g. 1000" value={form.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Buyer Wallet Address</label>
          <input name="buyer" placeholder="G..." value={form.buyer} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Verifier Wallet Address</label>
          <input name="verifier" placeholder="G..." value={form.verifier} onChange={handleChange} />
        </div>
        <button className="btn btn-farmer" onClick={handleSubmit} disabled={loading}>
          {loading ? <><Spinner size={16} color="#fff" />Submitting...</> : "List Batch on Chain"}
        </button>
      </div>

      <div className="card">
        <h3>My Active Batches</h3>
        <div className="empty-state">No active batches yet. List your first batch above.</div>
      </div>
    </div>
  )
}
