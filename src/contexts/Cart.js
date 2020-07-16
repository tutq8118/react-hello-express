import React, { useState } from 'react';

export const CartContext = React.createContext();

function CartProvider(props) {
  const initCartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  const [cartItems, setCartItems] = useState(initCartItems);
  const addToCart = (item) => {
    if (!cartItems.find((e) => e._id === item._id)) {
      setCartItems(cartItems.concat({ ...item, qty: 1 }));
      localStorage.setItem('cartItems', JSON.stringify(cartItems.concat({ ...item, qty: 1 })));
    } else {
        const newCartItems = [...cartItems];
        newCartItems.forEach((el, index) => {
          if (item._id === el._id) {
            el.qty++;
          }
        });
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
