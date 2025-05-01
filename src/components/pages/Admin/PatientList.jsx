import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar.jsx";
import "./AdminSidebar.css";
import "./PatientList.css"; // ✅ Add a separate CSS file for styling

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch patients from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        console.log("🔍 Full API Response:", response);
        console.log("📡 Response Data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPatients(response.data);
        } else {
          console.log("❌ No patients found in response!");
        }
      } catch (error) {
        console.error("❌ Error fetching patients:", error);
        console.error("Error details:", error.response ? error.response.data : error.message);
      }
      
    };
    fetchData();
  }, []);

  // ✅ Delete Patient Function
  // const handleDeletePatient = async (patientId) => {
  //   console.log("🗑️ Attempting to delete patient:", patientId); // ✅ Debugging log
  
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/api/patients/${patientId}`);
  
  //     if (response.status === 200) {
  //       alert("✅ Patient removed successfully!");
  //       setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== patientId));
  //     } else {
  //       alert("❌ Patient not found!");
  //     }
  //   } catch (error) {
  //     console.error("❌ Error removing patient:", error);
  //     alert(`❌ Failed to remove patient! \nError Details: ${error.response?.data?.message || error.message}`);
  //   }
  // };

  // ✅ Filtering Patients by Search Term
  const filteredPatients = patients.filter(
    (patient) => patient?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="patient-list-container">
        <h2>Patient List</h2>

        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search by Email ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* ✅ Patient Table */}
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  {/* <td>
                  <button onClick={() => handleDeletePatient(patient._id)}>Delete</button>

                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;