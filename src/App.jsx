import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import UserDashboard from "./Component/UserDashBoard";
import Spinner from "./Component/Spiner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<LandingPage />} />
        <Route path="/animation" element={<Spinner />} />
      </Routes>
    </Router>
  );
}

export default App;
