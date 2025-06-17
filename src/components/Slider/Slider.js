import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";

const slides = [
  {
    id: 1,
    text: "Big Deals on Top Brands!",
    subText: "Upto 70% off on clothing & accessories.",
    image: "/images/slide1.jpg",
  },
  {
    id: 2,
    text: "New Arrivals Just Dropped",
    subText: "Fresh styles for your wardrobe.",
    image: "/images/slide2.jpg",
  },
  {
    id: 3,
    text: "Limited Time Offer",
    subText: "Grab your favorites before they're gone!",
    image: "/images/slide3.jpg",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    timerRef.current = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  return (
    <header className="slider-modern-header">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`modern-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay" />
          <div className="slide-content">
            <h2 className="slide-title">{slide.text}</h2>
            <p className="slide-sub">{slide.subText}</p>
            <button className="cta-button">Shop Now</button>
          </div>
        </div>
      ))}

      <div className="modern-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </header>
  );
};

export default Slider;
