import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Zarizyo</h3>
          <p>Your one-stop shop for trendy fashion.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          
        <div className="navbar-links">
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/shop/" >
            Shop
          </NavLink>
          <NavLink to="/contact/" >
            Contact
          </NavLink>
          <NavLink to="/login/" >
            Login
          </NavLink>
        </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@Zarizyo.com</p>
          <p>Phone: +1 (800) 123-4567</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/desi_threads50/" ><i className="fab fa-facebook-f"></i></a>
            <a href="/"><i className="fab fa-instagram"></i></a>
            <a href="/"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Zarizyo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
