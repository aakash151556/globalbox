import React from "react";

const BusinessPlan = () => {
  return (
    <div style={{ padding: "60px 20px", background: "#0b1220", color: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Heading */}
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "10px" }}>
          LIVE INTERNATIONAL (2X) AUTO POOL
        </h1>

        <p style={{ fontSize: "18px", opacity: 0.85, lineHeight: "28px" }}>
          Global Box — Global Income Plan (100% BEP20 USDT / BNB Blockchain)
        </p>

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
            marginTop: "35px",
          }}
        >
          {plans.map((p, i) => (
            <div
              key={i}
              style={{
                background: "#111b33",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 0 25px rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                Level {p.level}
              </h3>
              <p style={{ fontSize: "16px", opacity: 0.9, marginBottom: "6px" }}>
                💰 Investment: <b>${p.invest}</b>
              </p>
              <p style={{ fontSize: "16px", opacity: 0.9 }}>
                🔥 Cashback: <b>${p.cashback}</b>
              </p>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div
          style={{
            marginTop: "40px",
            background: "#111b33",
            padding: "30px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 25px rgba(0,0,0,0.25)",
          }}
        >
          <h2 style={{ fontSize: "26px", marginBottom: "15px" }}>
            📌 Plan Rules & Benefits
          </h2>

          <ul style={{ opacity: 0.88, lineHeight: "30px", paddingLeft: "18px" }}>
            <li>
              ✅ Direct joining compulsory for any amount.
            </li>
            <li>
              ⚡ You will receive payment instantly in your wallet as soon as there are
              <b> two joinings</b> in the house where you invest.
            </li>
            <li>
              💸 <b>Reference Income:</b> 10% (Cashback income continues)
            </li>
            <li>
              🧾 <b>Admin / Withdrawal Charge:</b> 10% (Cashback income)
            </li>
            <li>
              🚀 Instant payout in our wallet system.
            </li>
            <li>
              🔁 Wallet to wallet transfer charge: 5%
            </li>
            <li>
              🔗 100% BNB Blockchain (BEP20 USDT)
            </li>
            <li>
              🪙 Supported wallets: Trust Wallet, MetaMask, and all crypto wallets.
            </li>
            <li>
              ⏰ 24×7 withdrawal & support chat available.
            </li>
          </ul>
        </div>

       
      </div>
    </div>
  );
};

const plans = [
  { level: 1, invest: 10, cashback: 20 },
  { level: 2, invest: 20, cashback: 40 },
  { level: 3, invest: 50, cashback: 100 },
  { level: 4, invest: 100, cashback: 200 },
];

export default BusinessPlan;
