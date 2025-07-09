import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
    <footer className="footer">
        <div className="contents">
            <div classsName="sections">
                <h3>Proofile</h3>
                <p>Use our tool to optimize your resume</p>
            </div>
            <div className="sections">
                <h4>Links</h4>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact</a></li>
                    <li><a>Blogs</a></li>
                </ul>
            </div>
            <div className="sections">
                <h4>Resources</h4>
                <ul>
                    <li><a>Help Center</a></li>
                    <li><a>Guide for Resumes</a></li>
                    <li><a>ATS Tips</a></li>
                    <li><a>Blogs</a></li>
                </ul>
            </div>
            <div className = "sections">
                <h4>Support</h4>
                <p>Email: proofile@gmail.com</p>
                <p>Phone: 1234567890</p>
            </div>
        </div>

        <div className="copy-right">
            <p>&copy; 2025 Proofile. All rights reserved.</p>
        </div>


    </footer>  

    </>
  )
}

export default Footer