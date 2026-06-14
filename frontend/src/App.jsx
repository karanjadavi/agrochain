import { useState } from "react"
import { Toaster } from "react-hot-toast"
import FarmerDashboard from "./components/FarmerDashboard"
import BuyerDashboard from "./components/BuyerDashboard"
import VerifierDashboard from "./components/VerifierDashboard"
import WalletConnect from "./components/WalletConnect"
import Stats from "./components/Stats"
import TransactionHistory from "./components/TransactionHistory"
import About from "./components/About"
import "./App.css"

export default function App() {
  const [role, setRole] = useState("farmer")
  const [walletAddress, setWalletAddress] = useState("")

  return (
    <div className="app">
      <Toaster position="top-right" toastOptions={{
        success: { duration: 4000, style: { background: "#f0f7f0", color: "#1a5c2a", border: "1.5px solid #1a5c2a" } },
        error: { duration: 4000, style: { background: "#fff0f0", color: "#c00", border: "1.5px solid #c00" } },
        loading: { style: { background: "#f0f4ff", color: "#1a3d5c", border: "1.5px solid #1a3d5c" } },
      }} />
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <span className="logo-icon">🌾</span>
            <span className="logo-text">AgroChain</span>
          </div>
          <WalletConnect onConnect={setWalletAddress} />
        </div>
        <p className="tagline">Trustless grain escrow on Stellar — built in Kenya, for Africa</p>
        <div className="contract-badge">
          Contract: CDRDKI6MC2UB4VBTWW55AX76KHZP6BGQ46OQRJZGVW2G4X6ZGUUNQSYW
        </div>
        {walletAddress && (
          <div className="wallet-info">
            Your address: <span className="mono">{walletAddress}</span>
          </div>
        )}
      </header>

      {role !== "about" && <Stats />}

      <div className="role-tabs">
        <button className={role === "farmer" ? "tab active farmer" : "tab"} onClick={() => setRole("farmer")}>🧑‍🌾 Farmer</button>
        <button className={role === "buyer" ? "tab active buyer" : "tab"} onClick={() => setRole("buyer")}>🏪 Buyer</button>
        <button className={role === "verifier" ? "tab active verifier" : "tab"} onClick={() => setRole("verifier")}>✅ Verifier</button>
        <button className={role === "about" ? "tab active about" : "tab"} onClick={() => setRole("about")}>ℹ️ About</button>
      </div>

      <main className="main">
        {role === "farmer" && <FarmerDashboard walletAddress={walletAddress} />}
        {role === "buyer" && <BuyerDashboard walletAddress={walletAddress} />}
        {role === "verifier" && <VerifierDashboard walletAddress={walletAddress} />}
        {role === "about" && <About />}
      </main>

      {role !== "about" && <TransactionHistory />}

      <footer className="footer">
        <p>Built on Stellar Soroban · Nairobi, Kenya · <a href="https://github.com/karanjadavi/agrochain" target="_blank">GitHub</a></p>
      </footer>
    </div>
  )
}
