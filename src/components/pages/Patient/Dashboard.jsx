import { Link } from 'react-router-dom';
import { FaCalendarPlus, FaHistory, FaFacebookMessenger } from 'react-icons/fa';
import Sidebar from "./Sidebar";
import "./Dashboard.css";


import { useEffect, useState } from "react";

const PatientDashboard = () => {
  const [patientName, setPatientName] = useState("Guest");
  const userId = localStorage.getItem("userId"); // ✅ Use userId instead of patientId
  
  if (!userId) {
    console.error("❌ User ID missing! Redirecting to login...");
    window.location.href = "/login"; // ✅ Redirect if ID is missing
  }



  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setPatientName(storedName);
    } else {
      console.warn("⚠️ No patient name found in local storage!");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clears authentication token
    localStorage.removeItem("patientId"); // ✅ Clears patient ID (if applicable)
    localStorage.removeItem("doctorId");  // ✅ Clears doctor ID (if applicable)
    window.location.href = "/login"; // ✅ Redirects user to login page
  };
  

  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="patient-dashboard-container">
        <h2>Welcome, {patientName}!</h2>
        <div className="dashboard-cards">
       
          <Link to="/book-appointment" className="dashboard-card">
            <FaCalendarPlus size={50} />
            <h2>Book Appointment</h2>
          </Link>
          <Link to="/appointment-history" className="dashboard-card">
            <FaHistory size={50} />
            <h2>Appointment History</h2>
          </Link>
          <Link to={`/MessagesP?userId=${localStorage.getItem("userId")}`} className="dashboard-card">
            <FaFacebookMessenger size={50} />
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

export default PatientDashboard;