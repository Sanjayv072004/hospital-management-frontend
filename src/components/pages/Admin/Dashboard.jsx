import React from "react";
import AdminSidebar from "./AdminSidebar.jsx";
import { Link } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarAlt, FaPlus, FaEnvelope } from "react-icons/fa";
import "./AdminSidebar.css";
const handleLogout = () => {
  localStorage.clear(); // ✅ Clears ALL stored session data
  console.log("Logging out... Redirecting to login page.");
  window.location.href = "/login"; // ✅ Redirects user properly
};



const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <h2>Welcome, Admin</h2>

        <div className="dashboard-cards">
          <Link to="/doctorlist" className="dashboard-card">
            <FaUserMd size={50} />
            <h2>Doctor List</h2>
          </Link>

          <Link to="/patientlist" className="dashboard-card">
            <FaUsers size={50} />
            <h2>Patient List</h2>
          </Link>

          <Link to="/appointmentdetails" className="dashboard-card">
            <FaCalendarAlt size={50} />
            <h2>Appointment Details</h2>
          </Link>

          <Link to="/adddoctors" className="dashboard-card">
            <FaPlus size={50} />
            <h2>Add Doctor</h2>
          </Link>

          <Link to="/messages" className="dashboard-card">
            <FaEnvelope size={50} />
            <h2>Messages</h2>
          </Link>
          <button className="logout-button" onClick={handleLogout}>
   Logout
</button>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;