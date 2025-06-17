// src/pages/Home/Home.jsx

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Slider from "../../components/Slider/Slider";
import "./Home.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/products");
        const data = await res.json();
        setFeaturedProducts(data.slice(0, 4)); // show only first 4
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-container">
      <Slider />

      <section className="featured-section">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <p>Loading featured products...</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
