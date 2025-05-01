import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Patient/Sidebar.jsx";
import "./Dashboard.css";

const BookAppointment = () => {
  const [patientName, setPatientName] = useState("Guest");
  const [patientId, setPatientId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setPatientName(localStorage.getItem("patientName"));
    setPatientId(localStorage.getItem("userId"));
  }, []);
  useEffect(() => {
    const storedName = localStorage.getItem("userName");

    if (storedName) {
      setPatientName(storedName);
    } else {
      console.warn("⚠️ No patient name found in local storage!");
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        console.log("📡 Fetching doctors:", response.data);
        setDoctors(response.data);
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!patientId || !patientName || !selectedDoctor || !date || !time) {
      alert("❌ All fields are required!");
      return;
    }
  
    console.log("🔍 Selected Doctor Before Booking:", selectedDoctor); // ✅ Debugging Log
  
    const newAppointment = {
      patientId,
      patientName,
      doctor: selectedDoctor?._id ?? null, // ✅ Store doctor ID properly
      date,
      time,
      status: "Active",
    };
  
    console.log("📡 Booking Appointment:", newAppointment); // ✅ Debugging Log
  
    try {
      await axios.post("http://localhost:5000/api/appointments", newAppointment, {
        headers: { "Content-Type": "application/json" },
      });
  
      alert("✅ Appointment booked successfully!");
    } catch (error) {
      console.error("❌ Error booking appointment:", error.response?.data || error.message);
      alert("❌ Failed to book appointment.");
    }
  };
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="appointment-container">
        <div className="appointment-form">
          <h2>Book an Appointment</h2>
          <p><strong>Logged in as:</strong> {patientName}</p>

          <form onSubmit={handleSubmit}>
            <label>Choose Doctor:</label>
            <select onChange={(e) => {
  const selected = doctors.find(doc => doc._id === e.target.value);
  console.log("🔍 Selected Doctor:", selected); // ✅ Debugging Log
  setSelectedDoctor(selected || null); // ✅ Prevent undefined issue
}}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
              ))}
            </select>

            <label>Consultancy Fee:</label>
            <input type="text" value={selectedDoctor ? `₹${selectedDoctor.fee}` : ""} readOnly />

            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

            <label>Time:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

            <button type="submit" className="book-appointment-button">Book Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;