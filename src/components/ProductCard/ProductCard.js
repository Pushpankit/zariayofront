import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const sizesInStock = product.sizes?.filter(
    (size) => product.stockBySize?.[size] > 0
  ) || [];

  const defaultSelectedSize =
    sizesInStock.includes("M") ? "M" : sizesInStock[0] || null;

  const [selectedSize] = useState(defaultSelectedSize);

  const priceToShow =
    selectedSize && product.pricesBySize?.[selectedSize] !== undefined
      ? product.pricesBySize[selectedSize]
      : null;

  const originalPriceToShow =
    selectedSize && product.originalPricesBySize?.[selectedSize] !== undefined
      ? product.originalPricesBySize[selectedSize]
      : null;

  const hasDiscount =
    originalPriceToShow && priceToShow && originalPriceToShow > priceToShow;

  const discountPercent = hasDiscount
    ? Math.round(
        ((originalPriceToShow - priceToShow) / originalPriceToShow) * 100
      )
    : 0;

  const formatPrice = (price) =>
    typeof price === "number" ? price.toFixed(2) : "N/A";

  const handleClick = (e) => {
    e.stopPropagation(); // Prevents nested clicks
    navigate(`/product/${product._id}`);
  };

  return (
  
    <div
      className="fresh-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
     

<div className="image-wrapper"> 
  <img
    src={
      product.image[0]?.startsWith("http")
        ? product.image[0]
        : `http://localhost:5000${product.image[0]}`
    }
    alt={product.title}
    className="fresh-image"
    loading="lazy"
  />
  {hasDiscount && (
    <div className="sale-badge">{discountPercent}% OFF</div>
  )}
</div>



      <div className="fresh-details">
        <h3 className="fresh-title">{product.title}</h3>
        <p className="fresh-price">
          ₹{formatPrice(priceToShow)}
          {hasDiscount && (
            <span className="original-price">
              ₹{formatPrice(originalPriceToShow)}
            </span>
          )}
        </p>
        <button className="fresh-btn" onClick={handleClick}>
          Shop Now
        </button>
      </div>
    </div>

  );
};

export default ProductCard;
