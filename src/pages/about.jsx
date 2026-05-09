import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./about.css";

const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="about-container">

      {/* BACKGROUND ANIMATION */}
      <div className="bg-animation">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Navbar />

      <div className="about-layout">
        <Sidebar />

        <div className="about-main">

          {/* SIMPLE HEADER */}
          <h1 className="about-title">UPI Fraud Detection System</h1>

          {/* SHORT DESCRIPTION */}
          <p className="about-description">
            Real-time UPI fraud detection using MERN and machine learning.
          </p>

          {/* DROPDOWN (UNCHANGED) */}
          <div className="dropdown-container">

            <div className="dropdown-card">
              <div className="dropdown-header" onClick={() => toggleSection("mern")}>
                🚀 MERN Stack Architecture
                <span>{openSection === "mern" ? "▲" : "▼"}</span>
              </div>

              {openSection === "mern" && (
                <div className="dropdown-content">
                  <p>
                    Built using MongoDB, Express.js, React, and Node.js, this system ensures
                    fast performance and scalability. React provides an interactive UI,
                    while Node.js handles backend logic and MongoDB securely stores data.
                  </p>
                </div>
              )}
            </div>

            <div className="dropdown-card">
              <div className="dropdown-header" onClick={() => toggleSection("auth")}>
                🔐 Authentication & Authorization
                <span>{openSection === "auth" ? "▲" : "▼"}</span>
              </div>

              {openSection === "auth" && (
                <div className="dropdown-content">
                  <p>
                    The system uses secure JWT-based authentication to verify users.
                    Authorization ensures only permitted users can access sensitive
                    operations like transaction prediction and history.
                  </p>
                </div>
              )}
            </div>

            <div className="dropdown-card">
              <div className="dropdown-header" onClick={() => toggleSection("ml")}>
                🤖 Machine Learning Model
                <span>{openSection === "ml" ? "▲" : "▼"}</span>
              </div>

              {openSection === "ml" && (
                <div className="dropdown-content">
                  <p>
                    A Random Forest algorithm is implemented to detect fraud patterns.
                    It analyzes multiple features of a transaction and predicts whether
                    it is safe or fraudulent with high accuracy.
                  </p>
                </div>
              )}
            </div>

            <div className="dropdown-card">
              <div className="dropdown-header" onClick={() => toggleSection("ml")}>
                🔍 How ML Detects Safe vs Fraud Transactions
                <span>{openSection === "ml" ? "▲" : "▼"}</span>
              </div>

              {openSection === "ml" && (
                <div className="dropdown-content">
                  <p>
                    The model first learns your normal transaction behavior, such as usual
                    payment amount, frequency, time, and location.
                  </p>
                  <p>
                    When a new transaction occurs, it is compared with your past patterns.
                    Regular low-value payments are marked as safe because they match your
                    usual activity.
                  </p>
                  <p>
                    If a sudden high-value transaction or unusual activity appears, the
                    system detects it as abnormal and flags it as potential fraud.
                  </p>
                  <p>
                    Based on this comparison, the ML model instantly classifies the
                    transaction as safe or fraudulent and can trigger alerts or blocks.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* QUOTES */}
          <div className="quotes-container">

            <div className="quote-card">
              <p>
                "UPI fraud is increasing rapidly with digital growth. Intelligent systems are essential."
              </p>
            </div>

            <div className="quote-card">
              <p>
                "Machine learning predicts fraud before it happens and prevents financial loss."
              </p>
            </div>

            <div className="quote-card">
              <p>
                "Strong fraud detection builds trust in digital payments."
              </p>
            </div>


          </div>

          {/* VIDEO TEXT */}
          <div className="about-video-text">
            <h2>⚠️ Always verify before making any secure transaction</h2>
          </div>

          {/* VIDEO (YOUR EXACT SIZE) */}
          {/* VIDEO */}
          <div className="about-video">
            <video
              src="/investor.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;