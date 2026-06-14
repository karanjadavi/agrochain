import { useState, useEffect } from "react"

export default function WalletConnect({ onConnect }) {
  const [wallet, setWallet] = useState(null)
  const [manual, setManual] = useState("")
  const [showManual, setShowManual] = useState(false)
  const [loading, setLoading] = useState(false)

  async function connectFreighter() {
    setLoading(true)
    try {
      const { isConnected, requestAccess, getPublicKey } = await import("@stellar/freighter-api")
      const connected = await isConnected()
      if (!connected.isConnected) {
        setShowManual(true)
        setLoading(false)
        return
      }
      await requestAccess()
      const key = await getPublicKey()
      if (key.publicKey) {
        setWallet(key.publicKey)
        onConnect(key.publicKey)
      }
    } catch(e) {
      setShowManual(true)
    }
    setLoading(false)
  }

  function connectManual() {
    if (manual.startsWith("G") && manual.length === 56) {
      setWallet(manual)
      onConnect(manual)
      setShowManual(false)
    } else {
      alert("Please enter a valid Stellar address starting with G")
    }
  }

  function shortAddress(addr) {
    return addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : ""
  }

  function disconnect() {
    setWallet(null)
    onConnect("")
  }

  if (wallet) {
    return (
      <div className="wallet-connected">
        <span className="wallet-dot"></span>
        <span className="wallet-address">{shortAddress(wallet)}</span>
        <span className="wallet-label">Connected</span>
        <button onClick={disconnect} className="wallet-disconnect">✕</button>
      </div>
    )
  }

  if (showManual) {
    return (
      <div className="wallet-manual">
        <input
          placeholder="Enter your Stellar address (G...)"
          value={manual}
          onChange={e => setManual(e.target.value)}
          className="wallet-input"
        />
        <button className="wallet-btn" onClick={connectManual}>Connect</button>
        <button className="wallet-cancel" onClick={() => setShowManual(false)}>Cancel</button>
      </div>
    )
  }

  return (
    <div className="wallet-options">
      <button className="wallet-btn" onClick={connectFreighter} disabled={loading}>
        {loading ? "Connecting..." : "🔗 Connect Wallet"}
      </button>
      <button className="wallet-manual-btn" onClick={() => setShowManual(true)}>
        Enter address
      </button>
    </div>
  )
}
