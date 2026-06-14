export default function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <h1>🌾 AgroChain</h1>
        <p className="about-tagline">Trustless grain escrow on Stellar Soroban — built in Kenya, for Africa</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h2>😔 The Problem</h2>
          <p>Farmers in Kenya deliver grain to buyers and wait weeks or months to get paid — or never get paid at all. There is no system to enforce payment, no middleman both sides trust, and no paper trail that cannot be faked. Small-scale farmers lose billions of shillings every year to dishonest buyers.</p>
        </div>

        <div className="about-card">
          <h2>✅ The Solution</h2>
          <p>AgroChain uses Stellar Soroban smart contracts to hold buyer funds in escrow before delivery. A trusted verifier confirms the grain arrived. The contract releases payment to the farmer automatically — no bank, no middleman, no way to cheat. The entire transaction is recorded permanently on the blockchain.</p>
        </div>

        <div className="about-card">
          <h2>⚙️ How It Works</h2>
          <ol className="about-steps">
            <li>Farmer lists a grain batch with crop type, quantity and price</li>
            <li>Buyer deposits funds into the smart contract escrow</li>
            <li>Grain is delivered to the buyer</li>
            <li>Trusted verifier confirms delivery on-chain</li>
            <li>Contract automatically releases funds to the farmer</li>
          </ol>
        </div>

        <div className="about-card">
          <h2>🛠️ Tech Stack</h2>
          <ul className="about-tech">
            <li><span className="tech-badge">Rust</span> Smart contract language</li>
            <li><span className="tech-badge">Soroban</span> Stellar smart contract platform</li>
            <li><span className="tech-badge">React</span> Frontend framework</li>
            <li><span className="tech-badge">Stellar</span> Blockchain network</li>
            <li><span className="tech-badge">Vercel</span> Frontend deployment</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>🗺️ Roadmap</h2>
          <ul className="about-roadmap">
            <li className="done">✅ Smart contract written and tested</li>
            <li className="done">✅ Deployed to Stellar testnet</li>
            <li className="done">✅ React frontend dashboard</li>
            <li className="done">✅ Wallet connect integration</li>
            <li className="pending">⏳ M-Pesa KES offramp for farmers</li>
            <li className="pending">⏳ Mobile app for rural farmers</li>
            <li className="pending">⏳ ETHSafari Kenya 2026 submission</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>👨‍💻 Built By</h2>
          <div className="about-team">
            <div className="team-member">
              <span className="team-avatar">👨‍💻</span>
              <div>
                <strong>karanjadavi</strong>
                <p>Blockchain developer · Nairobi, Kenya</p>
                <a href="https://github.com/karanjadavi" target="_blank">github.com/karanjadavi</a>
              </div>
            </div>
          </div>
          <div className="about-contract">
            <p>Contract ID:</p>
            <code>CDRDKI6MC2UB4VBTWW55AX76KHZP6BGQ46OQRJZGVW2G4X6ZGUUNQSYW</code>
          </div>
        </div>
      </div>
    </div>
  )
}
