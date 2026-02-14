import React from "react";

const AboutUs = () => {
  return (
    <div style={{ padding: "60px 20px", background: "#0b1220", color: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Heading */}
        <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "10px" }}>
          About Global Box
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, lineHeight: "28px" }}>
          Global Box is a next-generation crypto payment and blockchain software company,
          built to make digital transfers faster, safer, and easier for everyone.
        </p>

        {/* Sections */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {/* Mission */}
          <div
            style={{
              background: "#111b33",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>🚀 Our Mission</h3>
            <p style={{ opacity: 0.85, lineHeight: "26px" }}>
              To simplify crypto adoption by delivering secure, user-friendly solutions
              for payments, transfers, and blockchain-powered services worldwide.
            </p>
          </div>

          {/* Vision */}
          <div
            style={{
              background: "#111b33",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>🌍 Our Vision</h3>
            <p style={{ opacity: 0.85, lineHeight: "26px" }}>
              To become a trusted global platform where anyone can send, receive, and
              manage crypto payments with confidence — anytime, anywhere.
            </p>
          </div>

          {/* Why Us */}
          <div
            style={{
              background: "#111b33",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>🔐 Why Global Box?</h3>
            <ul style={{ opacity: 0.85, lineHeight: "28px", paddingLeft: "18px" }}>
              <li>Secure wallet & blockchain integrations</li>
              <li>QR-based crypto payments</li>
              <li>Fast transfers & transparent tracking</li>
              <li>Modern UI + DApp browser support</li>
            </ul>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AboutUs;
