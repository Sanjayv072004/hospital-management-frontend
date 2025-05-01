import React, { useState, useEffect } from "react";
import axios from "axios";
 // ✅ Fixed typo
import AdminSidebar from "./AdminSidebar.jsx";
import "./AdminSidebar.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch Doctors from MongoDB
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("❌ Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ Delete Doctor Function
  const handleDeleteDoctor = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
      alert("✅ Doctor removed successfully!");

      setDoctors((prevDoctors) => prevDoctors.filter(doc => doc._id !== doctorId)); // ✅ UI updates after deletion
    } catch (error) {
      console.error("❌ Error removing doctor:", error);
      alert("❌ Failed to remove doctor!");
    }
  };

  // ✅ Filtering Doctors by Search Term
  const filteredDoctors = doctors.filter(
    (doctor) => doctor?.name && doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="doctor-list-container">
        <h2>Doctor List</h2>

        <input
          type="text"
          placeholder="Search by Doctor Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="doctor-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <p><strong>Doctor Name:</strong> {doctor.name}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Consultancy Fee:</strong> ₹{doctor.fee}</p>
                <button className="delete-doctor-button" onClick={() => handleDeleteDoctor(doctor._id)}>Remove Doctor</button>
              </div>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;