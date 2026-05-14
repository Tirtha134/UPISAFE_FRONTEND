import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./History.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_BASE_URL;

const TOAST_CFG = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: false,
  theme: "dark",
};

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const loadHistory = async () => {
    try {
      const res = await axios.get(
        `${API}/api/transactions/all`,
        { withCredentials: true }
      );
      setHistory(res.data);
    } catch {
      toast.error("Please login first ❗", TOAST_CFG);
      navigate("/");
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const clearHistory = async () => {
    try {
      await axios.delete(
        `${API}/api/transactions/clear`,
        { withCredentials: true }
      );
      setHistory([]);
      toast.success("History cleared successfully 🗑", TOAST_CFG);
    } catch {
      toast.error("Failed to clear history ❌", TOAST_CFG);
    }
  };

  const getRiskColor = (score) => {
    if (score >= 70) return "#ef4444";
    if (score >= 40) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div className="history-page">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        theme="dark"
        limit={3}
      />

      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="history-main">

          <div className="history-top-bar">
            <button className="history-back-btn" onClick={() => navigate("/home")}>
              ← Back
            </button>
          </div>

          <h1 className="history-title">Transaction History</h1>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="history-empty">
                <span className="history-empty-icon">📭</span>
                <p>No transactions found</p>
              </div>
            ) : (
              history.map((item, i) => (
                <div key={i} className="history-card">

                  <div className="history-card-header">
                    <span className="history-type">{item.type}</span>
                    <span className={item.Fraud_Result ? "badge fraud" : "badge safe"}>
                      {item.Fraud_Result ? "⚠ Fraud" : "✓ Safe"}
                    </span>
                  </div>

                  <div className="history-details">
                    <p><span className="label">UPI</span><span className="value">{item.upi_id}</span></p>
                    <p><span className="label">Amount</span><span className="value amt">₹{item.amount}</span></p>
                    <p><span className="label">Date</span><span className="value">{item.date}</span></p>
                    <p><span className="label">Time</span><span className="value">{item.time}</span></p>
                  </div>

                  <div className="history-risk-section">
                    <div className="history-risk-box">
                      <div
                        className="history-risk-bar"
                        style={{
                          width: `${item.Risk_Score}%`,
                          background: getRiskColor(item.Risk_Score),
                        }}
                      />
                    </div>
                    <p className="history-risk-text">
                      Risk Score:&nbsp;
                      <strong style={{ color: getRiskColor(item.Risk_Score) }}>
                        {item.Risk_Score}%
                      </strong>
                    </p>
                  </div>

                </div>
              ))
            )}
          </div>

          {history.length > 0 && (
            <div className="history-clear-section">
              <button className="history-clear-btn" onClick={clearHistory}>
                🗑&nbsp; Clear History
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default History;