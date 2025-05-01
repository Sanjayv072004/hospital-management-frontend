import axios from "axios";

const API_URL = "http://localhost:5000/api/patients"; // ✅ Correct route

// ✅ Fetch all patients
export const getPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(" Error fetching patients:", error);
    return []; // ✅ Prevents UI crashes
  }
};

// ✅ Fetch a specific patient by ID
export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(" Error fetching patient by ID:", error);
    return null;
  }
};

// ✅ Register a new patient
export const addPatient = async (patientData) => {
  try {
    console.log("📡 Sending Registration Data:", patientData);
    const response = await axios.post(`${API_URL}/register`, patientData, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.error(" Error registering patient:", error.response?.data || error);
    throw error; // ✅ Allows frontend to handle errors properly
  }
};

// ✅ Update patient details
export const updatePatient = async (id, patientData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    return null;
  }
};

// ✅ Delete a patient
export const deletePatient = async (patientId) => {
  try {
    console.log(`Attempting to delete patient: ${patientId}`); // ✅ Debugging log
    const response = await axios.delete(`${API_URL}/${patientId}`);

    if (response?.status === 200) {
      console.log("Patient deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete patient:", response.data?.message || "Unknown error.");
      return null;
    }
  } catch (error) {
    console.error("Error deleting patient:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Server error occurred."); // ✅ Ensures proper frontend error handling
  }
};
