import React, { useState } from "react";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPhoneAlt, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      {/* Menu Button */}
      <div
        className="menu-container"
        onClick={() => setExtended(!extended)}
      >
        <FaBars className="menu-icon" />
      </div>

      {/* Navigation */}
      <div className="nav">

        {/* Home */}
        <div
          className={`menu-item ${
            location.pathname === "/home" ? "active" : ""
          }`}
          onClick={() => navigate("/home")}
        >
          <FaHome className="icon" />
          {extended && <p>Home</p>}
        </div>

        {/* About */}
        <div
          className={`menu-item ${
            location.pathname === "/about" ? "active" : ""
          }`}
          onClick={() => navigate("/about")}
        >
          <FaInfoCircle className="icon" />
          {extended && <p>About</p>}
        </div>

        {/* Contact */}
        <div
          className={`menu-item ${
            location.pathname === "/contact" ? "active" : ""
          }`}
          onClick={() => navigate("/contact")}
        >
          <FaPhoneAlt className="icon" />
          {extended && <p>Contact</p>}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
