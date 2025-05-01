import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHospital, FaAmbulance, FaUserMd } from 'react-icons/fa';
import axios from 'axios';
import './Contact.css'; // We'll create this CSS file next

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      console.log("📡 Contact message sent:", response.data);
      alert("✅ Message sent successfully! Admin will review it soon.");
  
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Our Hospital</h1>
        <p>We're available 24/7 for emergencies. For other inquiries, please use the information below.</p>
      </header>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Location</h3>
            <p>123 Medical Center Drive</p>
            <p>Springfield, ST 12345</p>
          </div>

          <div className="contact-card">
            <FaPhoneAlt className="contact-icon" />
            <h3>Phone Numbers</h3>
            <p><strong>Main:</strong> (555) 123-4567</p>
            <p><strong>Emergency:</strong> (555) 987-6543</p>
            <p><strong>Appointments:</strong> (555) 123-7890</p>
          </div>

          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <h3>Email</h3>
            <p><strong>General:</strong> info@hospital.com</p>
            <p><strong>Patients:</strong> patients@hospital.com</p>
            <p><strong>Billing:</strong> billing@hospital.com</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="appointment">Appointment</option>
                <option value="emergency">Emergency</option>
                <option value="billing">Billing</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        <div className="department-hours">
          <h2><FaClock /> Department Hours</h2>
          <div className="hours-grid">
            <div className="hour-card">
              <FaHospital />
              <h3>Emergency</h3>
              <p>24 hours / 7 days</p>
            </div>
            <div className="hour-card">
              <FaUserMd />
              <h3>Outpatient</h3>
              <p>Mon-Fri: 8am-8pm</p>
              <p>Sat: 9am-5pm</p>
            </div>
            <div className="hour-card">
              <FaAmbulance />
              <h3>Ambulance</h3>
              <p>24 hours / 7 days</p>
            </div>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="Hospital Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.98784468459382!3d40.74844097932793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTkuNyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;