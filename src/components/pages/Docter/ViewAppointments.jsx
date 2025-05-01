import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "./Sidebar2";
import "./ViewAppointments.css";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) {
        console.error("❌ Doctor ID missing!");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
        console.log("📡 Full API Response:", res.data);

        setAppointments(res.data.appointments ?? []);
      } catch (error) {
        console.error("❌ Error fetching doctor appointments:", error.response?.data || error.message);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleAccept = async (appointmentId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/appointments/accept/${appointmentId}`);
      alert(res.data.message);

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "Confirmed" } : appt
        )
      );
    } catch (error) {
      console.error("❌ Error accepting appointment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar2 />

      <div className="appointments-container">
        <h2>Appointments for Doctor</h2>
        {appointments.length > 0 ? (
          <div className="appointments-list">
            {appointments.map((appt) => (
              <div key={appt._id} className="appointment-card">
                <p><strong>Patient:</strong> {appt.patientName}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Status:</strong> {appt.status}</p>
                {appt.status === "Active" && (
                  <button onClick={() => handleAccept(appt._id)}>✅ Accept Appointment</button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;