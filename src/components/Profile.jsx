import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = () => {
    if (!user?.name) return "?";
    const parts = user.name.split(" ");
    if (parts.length === 1) return parts[0][0];
    return parts[0][0] + parts[parts.length - 1][0];
  };

  return (
    <div className="profile-page-container">
      {/* Navbar */}
      <Navbar />

      <div className="profile-layout">
        <Sidebar />
        <div className="profile-main">
          <div className="profile-card-medium">

            {/* Header */}
            <div className="profile-header">
              <div className="avatar-ring">
                <div className="avatar-medium">{getInitials()}</div>
              </div>
              <h2>{user.name}</h2>
              <p className="sub">User Profile</p>
            </div>

            <div className="profile-divider"></div>

            {/* Info */}
            <div className="profile-info">
              <div className="info-box">
                <span>📱 Phone Number</span>
                <input
                  type="text"
                  value={user.phone}
                  readOnly
                  className="input-style"
                />
              </div>

              <div className="info-box">
                <span>✉️ Email Address</span>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input-style"
                />
              </div>
            </div>

            {/* Back button */}
            <button className="back-btn" onClick={() => navigate("/home")}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
