import { useState } from "react"
import FarmerDashboard from "./components/FarmerDashboard"
import BuyerDashboard from "./components/BuyerDashboard"
import VerifierDashboard from "./components/VerifierDashboard"
import "./App.css"

export default function App() {
  const [role, setRole] = useState("farmer")

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🌾</span>
          <span className="logo-text">AgroChain</span>
        </div>
        <p className="tagline">Trustless grain escrow on Stellar — built in Kenya, for Africa</p>
        <div className="contract-badge">
          Contract: CDRDKI6MC2UB4VBTWW55AX76KHZP6BGQ46OQRJZGVW2G4X6ZGUUNQSYW
        </div>
      </header>

      <div className="role-tabs">
        <button
          className={role === "farmer" ? "tab active farmer" : "tab"}
          onClick={() => setRole("farmer")}>
          🧑‍🌾 Farmer
        </button>
        <button
          className={role === "buyer" ? "tab active buyer" : "tab"}
          onClick={() => setRole("buyer")}>
          🏪 Buyer
        </button>
        <button
          className={role === "verifier" ? "tab active verifier" : "tab"}
          onClick={() => setRole("verifier")}>
          ✅ Verifier
        </button>
      </div>

      <main className="main">
        {role === "farmer" && <FarmerDashboard />}
        {role === "buyer" && <BuyerDashboard />}
        {role === "verifier" && <VerifierDashboard />}
      </main>

      <footer className="footer">
        <p>Built on Stellar Soroban · Nairobi, Kenya · <a href="https://github.com/karanjadavi/agrochain" target="_blank">GitHub</a></p>
      </footer>
    </div>
  )
}
