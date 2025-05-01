import React from "react";

const DoctorCard = ({ name, email, fee }) => {
  return (
    <div className="doctor-card">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Consultancy Fee:</strong> ₹{fee}</p>
    </div>
  );
};

export default DoctorCard;