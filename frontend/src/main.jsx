import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" toastOptions={{
      success: { duration: 4000, style: { background: "#f0f7f0", color: "#1a5c2a", border: "1.5px solid #1a5c2a" } },
      error: { duration: 4000, style: { background: "#fff0f0", color: "#c00", border: "1.5px solid #c00" } },
      loading: { style: { background: "#f0f4ff", color: "#1a3d5c", border: "1.5px solid #1a3d5c" } },
    }} />
    <App />
  </StrictMode>
)
