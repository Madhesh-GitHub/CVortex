import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CVortex</h3>
          <p>Optimize your resume for better job opportunities</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/demo-templates">Demo Templates</Link></li>
            <li><Link to="/resume-guide">Resume Guide</Link></li>
            <li><Link to="/ats-tips">ATS Tips</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: cvortexofficial@gmail.com</p>
          {/* <p>Phone: +1 (555) 123-4567</p> */}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 CVortex. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
