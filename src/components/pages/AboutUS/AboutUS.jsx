import React from 'react';
import { FaHospital, FaUserMd, FaHeartbeat, FaAward, FaCalendarAlt } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About City General Hospital</h1>
        <p>Providing exceptional healthcare services since 1985</p>
      </section>

      <section className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>To deliver compassionate, high-quality healthcare services to our community through innovation, excellence, and patient-centered care.</p>
        </div>
        <div className="mission-image">
          <FaHospital className="hospital-icon" />
        </div>
      </section>

      <section className="about-history">
        <h2>Our History</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">1985</div>
            <div className="timeline-content">
              <h3>Hospital Founded</h3>
              <p>Established with 50 beds and a vision to serve the community</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2002</div>
            <div className="timeline-content">
              <h3>Expansion Project</h3>
              <p>Added new wing with specialized departments</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2020</div>
            <div className="timeline-content">
              <h3>Digital Transformation</h3>
              <p>Implemented full hospital management system</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <h2>By The Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <FaUserMd className="stat-icon" />
            <h3>250+</h3>
            <p>Specialized Doctors</p>
          </div>
          <div className="stat-card">
            <FaHeartbeat className="stat-icon" />
            <h3>500+</h3>
            <p>Beds</p>
          </div>
          <div className="stat-card">
            <FaAward className="stat-icon" />
            <h3>25+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-card">
            <FaCalendarAlt className="stat-icon" />
            <h3>10,000+</h3>
            <p>Patients Yearly</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Leadership Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-image"></div>
            <h3>Dr. Sarah Johnson</h3>
            <p>Chief Medical Officer</p>
          </div>
          <div className="team-card">
            <div className="team-image"></div>
            <h3>Michael Chen</h3>
            <p>Hospital Administrator</p>
          </div>
          <div className="team-card">
            <div className="team-image"></div>
            <h3>Dr. Robert Williams</h3>
            <p>Head of Surgery</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;