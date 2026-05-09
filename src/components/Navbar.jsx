import React from "react";
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
  pauseOnHover: false,      /* don't freeze timer on hover */
  pauseOnFocusLoss: false,  /* don't freeze on tab switch  */
  draggable: false,
  theme: "dark",
};

const Navbar = ({ openProfile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* ── logout ── */
  const handleLogout = () => {
    logout();
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

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;