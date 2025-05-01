import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarPlus, FaListAlt } from "react-icons/fa";
import Sidebar2 from "./Sidebar2";
import "./ViewAppointments.css";

const DoctorDashboard = () => {
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");

    if (storedName) {
      setDoctorName(storedName);
    } else {
      console.warn("⚠️ No doctor name found in local storage!");
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear(); // ✅ Clears ALL stored session data
    console.log("Logging out... Redirecting to login page.");
    window.location.href = "/login"; // ✅ Redirects user properly
  };
  
  

  return (
    <div className="dashboard-container">
      <Sidebar2 />
      <div className="main-content">
        <h2>Welcome, {doctorName}</h2>

        <div className="dashboard-cards">

          {/* View Appointments Card */}
          <Link to="/view-appointments" className="dashboard-card">
            <FaListAlt size={50} />
            <h2>View Appointments</h2>
          </Link>
          <button className="logout-button" onClick={handleLogout}>
    Logout
</button>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;