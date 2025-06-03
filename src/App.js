import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
 import ProductDetail from "./components/ProductDetail/ProductDetail";
 import Cart from "./pages/Cart/Cart";
 import Login from "./pages/Auth/Login";
 import Signup from "./pages/Auth/Singup";
import Checkout from "./pages/Checkout/Checkout";


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
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/checkout" element={<Checkout />} />

</Routes>

      
      <Footer/>
    </>
  );
}

export default App;
