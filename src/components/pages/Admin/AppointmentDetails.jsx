import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard.jsx";
import AdminSidebar from "./AdminSidebar.jsx";
import "./AdminSidebar.css";

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        console.log("📡 Fetching appointment details:", response.data);

        const clearedAppointments = JSON.parse(localStorage.getItem("clearedAppointments")) || [];

        const filteredAppointments = response.data
          .filter((appt) => !clearedAppointments.includes(appt._id))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("❌ Error fetching appointment details:", error);
      }
    };

    fetchAppointments();
  }, []);

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
    const clearedAppointments = appointments.map((appt) => appt._id);
    localStorage.setItem("clearedAppointments", JSON.stringify(clearedAppointments));
    setAppointments([]);
    alert("Appointment history cleared! Only new bookings will appear.");
  };

  // ✅ Filters appointments dynamically based on `searchQuery`
  const filteredAppointments = appointments.filter((appt) =>
    appt.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="appointment-details-container">
        <h2>📅 Appointment Details</h2>

        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder=" Search by Patient Name"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredAppointments.length > 0 ? (
          <>
            <button className="clear-history-button" onClick={handleClearHistory}>
               Clear History
            </button>
            <div className="appointment-list">
              {filteredAppointments.map((appointment) => (
                <div key={appointment._id} className="appointment-card">
                  <p>
                    <strong>Patient Name:</strong> {appointment.patientName}
                  </p>
                  <p>
                    <strong>Patient Email:</strong> {appointment.patientEmail || "Not provided"}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {appointment.doctor?.name || "Unknown Doctor"}
                  </p>
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p
                    style={{
                      color: appointment.status === "Appointment Cancelled" ? "red" : "black",
                    }}
                  >
                    <strong>Status:</strong> {appointment.status || "Active"}
                  </p>
                  {appointment.status !== "Appointment Cancelled" && (
                    <button onClick={() => handleCancelAppointment(appointment._id)}>
                       Cancel Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;