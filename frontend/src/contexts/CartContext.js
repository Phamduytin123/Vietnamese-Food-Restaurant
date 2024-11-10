import React, { createContext, useState, useContext, useEffect } from 'react';
import cartAPI from '../api/cartAPI';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const getCart = async () => {
    try {
      const response = await cartAPI.getCart();
      const totalQuantity = response.data.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const updateCartCount = async () => {
    try {
      const response = await cartAPI.getCart();
      const totalQuantity = response.data.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  };
  const addToCart = async (data, countItemCart) => {
    setCartCount(cartCount + countItemCart);
    try {
      const response = await cartAPI.addCart(data);
      if (response.success) {
        console.log('Add to cart successfully');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, updateCartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
