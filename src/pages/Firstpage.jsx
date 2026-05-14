import React from "react";
import "./firstpage.css";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <div className="fp-root">

      <main className="fp-hero">
        <div className="fp-content">

          <h1 className="fp-heading">Welcome to upisafe</h1>
          <p className="fp-sub">Instant UPI Fraud Alert &amp; Safety Verification</p>

          <div className="fp-btns">
            <Link to="/login"  className="fp-btn fp-btn-login">Login</Link>
            <Link to="/signup" className="fp-btn fp-btn-register">Register</Link>
          </div>

          {/* Plain SVG icons — absolutely no wrapper, circle, border or label */}
          <div className="fp-trust-row">

            <svg viewBox="0 0 24 24" fill="none" stroke="#1a3a60"
              strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
              width="20" height="20">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>

            <svg viewBox="0 0 24 24" fill="none" stroke="#1a3a60"
              strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
              width="20" height="20">
              <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>

            <svg viewBox="0 0 24 24" fill="none" stroke="#c62828"
              strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
              width="20" height="20">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>

          </div>

        </div>
      </main>

      <footer className="fp-footer">© 2026 upisafe</footer>

    </div>
  );
};

export default FirstPage;