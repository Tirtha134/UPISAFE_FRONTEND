import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Transaction.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API = import.meta.env.VITE_API_BASE_URL;

// ── Convert JS Date object -> dd-mm-yyyy string ──
const toDDMMYYYY = (dateObj) => {
  if (!dateObj) return "";
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

// ── Convert JS Date object -> HH:mm (24hr) string ──
const toHHmm = (dateObj) => {
  if (!dateObj) return "";
  const hh = String(dateObj.getHours()).padStart(2, "0");
  const mm = String(dateObj.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

// ── Combine a "date" Date object + a "time" Date object
//    into a single Date holding both the chosen day AND
//    the chosen hour/minute (seconds/ms zeroed for clean comparison) ──
const combineDateAndTime = (dateObj, timeObj) => {
  if (!dateObj || !timeObj) return null;
  const combined = new Date(dateObj);
  combined.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);
  return combined;
};

// ── "Now", rounded down to the current minute ──
// The date/time pickers only let a user pick down to the minute,
// so "now" must be rounded the same way before comparing, otherwise
// picking the literal current minute would incorrectly fail either
// the "Requested" (future) or "Debited" (past) check because of the
// few stray seconds/ms between render and submit.
const getRoundedNow = () => {
  const now = new Date();
  now.setSeconds(0, 0);
  return now;
};

const Transaction = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    upi_id: "",
    amount: "",
    type: "", // "Requested" | "Debited"
  });

  // ── No default value — user must explicitly pick a date & time ──
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateDateAgainstType = () => {
    const pickedDateTime = combineDateAndTime(selectedDate, selectedTime);

    if (!pickedDateTime) {
      toast.error("⚠️ Please select a valid date and time.", {
        position: "top-right",
        autoClose: 3500,
        theme: "colored",
      });
      return false;
    }

    // "Now" rounded to the same minute-level precision as the pickers
    const now = getRoundedNow();

    // Requested = must be NOW (current minute) or a FUTURE moment
    if (form.type === "Requested" && pickedDateTime.getTime() < now.getTime()) {
      toast.error(
        "⚠️ 'Request' payments must be for a future date/time.",
        {
          position: "top-right",
          autoClose: 3500,
          theme: "colored",
        }
      );
      return false;
    }

    // Debited = must be NOW (current minute) or a PAST moment
    if (form.type === "Debited" && pickedDateTime.getTime() > now.getTime()) {
      toast.error(
        "⚠️ 'Debited' payments must be for a past date/time (already deducted).",
        {
          position: "top-right",
          autoClose: 3500,
          theme: "colored",
        }
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!form.upi_id || !form.amount || !selectedDate || !selectedTime || !form.type) {
      toast.warning("Please fill in all fields ❗", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    // ── UPI ID must contain "@" ──
    if (!form.upi_id.includes("@")) {
      toast.error("⚠️ Please enter a valid UPI ID (must contain '@').", {
        position: "top-right",
        autoClose: 3500,
        theme: "colored",
      });
      return;
    }

    if (!validateDateAgainstType()) return;

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
          date: toDDMMYYYY(selectedDate), // sent as dd-mm-yyyy
          time: toHHmm(selectedTime), // sent as HH:mm (24hr)
          amount: Number(form.amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "❌ Server error. Please try again.", {
          position: "top-right",
          autoClose: 3500,
          theme: "colored",
        });
        setLoading(false);
        return;
      }

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
    setForm({ upi_id: "", amount: "", type: "" });
    // Reset the date/time pickers back to empty (no prefilled value)
    setSelectedDate(null);
    setSelectedTime(null);
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

            {/* UPI ID */}
            <div className="field-group">
              <label className="field-label">UPI ID</label>
              <div className="field-box">
                <span className="field-prefix">💳</span>
                <input
                  className="field-input"
                  name="upi_id"
                  type="text"
                  value={form.upi_id}
                  onChange={handleChange}
                  placeholder="e.g. user@okicici"
                  autoComplete="off"
                  inputMode="email"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="field-group">
              <label className="field-label">Amount (₹)</label>
              <div className="field-box">
                <span className="field-prefix">₹</span>
                <input
                  className="field-input"
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  inputMode="numeric"
                  min="1"
                />
              </div>
            </div>

            {/* Date + Time — side by side */}
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Date</label>
                <div className="field-box">
                  <span className="field-prefix">📅</span>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                    className="field-input"
                    wrapperClassName="date-picker-wrapper"
                    calendarClassName="custom-calendar"
                    // ── Easy month/year navigation ──
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    // ── Render in a portal so it's never clipped ──
                    portalId="datepicker-portal"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Time (24hr)</label>
                <div className="field-box">
                  <span className="field-prefix">🕐</span>
                  <DatePicker
                    selected={selectedTime}
                    onChange={(time) => setSelectedTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeFormat="HH:mm"
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    placeholderText="HH:mm"
                    className="field-input"
                    wrapperClassName="date-picker-wrapper"
                    calendarClassName="custom-calendar"
                    portalId="datepicker-portal"
                  />
                </div>
              </div>
            </div>

            {/* Type */}
            <div className="field-group">
              <label className="field-label">Transaction Type</label>
              <div className="field-box">
                <span className="field-prefix">🔁</span>
                <select
                  className="field-input field-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Requested">Request (Future Payment)</option>
                  <option value="Debited">Debited (Already Deducted)</option>
                </select>
              </div>
            </div>

            <div className="btn-group">
              <button className="check-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <span className="btn-inner">
                    <span className="btn-spinner" />
                    Checking...
                  </span>
                ) : (
                  <span className="btn-inner">🔍 Check Fraud</span>
                )}
              </button>

              <button className="clear-btn" onClick={handleClear}>
                🗑 Clear
              </button>
            </div>

            <button className="back-btn" onClick={() => navigate("/home")}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

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

      {/* Portal root — react-datepicker renders its calendar popup here,
          so it always shows in full and is never cut off by the card's
          overflow: hidden */}
      <div id="datepicker-portal" />
    </div>
  );
};

export default Transaction;
