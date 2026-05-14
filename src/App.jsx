import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";

import FirstPage from "./pages/Firstpage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgotpassword";
import Home from "./pages/home";
import ProfilePage from "./components/Profile";
import Transaction from "./pages/Transaction";
import History from "./pages/History";
import About from "./pages/about";
import Contact from "./pages/contact";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>

          {/* LANDING */}
          <Route path="/"        element={<FirstPage />} />

          {/* AUTH */}
          <Route path="/login"   element={<Login />} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/forgot"  element={<ForgotPassword />} />

          {/* DASHBOARD */}
          <Route path="/home"        element={<Home />} />
          <Route path="/profile"     element={<ProfilePage />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/history"     element={<History />} />
          <Route path="/about"       element={<About />} />
          <Route path="/contact"     element={<Contact />} />

        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;
