import React from "react";
import { Link } from "react-router-dom";

const Sidebar2 = () => {
  return (
    <div className="sidebar">
      <h3>Doctor's Menu</h3>
      <ul>
        <li><Link to="/doctordashboard">🏥 Dashboard</Link></li>
        <li><Link to="/view-appointments">📅 View Appointments</Link></li>
        
      </ul>
    </div>
  );
};

export default Sidebar2;