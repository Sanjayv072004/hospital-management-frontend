import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import "./Dashboard.css";

const AppointmentHistory = () => {
  const patientId = localStorage.getItem("userId");  
  const [appointments, setAppointments] = useState([]);
  const [patientName1, setPatientName] = useState("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setPatientName(storedName);
    } else {
      console.warn("⚠️ No patient name found in local storage!");
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patientId) {
        console.error("❌ Patient ID missing!");
        return;
      }
    
      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/${patientId}`);
        console.log("📡 Full API Response:", res.data);
console.log("📡 Appointments Data:", res.data.appointments);
console.log("📡 First Appointment Object:", res.data.appointments?.[0]);  // ✅ Check first object// ✅ Log full API response
    
        if (!res.data || !Array.isArray(res.data.appointments)) {
          console.error("❌ API returned an unexpected format:", res.data);
          return;
        }
    
        const clearedAppointments = JSON.parse(localStorage.getItem("clearedAppointments")) || [];
    
        const formattedAppointments = res.data.appointments.map((appt) => ({
          ...appt,
          doctor: appt.doctor || { name: "Unknown", fee: "N/A" }, // ✅ Ensure doctor details exist
        }));
    
        const filteredAppointments = formattedAppointments
          .filter(appt => !clearedAppointments.includes(appt._id))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
    
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("❌ Error fetching appointments:", error.response?.data || error.message);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/cancel`);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "Appointment Cancelled" } : appt
        )
      );
    } catch (error) {
      console.error("❌ Error cancelling appointment:", error);
    }
  };

  const handleClearHistory = () => {
    const clearedAppointments = appointments.map(appt => appt._id);
    localStorage.setItem("clearedAppointments", JSON.stringify(clearedAppointments));
    setAppointments([]);
    alert("Appointment history cleared! Only new bookings will appear.");
  };

  return (
    <div className="appointment-history-container">
      <Sidebar />

      <div className="appointment-list">
        <h2>Appointment History</h2>
        <button className="clear-history-button" onClick={handleClearHistory}>Clear History</button>
        <p><strong>Logged in as:</strong> {patientName1}</p>

        {appointments.length > 0 ? (
          <>
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <p><strong>Patient Name:</strong> {appointment.patientName}</p>  
                <p><strong>Doctor:</strong> {appointment.doctor?.name ?? "Unknown"}</p> 
                <p><strong>Consultancy Fee:</strong> ₹{appointment.doctor?.fee ?? "N/A"}</p>  
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p style={{ color: appointment.status === "Appointment Cancelled" ? "red" : "black" }}>
                  <strong>Status:</strong> {appointment.status || "Active"}
                </p>
                {appointment.status !== "Appointment Cancelled" && (
                  <button onClick={() => handleCancelAppointment(appointment._id)}>Cancel Appointment</button>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;