import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pinCode: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalShipping = cartItems.reduce(
    (acc, item) => acc + 100 * item.quantity,
    0
  );

  const total = subtotal + totalShipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerInfo = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      address: `${form.address}, ${form.city}, ${form.state}, ${form.pinCode}`,
    };

    const items = cartItems.map((item) => ({
      productId: item._id,
      title: item.title,
      size: item.selectedSize,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      customerInfo,
      items,
      totalAmount: total,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/orders', orderData);
      alert('✅ Order placed successfully!');
      console.log('Order response:', res.data);
    } catch (err) {
      console.error('Error saving order:', err);
      alert('❌ Failed to place order.');
    }
  };

  return (
    <div className="checkout-page">
      <form className="billing-form" onSubmit={handleSubmit}>
        <h2>Billing details</h2>
        <input name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input value="India" disabled />
        <input name="address" placeholder="Street Address" required onChange={handleChange} />
        <input name="city" placeholder="Town / City" required onChange={handleChange} />
        <select name="state" required value={form.state} onChange={handleChange}>
          <option>Uttar Pradesh</option>
          <option>Delhi</option>
          <option>Maharashtra</option>
        </select>
        <input name="pinCode" placeholder="PIN Code" required onChange={handleChange} />
        <input name="phone" placeholder="Phone" required onChange={handleChange} />
        <input name="email" placeholder="Email Address" required onChange={handleChange} />
        <textarea name="notes" placeholder="Order Notes (Optional)" onChange={handleChange} />

        <div className="order-summary">
          <h2>Your order</h2>

          {cartItems.map((item, index) => (
            <div className="summary-card" key={index}>
              <img
                src={`http://localhost:5000${item.image[0]}`}
                alt={item.title}
                className="product-preview"
              />
              <p><strong>{item.title}</strong></p>
              <p>Size: {item.selectedSize}</p>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Item Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
              <p>Shipping (₹100 × {item.quantity}): ₹{100 * item.quantity}</p>
              <hr />
            </div>
          ))}

          <div className="summary-total">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Total Shipping: ₹{totalShipping.toFixed(2)}</p>
            <h3>Total Amount: ₹{total.toFixed(2)}</h3>
          </div>

          <button type="submit" className="place-order-btn">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
