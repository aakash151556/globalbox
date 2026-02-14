import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted successfully ✅");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ padding: "60px 20px", background: "#0b1220", color: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "10px" }}>
          Contact Global Box
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, lineHeight: "28px" }}>
          Reach out to Global Box for crypto payments, QR transfers, and blockchain solutions.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >
          {/* Contact Info */}
          <div
            style={{
              background: "#111b33",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "22px", marginBottom: "15px" }}>
              🌍 Global Contact Information
            </h3>

            <p style={{ opacity: 0.85, lineHeight: "28px" }}>
              <b>Company:</b> Global Box <br />
              <b>Email:</b> support@globalbox.io <br />
              <b>Phone:</b> +1 (646) 555-0198 <br />
              <b>Office:</b> New York, USA <br />
              <b>Address:</b> 405 Lexington Ave, Manhattan, NY 10174, United States
            </p>

            <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

            <p style={{ opacity: 0.75, lineHeight: "26px" }}>
              🕒 <b>Support Hours:</b> <br />
              Mon - Fri: 9:00 AM - 6:00 PM (EST) <br />
              Sat - Sun: Limited Support
            </p>
          </div>

          {/* Contact Form */}
          <div
            style={{
              background: "#111b33",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,0,0,0.25)",
            }}
          >
            <h3 style={{ fontSize: "22px", marginBottom: "15px" }}>
              ✉️ Send a Message
            </h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                style={{ ...inputStyle, resize: "none" }}
              />

              <button type="submit" style={btnStyle}>
                Send Message 🚀
              </button>
            </form>
          </div>
        </div>

       
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "#0b1220",
  color: "#fff",
  outline: "none",
  fontSize: "15px",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#1d4ed8",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

export default ContactUs;
