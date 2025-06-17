// // src/context/CartContext.js
// import React, { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load from localStorage on mount
//   useEffect(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   // Save to localStorage on every change
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(
//         (item) => item.id === product.id && item.selectedSize === product.selectedSize
//       );

//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === product.id && item.selectedSize === product.selectedSize
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id, size) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => !(item.id === id && item.selectedSize === size))
//     );
//   };

//   const increaseQuantity = (id, size) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.selectedSize === size
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (id, size) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.id === id && item.selectedSize === size
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const getCartCount = () => {
//     return cartItems.reduce((count, item) => count + item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         getCartTotal,
//         getCartCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔁 Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // 💾 Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (i) => i.id === item.id && i.selectedSize === item.selectedSize
    );

    if (existingItem) {
      const updated = cartItems.map((i) =>
        i.id === item.id && i.selectedSize === item.selectedSize
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id, selectedSize) => {
    const updated = cartItems.filter(
      (i) => !(i.id === id && i.selectedSize === selectedSize)
    );
    setCartItems(updated);
  };

  const increaseQuantity = (id, selectedSize) => {
    const updated = cartItems.map((i) =>
      i.id === id && i.selectedSize === selectedSize
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
    setCartItems(updated);
  };

  const decreaseQuantity = (id, selectedSize) => {
    const updated = cartItems.map((i) =>
      i.id === id && i.selectedSize === selectedSize
        ? { ...i, quantity: Math.max(1, i.quantity - 1) }
        : i
    );
    setCartItems(updated);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
