import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      
      <div className="footer-links">
        <span onClick={() => navigate("/home")}>Home</span>
        <span onClick={() => navigate("/about")}>About</span>
        <span onClick={() => navigate("/contact")}>Contact Us</span>
      </div>

      <div className="footer-line"></div>

      <p className="footer-copy">
        © 2026 @UPISAFE | All rights reserved.
      </p>

    </footer>
  );
};

export default Footer;