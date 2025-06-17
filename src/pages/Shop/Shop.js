import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Shop.css";

const API_URL = "http://localhost:5000/api/admin/products";

const CATEGORIES = ["all", "shirts", "jackets", "dresses", "pants"];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helpers
  const isProductInStock = (product) =>
    Object.values(product.stockBySize || {}).some((stock) => stock > 0);

  const getDefaultPrice = (product) => {
    const { pricesBySize = {}, stockBySize = {} } = product;

    if (stockBySize["M"] > 0 && pricesBySize["M"]) return pricesBySize["M"];

    for (const size of Object.keys(stockBySize)) {
      if (stockBySize[size] > 0 && pricesBySize[size]) return pricesBySize[size];
    }

    return product.price ?? 0;
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const isInStock = isProductInStock(product);
    const price = getDefaultPrice(product);
    const matchesPrice = price <= maxPrice;

    return matchesCategory && isInStock && matchesPrice;
  });

  return (
    <div className="shop-container">
      {/* Sidebar */}
      <aside className="shop-sidebar">
        <h3>Categories</h3>
        <ul>
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className={cat === selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
              style={{ cursor: "pointer" }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>

        <h3>Filter by Price</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <p>Max Price: ₹{maxPrice}</p>
      </aside>

      {/* Main content */}
      <div className="right-content">
        <h1>
          {selectedCategory === "all"
            ? "All Categories"
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Category`}
        </h1>

        <main className="shop-products">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found matching your filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
