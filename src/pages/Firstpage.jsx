import React from "react";
import "./Firstpage.css";
import { Link } from "react-router-dom";
import logo from "/logo.png";

const FirstPage = () => {
  return (
    <div className="fp-root">

      {/* Background Blobs */}
      <div className="fp-blob fp-blob-1"></div>
      <div className="fp-blob fp-blob-2"></div>
      <div className="fp-blob fp-blob-3"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="fp-navbar">
        <div className="fp-navbar-left">
          <img src={logo} alt="UPISAFE Logo" className="fp-logo" />
          <span className="fp-brand">UPISAFE</span>
        </div>

        <div className="fp-navbar-right">
          <Link to="/login" className="fp-nav-btn fp-nav-signin">
            Login
          </Link>

          <Link to="/signup" className="fp-nav-btn fp-nav-register">
            Register
          </Link>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="fp-main">

        <h1 className="fp-title">
          Welcome to <span>UPISAFE</span>
        </h1>

        <h2 className="fp-subtitle">
          Instant UPI Fraud Alert & Safety Verification
        </h2>

        <p className="fp-quote">
          "Stay secure before every payment."
        </p>

        {/* ================= STATS ================= */}
        <div className="fp-stats">

          <div className="fp-stat-box">
            <h3>Check Safe or Fraud Transaction</h3>

            <div className="fp-divider"></div>

            <p className="fp-card-quote">
              "Verify first, pay later. Stay protected from fraud and scams."
            </p>
          </div>

          <div className="fp-stat-box">
            <h2>97.7%</h2>

            <span className="fp-card-label">Accuracy</span>

            <div className="fp-divider"></div>

            <p className="fp-card-quote">
              "Powered by intelligent fraud detection and risk analysis."
            </p>
          </div>

          <div className="fp-stat-box">
            <h2>Always</h2>

            <span className="fp-card-label">Free</span>

            <div className="fp-divider"></div>

            <p className="fp-card-quote">
              "Security tools should be accessible to everyone."
            </p>
          </div>

        </div>

        {/* ================= TRUST ================= */}
        <div className="fp-trust-row">

          <div className="fp-trust-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0d47a1"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>

            <span>Secure</span>
          </div>

          <div className="fp-trust-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0d47a1"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" />
              <path d="M9 12l2 2 4-4" />
            </svg>

            <span>Verify</span>
          </div>

          <div className="fp-trust-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d32f2f"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>

            <span>Fraud Alert</span>
          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="fp-footer">
        © 2026 UPISAFE
      </footer>

    </div>
  );
};

export default FirstPage;
