import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Dashboard Menu</h3>
      <ul>
        <li><Link to="/patientdashboard">🏥Dashboard</Link></li>
        <li><Link to="/book-appointment"> 📅Book Appointment</Link></li>
        <li><Link to="/appointment-history">📜Appointment History</Link></li>
        <li><Link to="/MessagesP">Messages</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

