import React from "react";

const PatientCard = ({ name, email, password }) => {
  return (
    <div className="patient-card">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Password:</strong> {password}</p>
    </div>
  );
};

export default PatientCard;