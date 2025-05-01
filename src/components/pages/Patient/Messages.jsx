import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Messages = () => {
  const userId = localStorage.getItem("userId"); // ✅ Retrieve userId instead of patientId
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error("❌ User ID missing in Messages component!");
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${userId}`);
        console.log("📡 Retrieved Messages:", res.data);
        setMessages(res.data.messages ?? []);
      } catch (error) {
        console.error("❌ Error fetching messages:", error.response?.data || error.message);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <Sidebar />
    <div className="messages-container">
      <h2>📩 Appointment Messages</h2>
      <div className="message-box">
        {messages.length === 0 ? (
          <p>No new messages,you will recieve a message shortly after the confirmation from the doctor.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`message ${msg.patientId ? "patient-message" : "doctor-message"}`}
            >
              <strong>{msg.doctorId.name}</strong>: {msg.message}
              <div className="timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Messages;