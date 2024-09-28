import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div className="section">
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div className="section">
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About OLX Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>OLX People</li>
            </ul>
          </div>
        </div>
        <div className="section">
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
        <div className="section">
          <div className="heading">
            <p>FOLLOW US</p>
          </div>
          <div className="social-icons">
            <ul>
              <li><i className="fab fa-facebook-f"></i></li>
              <li><i className="fab fa-twitter"></i></li>
              <li><i className="fab fa-instagram"></i></li>
              <li><i className="fab fa-linkedin-in"></i></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries: Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2021 OLX</p>
      </div>
    </div>
  );
}

export default Footer;
