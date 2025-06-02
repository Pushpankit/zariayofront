// pages/Home/Home.jsx
import React from "react";
import products from "../../data/productsData";
import ProductCard from "../../components/ProductCard/ProductCard";
import Slider from "../../components/Slider/Slider";
import "./Home.css";

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-container">
      <Slider />

      <h2>Featured Products</h2>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>


    </div>
  );
};

export default Home;
