import React from "react";

const AppointmentCard = ({ patientName, patientEmail, doctor, date, time,status }) => {
    return (
        <div className="appointment-card">
          <p><strong>Patient Name:</strong> {patientName}</p>
          <p><strong>Doctor:</strong> {doctor}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p style={{ color: status === "Appointment Cancelled" ? "red" : "black" }}>
            <strong>Status:</strong> {status || "Active"}
          </p>
        </div>
      );
    };
    

export default AppointmentCard;