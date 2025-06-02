import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/productsData";
import { useCart } from "../../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === parseInt(id));
  if (!product) return <div>Product not found!</div>;

  const [selectedSize, setSelectedSize] = useState(null);

  // On mount, default to "M" if in stock, else first available size
  useEffect(() => {
    const inStockSizes = product.sizes.filter(size => product.stockBySize[size] > 0);
    if (product.stockBySize["M"] > 0) {
      setSelectedSize("M");
    } else if (inStockSizes.length > 0) {
      setSelectedSize(inStockSizes[0]);
    }
  }, [product]);

  const noSizesInStock = !product.sizes.some(size => product.stockBySize[size] > 0);

  const selectedPrice = product.pricesBySize?.[selectedSize];
  const selectedOriginalPrice = product.originalPricesBySize?.[selectedSize];

  const discountPercent = selectedOriginalPrice > selectedPrice
    ? Math.round(((selectedOriginalPrice - selectedPrice) / selectedOriginalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (selectedSize && product.stockBySize[selectedSize] > 0) {
      addToCart({ ...product, selectedSize, price: selectedPrice });
      alert(`Added ${product.title} (${selectedSize}) to cart.`);
    }
  };

  const handleSizeClick = (size) => {
    if (product.stockBySize[size] > 0) {
      setSelectedSize(size);
    } else {
      alert(`${size} size is out of stock.`);
    }
  };

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>

      <div className="detail-container">
        <div className="image-wrapper">
          {discountPercent && <div className="sale-badge">{discountPercent}% OFF</div>}
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="description">{product.description}</p>

          <div className="size-selector">
            <p>Select Size:</p>
            <div className="size-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="price-wrapper">
            {selectedOriginalPrice > selectedPrice && (
              <span className="original-price">${selectedOriginalPrice.toFixed(2)}</span>
            )}
            <p className="price">${selectedPrice?.toFixed(2) ?? "N/A"}</p>
          </div>

          <div className="button-group">
            <button className="buy-btn" disabled={noSizesInStock}>
              {noSizesInStock ? "Available Soon" : "Buy Now"}
            </button>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={noSizesInStock}
            >
              {noSizesInStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
