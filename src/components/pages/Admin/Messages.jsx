import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./AdminSidebar.css";// ✅ Ensure styling is imported

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact"); // ✅ Fetch from new dedicated route
        console.log("📡 Fetching contact messages:", response.data);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="contact-messages-container">
      <div className="dashboard-container">
      <AdminSidebar />
      <h2>Contact Messages from Patients</h2> {/* ✅ Main Heading */}
      
      {/* ✅ Messages Now Appear Directly Below */}
      {messages.length === 0 ? (
        <p>No new messages.</p>
      ) : (
        <ul className="contact-message-list">
          {messages.map((msg) => (
            <li key={msg._id} className="contact-message-card">
              <p className="feedback-header">📧 {msg.patientName} ({msg.patientEmail})</p>
              <p><strong>Phone:</strong> {msg.phone || "Not provided"}</p>
              <p><strong>Subject:</strong> {msg.subject}</p>
              <p className="feedback-body">{msg.message}</p>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default ContactMessages;