import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/ContextProvider";

const API = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  /* ===== SHOW LOGOUT TOAST ===== */
  useEffect(() => {
    const msg = sessionStorage.getItem("logoutMsg");

    if (msg) {
      toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      sessionStorage.removeItem("logoutMsg");
    }
  }, []);

  /* ===== LOGIN SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("All fields are required ❌", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/api/auth/login`,
        {
          identifier,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message || "Login successful 🎉", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        login(data);

        setIdentifier("");
        setPassword("");

        setTimeout(() => {
          navigate("/home");
        }, 800);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials ❌",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== TOAST ===== */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* ===== LOGIN PAGE ===== */}
      <div className="login-container">
        <div className="login-box">

          {/* PROFILE IMAGE */}
          <img
            src="/profile.png"
            alt="profile"
            className="profile-img"
          />

          {/* TITLES */}
          <h2 className="title">Welcome</h2>
          <h1 className="login-title">Login</h1>

          <p className="subtitle">
            Access your account to continue
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {/* EMAIL / PHONE */}
            <div className="input-wrapper">
              <span className="input-icon">
                <i className="ti ti-mail"></i>
              </span>

              <input
                type="text"
                placeholder="Phone No or Email"
                className="input-field"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="input-wrapper">
              <span className="input-icon">
                <i className="ti ti-lock"></i>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* SHOW / HIDE PASSWORD */}
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={
                    showPassword
                      ? "ti ti-eye-off"
                      : "ti ti-eye"
                  }
                ></i>
              </button>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="options">
              <Link to="/forgot">
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

          </form>

          <hr />

          {/* BOTTOM ROW — back hyperlink left, signup right */}
          <div className="bottom-row">
            <Link to="/" className="back-link">
              Back?
            </Link>

            <p className="signup">
              Not an Account?{" "}
              <Link to="/signup">Click here</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
