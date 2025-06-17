import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { requireLoginWithRedirect } from "../../utils/auth";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (data.image?.length) {
          setMainImage(data.image[0]);
        }

        const defaultSize = data.sizes.find((size) => data.stockBySize[size] > 0);
        if (defaultSize) {
          setSelectedSize(defaultSize);
          setPrice(data.pricesBySize[defaultSize]);
          setOriginalPrice(data.originalPricesBySize[defaultSize]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`); // ✅ updated to public route
        const allProducts = await res.json();
        const similar = allProducts.filter(
          (item) => item.category === product.category && item._id !== product._id
        );
        setSimilarProducts(similar);
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    if (product) fetchSimilarProducts();
  }, [product, API_URL]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(product.pricesBySize[size]);
    setOriginalPrice(product.originalPricesBySize[size]);
  };

const handleAddToCart = () => {
  const itemToAdd = {
    id: product._id,
    title: product.title,
    image: product.image,
    price: product.pricesBySize[selectedSize],
    selectedSize,
    quantity: 1,
  };
  addToCart(itemToAdd);
  alert("Item added to cart!");
};




const handleBuyNow = (product) => {
  navigate('/checkout', { state: { product, quantity: 1 } });
};


 
  if (!product) return <p>Loading product details...</p>;

  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="product-detail">
      
    <div className="image-section">
  {/* Main preview image */}
  <img
    src={`http://localhost:5000${mainImage}`}
    alt={product.title}
    className="main-image"
  />

  {/* Thumbnail images */}
  <div className="image-thumbnails">
    {product.image.map((img, idx) => (
      <img
        key={idx}
        src={`http://localhost:5000${img}`} // ✅ Corrected: use 'img', not product.image[0]
        alt={`Thumbnail ${idx + 1}`}
        className={`thumbnail ${mainImage === img ? "active" : ""}`}
        onClick={() => setMainImage(img)}
      />
    ))}
  </div>
</div>


      <div className="info-section">
        <h2>{product.title}</h2>
        <p>
          ₹{price.toFixed(2)}{" "}
          {originalPrice > price && (
            <>
              <span className="original-price">₹{originalPrice.toFixed(2)}</span>
              <span className="discount-badge">{discountPercent}% OFF</span>
            </>
          )}
        </p>
        <p>{product.description}</p>

        <div className="sizes">
          <p>Select Size:</p>
          {product.sizes.map((size) => (
            <button
              key={size}
              disabled={product.stockBySize[size] === 0}
              className={`size-btn ${selectedSize === size ? "selected" : ""}`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={() => handleBuyNow(product)}>Buy Now</button>

        </div>
      </div>

      <div className="more-item">
        <h2>Similar Products</h2>
        <div className="similar-products">
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
