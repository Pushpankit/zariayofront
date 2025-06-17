// client/src/components/Navbar.js

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart(); // ✅ access cartItems only
  const { user } = useAuth();

  // ✅ Inline cart count calculation
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-space">
      <nav className="navbar">
        <div className="navbar-logo">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Zarizyo
          </NavLink>
        </div>

        <div className="navbar-search-cart">
          <NavLink to="/cart" onClick={() => setIsOpen(false)}>
            <div className="navbar-cart">
              <FiShoppingBag className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </NavLink>
        </div>

        <div className={`navbar-links-container ${isOpen ? "open" : ""}`}>
          <div className="navbar-links">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Shop
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <span className="navbar-user">
                  Welcome, {user.email || user.phoneNumber}
                </span>
                <button className="navbar-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
