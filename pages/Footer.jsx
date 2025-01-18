import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-section about">
            <h3>About Us</h3>
            <p>We provide top-notch services to help you achieve your goals. Our team of experts is dedicated to delivering the best experience.</p>
          </div>
        <div className="footer-container">
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon">Facebook</a>
              <a href="#" className="social-icon">Twitter</a>
              <a href="#" className="social-icon">LinkedIn</a>
              <a href="#" className="social-icon">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 YourCompanyName. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer