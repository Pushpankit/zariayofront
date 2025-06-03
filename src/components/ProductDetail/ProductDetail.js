import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/productsData.json";
import { useCart } from "../../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (!product) return;

    const availableSizes = product.sizes.filter(
      (size) => product.stockBySize?.[size] > 0
    );
    setSelectedSize(availableSizes[0] || null);
    setMainImage(product.image?.[0] || null);
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail">
        <button onClick={() => navigate(-1)} className="go-back">← Go Back</button>
        <p>Product not found!</p>
      </div>
    );
  }

  const price = product.pricesBySize[selectedSize];
  const originalPrice = product.originalPricesBySize[selectedSize];
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (selectedSize && product.stockBySize[selectedSize] > 0) {
      addToCart({ ...product, selectedSize, price });
      alert(`Added ${product.title} (${selectedSize}) to cart.`);
    }
  };

  const handleBuyNow = () => {
    if (selectedSize && product.stockBySize[selectedSize] > 0) {
      addToCart({ ...product, selectedSize, price });
      navigate("/checkout");
    }
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="go-back">← Go Back</button>

      <div className="detail-container">
        <div className="images-section">
          {discount > 0 && <div className="sale-badge">{discount}% OFF</div>}

          <img src={mainImage} alt={product.title} className="main-image" />

          <div className="thumbnail-row">
            {product.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`thumbnail ${img === mainImage ? "selected" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2>{product.title}</h2>
          <p>{product.description}</p>

          <div className="sizes">
            <p>Select Size:</p>
            <div className="size-buttons">
              {product.sizes.map((size) => {
                const inStock = product.stockBySize[size] > 0;
                return (
                  <button
                    key={size}
                    disabled={!inStock}
                    className={selectedSize === size ? "selected" : ""}
                    onClick={() => inStock && setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="prices">
            {discount > 0 && (
              <span className="original-price">${originalPrice.toFixed(2)}</span>
            )}
            <span className="current-price">${price?.toFixed(2)}</span>
          </div>

          <div className="button-row">
            <button
              className="buy-now"
              disabled={!selectedSize || product.stockBySize[selectedSize] === 0}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <button
              className="add-to-cart"
              disabled={!selectedSize || product.stockBySize[selectedSize] === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
