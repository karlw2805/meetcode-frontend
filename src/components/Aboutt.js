import React from "react";
import "./Aboutt.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About MeetCode</h1>
        <p className="about-description">
          MeetCode is a real-time collaborative code editor designed for aspiring developers, teams, and educators. 
          Our platform allows users to create, share, and collaborate on code seamlessly, making it the perfect tool 
          for pair programming, coding interviews, and team projects.
        </p>
        <h2 className="about-subtitle">Features</h2>
        <ul className="about-features">
          <li>👩‍💻 Real-time collaboration with multiple users.</li>
          <li>📂 Create and manage repositories for your projects.</li>
          <li>🔒 Secure rooms with password protection.</li>
          <li>🧠 AI assistance for code suggestions and debugging.</li>
          <li>🌐 Support for multiple programming languages.</li>
        </ul>
        <h2 className="about-subtitle">Acknowledgments</h2>
        <p className="about-description">
          This project was developed by second-year CSE students of IIT Roorkee: 
          <span className="highlight"> Arnav Gupta, Kartik Goyal, Krish Singla, Megh Shah, Jay Vaghasiya, and Tanay Kapadia</span>. 
          It was created as part of the course <span className="highlight">CSC-206: Software Engineering</span>, under the guidance of 
          <span className="highlight"> Prof. Sandeep Kumar Garg</span>. We sincerely thank our professor for his invaluable support and mentorship throughout the development process.
        </p>
        <h2 className="about-subtitle">Have Suggestions or Feedback?</h2>
        <p className="about-description">
          We value your feedback and would love to hear your suggestions for improving MeetCode. Feel free to explore our 
          repositories and contribute to the project:
        </p>
        <ul className="about-links">
          <li>
            <a
              href="https://github.com/krishsingla06/meetcode-frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/krishsingla06/meetcode-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Backend Repository
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
