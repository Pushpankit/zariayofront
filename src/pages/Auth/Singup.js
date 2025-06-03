import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const countryOptions = ["India", "United States", "United Kingdom"];
const stateOptions = {
  India: ["Maharashtra", "Karnataka", "Delhi"],
  "United States": ["California", "Texas", "New York"],
  "United Kingdom": ["England", "Scotland", "Wales"],
};
const districtOptions = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Delhi: ["Central Delhi", "South Delhi", "North Delhi"],
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  "New York": ["NYC", "Buffalo", "Albany"],
  England: ["London", "Manchester", "Birmingham"],
  Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
  Wales: ["Cardiff", "Swansea", "Newport"],
};

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
    address: "",
    street: "",
    country: "",
    state: "",
    district: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const mobileRegex = /^\d{10}$/;

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return emailRegex.test(value) ? "" : "Invalid email format";
      case "password":
        return passwordRegex.test(value)
          ? ""
          : "Min 8 chars, must include letters & numbers";
      case "mobile":
        return mobileRegex.test(value) ? "" : "Mobile number must be 10 digits";
      default:
        return value.trim() === "" ? `${name} is required` : "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Reset dependent fields if parent changes
    if (name === "country") {
      updatedData.state = "";
      updatedData.district = "";
    } else if (name === "state") {
      updatedData.district = "";
    }

    setFormData(updatedData);

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userInfo", JSON.stringify(formData));
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.mobile && <p className="error">{errors.mobile}</p>}

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          type="text"
          name="street"
          placeholder="Street / Area"
          value={formData.street}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.street && <p className="error">{errors.street}</p>}

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select Country</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country}</p>}

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!formData.country}
        >
          <option value="">Select State</option>
          {(stateOptions[formData.country] || []).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <p className="error">{errors.state}</p>}

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!formData.state}
        >
          <option value="">Select District</option>
          {(districtOptions[formData.state] || []).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors.district && <p className="error">{errors.district}</p>}

        <button type="submit">Sign Up</button>
      </form>

      {success && <p className="success">Signup successful! Redirecting...</p>}
      <p onClick={() => navigate("/login")}>
        Already have an account? <span className="link">Login</span>
      </p>
    </div>
  );
};

export default Signup;
