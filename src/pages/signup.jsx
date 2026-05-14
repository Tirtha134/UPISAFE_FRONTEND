import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, password } = form;

    if (!name || !phone || !email || !password) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/auth/register`,
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          password
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Account created 🎉");

        setForm({
          name: "",
          phone: "",
          email: "",
          password: ""
        });

        setTimeout(() => navigate("/login"), 800);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">

      {/* ✅ ToastContainer — place once, near root of the component */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="signup-box">

        <h2 className="title">Register</h2>
        <p className="subtitle">Create your account to continue</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input-field"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="input-field"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input-field"
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD WITH EYE TOGGLE — same pattern as ForgotPassword */}
          <div className="input-wrapper">
            <span className="input-icon">
              <i className="ti ti-lock" aria-hidden="true"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-field"
              value={form.password}
              onChange={handleChange}
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

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="back-login">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
