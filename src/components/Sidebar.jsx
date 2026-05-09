import React, { useState } from "react";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>

      {/* ===== MENU BUTTON ===== */}
      <div
        className="menu-container"
        onClick={() => setExtended(!extended)}
      >
        <img src="/menu_icon.png" alt="menu" className="menu-icon" />
      </div>

      {/* ===== NAV ITEMS ===== */}
      <div className="nav">

        {/* HOME */}
        <div
          className={`menu-item ${
            location.pathname === "/home" ? "active" : ""
          }`}
          onClick={() => navigate("/home")}
        >
          <span className="icon">🏠</span>
          {extended && <p>Home</p>}
        </div>

        {/* ABOUT */}
        <div
          className={`menu-item ${
            location.pathname === "/about" ? "active" : ""
          }`}
          onClick={() => navigate("/about")}
        >
          <span className="icon">ℹ️</span>
          {extended && <p>About</p>}
        </div>

        {/* CONTACT ✅ NEW */}
        <div
          className={`menu-item ${
            location.pathname === "/contact" ? "active" : ""
          }`}
          onClick={() => navigate("/contact")}
        >
          <span className="icon">📞</span>
          {extended && <p>Contact</p>}
        </div>

      </div>

    </div>
  );
};

export default Sidebar;