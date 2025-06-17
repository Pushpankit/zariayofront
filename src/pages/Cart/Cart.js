

// import React from "react";
// import { useCart } from "../../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     getCartTotal,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useCart();

//   const navigate = useNavigate();

//   return (
//     <div className="cart-page">
//       <h2>Your Shopping Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <p>Your cart is empty.</p>
//           <button onClick={() => navigate("/shop")}>Continue Shopping</button>
//         </div>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div
//                 key={`${item.id}-${item.selectedSize}`}
//                 className="cart-item"
//               >
//                 <div
//                   className="clickable-item-info"
//                   onClick={() =>
//                     navigate(`/product/${item.id}`, { state: { product: item } })
//                   }
//                 >
//                   <img
//                     src={`http://localhost:5000${item.image[0]}`}
//                     alt={item.title}
//                     className="cart-item-image"
//                   />
//                   <div className="cart-item-info">
//                     <h3>{item.title}</h3>
//                     <p>Size: {item.selectedSize}</p>
//                     <p>Price: ₹{item.price.toFixed(2)}</p>
//                   </div>
//                 </div>

//                 <div className="cart-item-controls">
//                   <div className="quantity-controls">
//                     <button
//                       onClick={() =>
//                         decreaseQuantity(item.id, item.selectedSize)
//                       }
//                     >
//                       −
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() =>
//                         increaseQuantity(item.id, item.selectedSize)
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
//                   <button
//                     className="remove-btn"
//                     onClick={(e) => {
//                       e.stopPropagation(); // prevent click from opening detail page
//                       removeFromCart(item.id, item.selectedSize);
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <h3>Total: ₹{getCartTotal().toFixed(2)}</h3>
//             <button
//               className="checkout-btn"
//               onClick={() => navigate("/checkout", {
//                 state: {
//                   product: cartItems[0],
//                   quantity: cartItems[0].quantity
//                 }
//               })}
//             >
//               Proceed to Checkout
//             </button>
//           </div>

//           <div className="empty-cart">
//             <button onClick={() => navigate("/shop")}>Continue Shopping</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/shop")}>Continue Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="cart-item"
              >
                <div
                  className="clickable-item-info"
                  onClick={() =>
                    navigate(`/product/${item.id}`, { state: { product: item } })
                  }
                >
                  <img
                    src={`http://localhost:5000${item.image[0]}`}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>Size: {item.selectedSize}</p>
                    <p>Price: ₹{item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.selectedSize)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.selectedSize)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id, item.selectedSize);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{getCartTotal().toFixed(2)}</h3>
            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    cartItems: cartItems, // ✅ send entire cart
                  },
                })
              }
            >
              Proceed to Checkout
            </button>
          </div>

          <div className="empty-cart">
            <button onClick={() => navigate("/shop")}>Continue Shopping</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
