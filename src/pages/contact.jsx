import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./contact.css";

const contacts = [
  {
    name: "Sagnik Metiya",
    phone: "+91 7001946040",
    email: "metiyasagnik692@gmail.com",
    img: "/Sagnik.jpeg"
  },
  {
    name: "Tirtha Samanta",
    phone: "+91 8436516500",
    email: "samantatirtha904@email.com",
    img: "/Tirtha.jpeg"
  },
  {
    name: "Soham Mayur",
    phone: "+91 9330974731",
    email: "sohammayur55@gmail.com",
    img: "/Soham.jpeg"
  },
  {
    name: "Subasish Maity",
    phone: "+91 9339851683",
    email: "maitysubasish03@gmaill.com",
    img: "/Subhasish.jpeg"
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
                  src={person.img}
                  alt={person.name}
                  className="contact-img"
                />

                <h3>{person.name}</h3>

                <p className="info">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.25 1.02z"
                      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {person.phone}
                </p>

                <p className="info">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2"
                      stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M3 7l9 6 9-6"
                      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {person.email}
                </p>

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
