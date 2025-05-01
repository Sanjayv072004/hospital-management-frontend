import { Routes, Route, useLocation,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./components/pages/Auth/Login.jsx";
import Register from "./components/pages/Patient/Register.jsx";
import PatientDashboard from "./components/pages/Patient/Dashboard.jsx";
import BookAppointment from "./components/pages/Patient/BookAppointment.jsx";
import AppointmentHistory from "./components/pages/Patient/AppointmentHistory.jsx";
import Messages1 from "./components/pages/Patient/Messages.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import DoctorDashboard from "./components/pages/Docter/Dashboard.jsx";
import ViewAppointments from "./components/pages/Docter/ViewAppointments.jsx";
import AdminDashboard from "./components/pages/Admin/Dashboard.jsx";
import DoctorList from "./components/pages/Admin/DoctorList.jsx";
import PatientList from "./components/pages/Admin/PatientList.jsx";
import AppointmentDetails from "./components/pages/Admin/AppointmentDetails.jsx";
import AddDocter from "./components/pages/Admin/AddDocter.jsx"; 
import Messages from "./components/pages/Admin/Messages.jsx";
import Contact from "./components/pages/Contact/Contact.jsx";
import AboutUs from "./components/pages/AboutUs/AboutUs.jsx";
import "./components/Navbar.css";

function App() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const role = localStorage.getItem("userRole");
  
      console.log("🔍 Redirecting based on role:", role); // ✅ Debugging log
  
      if (role === "doctor") {
        navigate("/doctordashboard");
      } else if (role === "patient") {
        navigate("/patientdashboard");
      } else if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }
    }, []);
  
  
  
  const location = useLocation(); // ✅ Fix missing `useLocation()`

  return (
    <div>
      <nav className="main-navbar">
        <h1 className="logo">City General Hospitals</h1>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>ABOUT US</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>CONTACT</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patientdashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} /> {/* ✅ Kept only `PrivateRoute` version */}
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/view-appointments" element={<ViewAppointments />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/doctorlist" element={<DoctorList />} />
        <Route path="/patientlist" element={<PatientList />} />
        <Route path="/appointmentdetails" element={<AppointmentDetails />} />
        <Route path="/adddoctors" element={<AddDocter />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointment-history" element={<AppointmentHistory />} />
        <Route path="/MessagesP" element={<Messages1/>}/>
      </Routes>
    </div>
  );
}

export default App;