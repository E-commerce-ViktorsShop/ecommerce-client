import React, {createContext, useContext, useEffect, useState} from "react";

// Create the Cart Context
const CartContext = createContext([]);

// Custom Hook for easier access to CartContext
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    // Add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

            if (existingItem) {
                // Update quantity if item already exists
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id
                        ? {...cartItem, quantity: cartItem.quantity + item.quantity}
                        : cartItem
                );
            }

            // Add new item to cart if it doesn't already exist
            return [...prevCart, {...item, quantity: 1}];
        });
    };

    const cartQuantity = () => {
        let total = 0;
        cart.forEach((cartItem) => {
            total += cartItem.quantity;
        })
        return total;
    }

    // Remove an item from the cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    // Clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, cartQuantity}}>
            {children}
        </CartContext.Provider>
    );
};
