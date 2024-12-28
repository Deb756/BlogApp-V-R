import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


export default function Signup() {
  const regApiKey = import.meta.env.VITE_REG_API_KEY;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(regApiKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        navigate("/login");
        // console.log(result);
      } else {
        console.error("Error:", result);
        alert(result.info || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);

      // Toast container
      const toastContainer = document.getElementById('toast-container');

      // Create toast HTML
      const toastHTML = `
        <div class="toast show bg-danger text-light" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
          <div class="toast-header">

            <svg class="rounded me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path fill="black" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144L0 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144l-16 0 0 96 16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48l0-224z"/></svg>

            <strong class="me-auto text-danger">Server Connection Failed</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Unable to register the user
          </div>
        </div>
      `;

      // Append toast to container
      toastContainer.innerHTML = toastHTML;

      // Initialize Bootstrap toast
      const toastElement = toastContainer.querySelector('.toast');
      const bootstrapToast = new bootstrap.Toast(toastElement);
      bootstrapToast.show();
    }

  };

  return (
    <>
      <Navbar />
      <div id="toast-container" className="position-fixed top-20 end-0 p-3" style={{ zIndex: 1080 }}></div>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter your mobile number"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </>
  );
}
