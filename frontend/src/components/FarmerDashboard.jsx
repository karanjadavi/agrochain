import { useState } from "react"

export default function FarmerDashboard() {
  const [form, setForm] = useState({
    buyer: "",
    verifier: "",
    crop: "",
    quantity: "",
    price: ""
  })
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.crop || !form.quantity || !form.price || !form.buyer || !form.verifier) {
      setStatus("Please fill in all fields.")
      return
    }
    setLoading(true)
    setStatus("Submitting batch to Stellar testnet...")
    await new Promise(r => setTimeout(r, 2000))
    setStatus("Batch listed successfully! Waiting for buyer to deposit escrow.")
    setLoading(false)
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">🧑‍🌾 Farmer Dashboard</h2>
      <p className="dashboard-desc">List your grain batch and set up the escrow deal.</p>

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
          {loading ? "Submitting..." : "List Batch on Chain"}
        </button>
        {status && <p className="status-msg">{status}</p>}
      </div>

      <div className="card">
        <h3>My Active Batches</h3>
        <div className="empty-state">No active batches yet. List your first batch above.</div>
      </div>
    </div>
  )
}
