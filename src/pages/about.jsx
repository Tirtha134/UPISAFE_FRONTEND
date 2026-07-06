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
      <Navbar />

      <div className="about-layout">
        <Sidebar />

        <div className="about-main">

          {/* HEADER */}
          <h1 className="about-title">UPI Fraud Detection System</h1>

          {/* SHORT DESCRIPTION */}
          <p className="about-description">
            Real-time UPI fraud detection using MERN and machine learning.
          </p>

          {/* DROPDOWNS */}
          <div className="dropdown-container">

            <div className="dropdown-card">
              <div className="dropdown-header" onClick={() => toggleSection("mern")}>
                🚀 MERN Stack Architecture
                <span className={`chevron ${openSection === "mern" ? "open" : ""}`}>▼</span>
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
                <span className={`chevron ${openSection === "auth" ? "open" : ""}`}>▼</span>
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
                <span className={`chevron ${openSection === "ml" ? "open" : ""}`}>▼</span>
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
              <div className="dropdown-header" onClick={() => toggleSection("mldetail")}>
                🔍 How ML Detects Safe vs Fraud Transactions
                <span className={`chevron ${openSection === "mldetail" ? "open" : ""}`}>▼</span>
              </div>

              {openSection === "mldetail" && (
                <div className="dropdown-content">
                  <h2>How ML Detects Safe vs Fraud Transactions</h2>
                  <hr />

                  <p>
                    The Machine Learning (ML) model analyzes multiple transaction details before predicting whether a UPI transaction is <strong>Safe</strong> or <strong>Fraud</strong>. It evaluates several risk factors, including:
                  </p>

                  <p>✔ <strong>Wrong or Invalid UPI ID:</strong> If the receiver's UPI ID is invalid, malformed, or appears suspicious, the transaction risk increases.</p>

                  <p>✔ <strong>High Payment Amount:</strong> Transactions involving unusually large amounts are considered higher risk, especially when compared to the user's normal payment behavior.</p>

                  <p>
                    Based on these and other features, the ML model calculates a fraud probability. If the overall risk score exceeds a predefined threshold, the transaction is classified as <strong>Fraud</strong>; otherwise, it is marked as <strong>Safe</strong>.
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
