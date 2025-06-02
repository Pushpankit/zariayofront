import React, { useState } from "react";
import products from "../../data/productsData";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Shop.css";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(100);

  const categories = ["all", "shirts", "jackets", "dresses", "pants"];

  // Helper to check if product has stock in any size
  const isProductInStock = (product) =>
    Object.values(product.stockBySize || {}).some((stock) => stock > 0);

  // Helper to get price of default size "M" or first available size
  const getDefaultPrice = (product) => {
    if (!product.pricesBySize) return product.price ?? 0;

    if (product.stockBySize?.["M"] > 0 && product.pricesBySize["M"]) {
      return product.pricesBySize["M"];
    }

    const firstAvailableSize = Object.entries(product.stockBySize || {}).find(
      ([, stock]) => stock > 0
    );
    if (firstAvailableSize) {
      const size = firstAvailableSize[0];
      return product.pricesBySize[size] ?? product.price ?? 0;
    }

    // If no size available, fallback to product.price or 0
    return product.price ?? 0;
  };

  const filteredProducts = products.filter((product) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;

    // In-stock filter (only show products with stock in at least one size)
    const inStock = isProductInStock(product);

    // Price filter on default price based on size stock
    const price = getDefaultPrice(product);
    const priceMatch = price <= maxPrice;

    return categoryMatch && priceMatch && inStock;
  });

  return (
    <div className="shop-container">
      {/* Left Sidebar */}
      <aside className="shop-sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map((cat) => (
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
        <p>Max Price: ${maxPrice}</p>
      </aside>

      {/* Right Content: Product Grid */}
      <div className="right-content">
     <h1>{selectedCategory === "all" ? "All Categories" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Categories`}</h1>
      <main className="shop-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
        
      </main>
      </div>
    </div>
  );
};

export default Shop;
