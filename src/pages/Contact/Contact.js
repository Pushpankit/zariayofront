import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out the form below.</p>
      </div>

      <div className="contact-content">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="6" required />
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Email: support@mystore.com</p>
          <p>Phone: +1 (800) 123-4567</p>
          <p>Address: 123 Fashion Street, NY, USA</p>
          <div className="loaction-map">
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6664289958067!2d79.45239297474689!3d28.399141375792976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a001e066823cd3%3A0x499b57cc24c88441!2sDesi%20Threads!5e0!3m2!1sen!2sin!4v1748844144899!5m2!1sen!2sin"
  width="400"
  height="300"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Google Map"
/>

   </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
