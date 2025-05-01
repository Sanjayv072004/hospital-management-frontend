import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../../../services/patientService.js";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      age: Number(formData.age),
      gender: formData.gender,
    };
  
    console.log("📡 Sending Registration Data:", JSON.stringify(formattedData, null, 2));
  
    try {
      // ✅ Use `addPatient` to send data to backend
      const response = await addPatient(formattedData);
  
      console.log("🔍 Full Response:", response);
      console.log("Response Status:", response.status);
      console.log("Response Message:", response.data?.message);
  
      if (response?.status === 201) {
        alert(response.message || "Registered Successfully!");
        navigate("/login"); // ✅ Ensure `useNavigate` is properly imported!
      } else {
        alert(`❌ Registration failed: ${response?.data?.message || "Unknown error occurred."}`);
      }
    } catch (err) {
      console.error("❌ Registration Error:", err);
      console.error("🔍 Error Details:", err.response?.data || err.message || err);
  
      const errorMessage = err.response?.data?.message
                          || err.message
                          || "Server not responding.";
  
      alert(`❌ Registration failed: ${errorMessage}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Patient Register</h2>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
