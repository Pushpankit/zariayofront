import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";

const slides = [
  { id: 1, text: "Welcome to MyStore! Best deals every day." },
  { id: 2, text: "Check out our new arrivals in the Shop section." },
  { id: 3, text: "Enjoy free shipping on orders over $50." },
  { id: 4, text: "Subscribe to get exclusive offers and discounts!" },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Reset and start timer on current slide change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [current]);

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === current ? "active" : ""}`}
        >
          {slide.text}
        </div>
      ))}

      {/* <button className="slider-btn prev-btn" onClick={prevSlide} aria-label="Previous Slide">
        &#10094;
      </button>
      <button className="slider-btn next-btn" onClick={nextSlide} aria-label="Next Slide">
        &#10095;
      </button> */}

      <div className="dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
