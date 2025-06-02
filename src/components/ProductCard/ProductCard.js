import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // Use stockBySize object, e.g. { S: 3, M: 5, L: 0 }
  // Default selectedSize is "M" if in stock, else first size in stock, else null
  const sizesInStock = product.sizes?.filter(
    (size) => product.stockBySize?.[size] > 0
  );

  const defaultSelectedSize =
    sizesInStock.includes("M") ? "M" : sizesInStock[0] || null;

  const [selectedSize, setSelectedSize] = useState(defaultSelectedSize);

  // Price and original price for selected size or fallback
  const priceToShow =
    selectedSize && product.pricesBySize?.[selectedSize] !== undefined
      ? product.pricesBySize[selectedSize]
      : product.price;

  const originalPriceToShow =
    selectedSize && product.originalPricesBySize?.[selectedSize] !== undefined
      ? product.originalPricesBySize[selectedSize]
      : product.originalPrice;

  // Discount calculation
  const hasDiscount =
    originalPriceToShow && originalPriceToShow > priceToShow;

  const discountPercent = hasDiscount
    ? Math.round(((originalPriceToShow - priceToShow) / originalPriceToShow) * 100)
    : 0;

  const formatPrice = (price) =>
    typeof price === "number" ? price.toFixed(2) : "N/A";

  // // Handler for size selection
  // const handleSizeClick = (size) => {
  //   if (product.stockBySize?.[size] > 0) {
  //     setSelectedSize(size);
  //   }
  // };

  return (
    <div className="fresh-card">
      <div className="image-wrapper">
        <img src={product.image} alt={product.title} className="fresh-image" />
        {hasDiscount && <div className="sale-badge">{discountPercent}% OFF</div>}
      </div>

      <div className="fresh-details">
        <h3 className="fresh-title">{product.title}</h3>

        {/* <div className="size-selector">
          <p>Select Size:</p>
          <div className="size-buttons">
            {product.sizes?.map((size) => {
              const inStock = product.stockBySize?.[size] > 0;
              return (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""} ${
                    !inStock ? "out-of-stock" : ""
                  }`}
                  disabled={!inStock}
                  onClick={() => handleSizeClick(size)}
                  title={!inStock ? "Out of stock" : ""}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div> */}

        <p className="fresh-price">
          ${formatPrice(priceToShow)}
          {hasDiscount && (
            <span className="original-price">${formatPrice(originalPriceToShow)}</span>
          )}
        </p>

        <Link to={`/product/${product.id}`}>
          <button className="fresh-btn">Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
