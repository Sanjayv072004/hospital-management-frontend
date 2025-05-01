import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import CSS

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "patient" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 && res.data?.user) {
        console.log("✅ Login Successful:", res.data.user);
        console.log("🚀 Navigating to Dashboard...");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role || "patient"); // ✅ Store user role
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userName", res.data.user.name);
        if (res.data.user.role === "doctor") {
          localStorage.setItem("doctorId", res.data.user._id); // ✅ Fix: Ensure doctorId is stored correctly!
        }
        console.log("✅ Stored doctorId:", localStorage.getItem("doctorId"));

         // ✅ Store user's name
        localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Ensure proper storage

        console.log("🔄 Redirecting to", res.data.user.role || "patient");
      
        // ✅ Improved role-based redirection logic
        switch (res.data.user.role) {
          case "doctor":
            navigate("/doctordashboard");
            break;
          case "patient":
            navigate("/patientdashboard");
            break;
          case "admin":
            navigate("/admindashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        console.error("❌ Error: User data missing in response");
        alert("❌ Login failed, please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response ? err.response.data : err);
      alert("❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Hospital Login</h2>

        <label htmlFor="role">Login as</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <label>Email</label>
        <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />

        <button type="submit">Login</button>

        <p className="register-link">
          Not registered? <Link to="/register">Register as a patient</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;