import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-space">
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" onClick={() => setIsOpen(false)}>Zarizyo</NavLink>
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
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>
            Shop
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>
            Contact
          </NavLink>
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
