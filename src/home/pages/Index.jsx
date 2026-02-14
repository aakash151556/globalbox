import React from "react";
import { Carousel } from "react-bootstrap";

const Index = () => {
  return (
    <div style={{ background: "#0b1220", minHeight: "100vh" }}>
      {/* Slider */}
      <Carousel fade interval={3500} controls indicators>
        {/* Slide 1 - About */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slider1.png"
            alt="Global Box About"
            style={{ maxHeight: "520px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h2 style={{ fontWeight: "800" }}>About Global Box</h2>
            <p>
              Welcome to Global Box — secure and efficient crypto payments worldwide.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 - Mission */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slider2.png"
            alt="Global Box Mission"
            style={{ maxHeight: "520px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h2 style={{ fontWeight: "800" }}>Our Mission</h2>
            <p>
              To simplify crypto adoption with fast, safe, and user-friendly solutions.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 - Vision */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slider3.png"
            alt="Global Box Vision"
            style={{ maxHeight: "520px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h2 style={{ fontWeight: "800" }}>Our Vision</h2>
            <p>
              Empowering a borderless world of crypto transactions and global income.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* About + Mission + Vision Text */}
      <div className="container py-5 text-white">
        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="p-4 rounded"
              style={{
                background: "#111b33",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h4>🌍 About Us</h4>
              <p style={{ opacity: 0.85 }}>
                Global Box is a next-generation crypto payment & blockchain software
                company built for secure transfers and instant payouts.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded"
              style={{
                background: "#111b33",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h4>🚀 Mission</h4>
              <p style={{ opacity: 0.85 }}>
                To make crypto simple, fast, and safe with QR payments, wallet
                integrations, and blockchain automation.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded"
              style={{
                background: "#111b33",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h4>🔐 Vision</h4>
              <p style={{ opacity: 0.85 }}>
                To build a trusted international platform for borderless crypto
                payments and global income plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
