import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserMd, FaUsers, FaCalendarAlt, FaPlus, FaEnvelope } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/admindashboard"><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to="/doctorlist"><FaUserMd /> Manage Doctors</Link></li>
        <li><Link to="/patientlist"><FaUsers /> Patient Records</Link></li>
        <li><Link to="/appointmentdetails"><FaCalendarAlt /> Appointments</Link></li>
        <li><Link to="/adddoctors"><FaPlus /> Add Doctor</Link></li>
        <li><Link to="/messages"><FaEnvelope /> Messages</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;