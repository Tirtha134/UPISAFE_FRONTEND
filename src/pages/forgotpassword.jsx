import React, { useState } from "react";
import "./forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_BASE_URL;

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !newPassword) {
      toast.error("All fields are required ❌", {
        position: "top-right", autoClose: 3000, theme: "colored"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters ❌", {
        position: "top-right", autoClose: 3000, theme: "colored"
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/api/auth/forgot-password`,
        { identifier, newPassword },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message || "Password reset successful 🎉", {
          position: "top-right", autoClose: 3000, theme: "colored"
        });

        setIdentifier("");
        setNewPassword("");

        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌", {
        position: "top-right", autoClose: 3000, theme: "colored"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="forgot-container">
        <div className="forgot-box">

          <img src="/reset-password.png" alt="reset" className="reset-img" />
          <h2 className="title">Reset Password</h2>
          <p className="subtitle">Reset your account password</p>

          <form onSubmit={handleSubmit}>

            {/* EMAIL / PHONE INPUT */}
            <div className="input-wrapper">
              <span className="input-icon">
                <i className="ti ti-mail" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="input-field"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            {/* NEW PASSWORD INPUT */}
            <div className="input-wrapper">
              <span className="input-icon">
                <i className="ti ti-lock" aria-hidden="true"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="input-field"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`}
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <button className="reset-btn" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>

          <div className="back-login">
            Remember password? <Link to="/">Login</Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
