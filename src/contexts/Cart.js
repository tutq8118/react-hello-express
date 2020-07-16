import React, {useState} from 'react'

export const CartContext = React.createContext();

function CartProvider(props) {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        setCartItems(cartItems.concat(item))
    }
    return (
        <CartContext.Provider value={{
            CartItem: cartItems,
            addToCart: addToCart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
