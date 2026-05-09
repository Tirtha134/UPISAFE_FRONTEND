import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Transaction.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_BASE_URL;

const Transaction = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    upi_id: "",
    amount: "",
    date: "",
    time: "",
    type: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.upi_id || !form.amount || !form.date || !form.time || !form.type) {
      toast.warning("Please fill in all fields ❗", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/transactions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setResult(data);
      setShowPopup(true);
    } catch {
      toast.error("❌ Server error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }

    setLoading(false);
  };

  const handleClear = () => {
    setForm({ upi_id: "", amount: "", date: "", time: "", type: "" });
    toast.info("Form cleared.", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <div className="transaction-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="transaction-main">

          <div className="transaction-card">
            <h2 className="card-title">Transaction Prediction</h2>
            <p className="card-subtitle">Check whether your transaction is Safe or Fraud</p>

            <input
              name="upi_id"
              value={form.upi_id}
              onChange={handleChange}
              placeholder="UPI ID"
            />

            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
            />

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
            />

            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="PAYMENT">Payment</option>
              <option value="RECEIVED">Received</option>
            </select>

            <div className="btn-group">
              <button className="check-btn" onClick={handleSubmit}>
                {loading ? "Checking..." : "Check Fraud"}
              </button>

              <button className="clear-btn" onClick={handleClear}>
                Clear
              </button>
            </div>

            <button className="back-btn" onClick={() => navigate("/home")}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* ===== POPUP ===== */}
      {showPopup && result && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box small" onClick={(e) => e.stopPropagation()}>

            <div className={`video-circle ${result.Fraud_Result ? "circle-fraud" : "circle-safe"}`}>
              <video src="/search-money.mp4" autoPlay loop muted />
            </div>

            <h2 className="popup-title">Prediction Result</h2>

            <div className={`result-label ${result.Fraud_Result ? "fraud" : "safe"}`}>
              <span className="result-icon">{result.Fraud_Result ? "⚠️" : "✅"}</span>
              {result.Fraud_Result ? "Fraud Transaction" : "Safe Transaction"}
            </div>

            <div className="popup-divider" />

            <div className="risk-header">
              <span className="risk-label">Risk Score</span>
              <span className={`risk-value ${result.Fraud_Result ? "fraud" : "safe"}`}>
                {result.Risk_Score || 0}%
              </span>
            </div>

            <div className="progress-bar">
              <div className="progress" style={{ width: `${result.Risk_Score || 0}%` }} />
            </div>

            <div className="popup-chips">
              <span className="chip">💳 {form.upi_id}</span>
              <span className="chip">₹ {form.amount}</span>
              <span className="chip">🔁 {form.type}</span>
            </div>

            <button
              className={`ok-btn ${result.Fraud_Result ? "ok-fraud" : "ok-safe"}`}
              onClick={() => setShowPopup(false)}
            >
              Got it
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;