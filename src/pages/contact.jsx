import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./contact.css";

const contacts = [
  {
    name: "Sagnik Metiya ",
    phone: "+91 7001946040",
    email: "metiyasagnik692@gmail.com"
  },
  {
    name: "Tirtha Samanta",
    phone: "+91 8436516500",
    email: "samantatirtha904@email.com"
  },
  {
    name: "Soham Mayur ",
    phone: "+91  9330974731 ",
    email: "sohammayur55@gmail.com"
  },
  {
    name: "Subasish Maity",
    phone: "+91 9339851683",
    email: "maitysubasish03@gmaill.com"
  }
];

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="contact-main">

          {/* TITLE */}
          <h1 className="contact-title">Contact Directory</h1>
          <p className="contact-subtitle">Developer Team</p>

          {/* CARDS */}
          <div className="contact-grid">
            {contacts.map((person, index) => (
              <div className="contact-card" key={index}>

                <img
                  src="/profile.png"
                  alt="profile"
                  className="contact-img"
                />

                <h3>{person.name}</h3>

                <p className="info">📞 {person.phone}</p>
                <p className="info">✉️ {person.email}</p>

              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;