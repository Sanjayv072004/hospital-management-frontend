import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./AdminSidebar.css";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fee, setFee] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword || !fee) {
      alert("❌ All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const newDoctor = { name, email, password,confirmPassword, fee };

    try {
      const response = await axios.post("http://localhost:5000/api/doctors", newDoctor, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("✅ Doctor added successfully:", response.data);
      alert("✅ Doctor added successfully!");

      // Reset form fields after adding doctor
      setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setFee("");
    } catch (error) {
      console.error("❌ Error adding doctor:", error);
      alert("❌ Failed to add doctor.");
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="add-doctor-container">
        <h2>Add New Doctor</h2>
        
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email ID:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <label>Consultancy Fee:</label>
        <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} />

        <button onClick={handleSubmit}>Add Doctor</button>
      </div>
    </div>
  );
};

export default AddDoctor;