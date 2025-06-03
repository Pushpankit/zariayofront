import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = (method) => {
    alert(`Payment successful via ${method}`);
    clearCart(); // Clear the cart after payment
    navigate("/thank-you"); // Redirect to thank you page
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <h2>Your cart is empty</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>

 <button className="back-btn" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.title} ({item.selectedSize}) x {item.quantity} - $
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="total">Total: ${getCartTotal().toFixed(2)}</p>
      </div>

      <div className="payment-section">
        <h3>Select Payment Method</h3>
        <button
          className="payment-btn"
          onClick={() => handlePayment("Credit Card")}
        >
          <i className="fas fa-credit-card"></i> Credit Card
        </button>
        <button
          className="payment-btn"
          onClick={() => handlePayment("Google Pay")}
        >
          <i className="fab fa-google-pay"></i> Google Pay
        </button>
        <button className="payment-btn" onClick={() => handlePayment("UPI")}>
          <i className="fas fa-university"></i> UPI
        </button>
        <button
          className="payment-btn"
          onClick={() => handlePayment("Cash on Delivery")}
        >
          <i className="fas fa-money-bill-wave"></i> Cash on Delivery
        </button>
      </div>

     
    </div>
  );
};

export default Checkout;
