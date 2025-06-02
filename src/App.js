import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
 import ProductDetail from "./components/ProductDetail/ProductDetail";
 import Cart from "./pages/Cart/Cart";
function App() {
  return (
    <>
      <Navbar />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/product/:id" element={<ProductDetail />} /> 
  <Route path="/cart" element={<Cart />} />

</Routes>

      
      <Footer/>
    </>
  );
}

export default App;
