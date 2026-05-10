import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/ContextProvider";

/* ── shared toast config ── */
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

const Navbar = ({ openProfile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* ── logout confirm state ── */
  const [showLogoutCard, setShowLogoutCard] = useState(false);

  /* ── logout ── */
  const handleLogout = () => {
    logout();
    setShowLogoutCard(false);
    toast.success("Logged out successfully 👋", TOAST_CFG);
    setTimeout(() => navigate("/"), 1500);
  };

  /* ── initials ── */
  const getInitials = () => {
    if (!user?.name) return "?";
    const parts = user.name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (
      parts[0][0].toUpperCase() +
      parts[parts.length - 1][0].toUpperCase()
    );
  };

  return (
    <>
      <nav className="navbar">

        {/* LEFT */}
        <div className="nav-left">
          <h1 className="logo">UPISAFE</h1>
          <div className="welcome-text">
            Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </div>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          <div className="avatar" onClick={openProfile}>
            {getInitials()}
          </div>

          <button
            className="logout-btn"
            onClick={() => setShowLogoutCard(true)}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* ── LOGOUT CONFIRMATION OVERLAY ── */}
      {showLogoutCard && (
        <div
          className="logout-overlay"
          onClick={() => setShowLogoutCard(false)}
        >
          <div
            className="logout-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="logout-card__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>

            {/* Text */}
            <h2 className="logout-card__title">Logging out?</h2>
            <p className="logout-card__subtitle">
              Are you sure you want to end your session?
            </p>

            {/* Actions */}
            <div className="logout-card__actions">
              <button
                className="logout-card__btn logout-card__btn--cancel"
                onClick={() => setShowLogoutCard(false)}
              >
                No, Stay
              </button>
              <button
                className="logout-card__btn logout-card__btn--confirm"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
