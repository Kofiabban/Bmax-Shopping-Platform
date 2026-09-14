import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bmax_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bmax_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize, selectedColor, quantityToAdd = 1) => {
    setCart((prevCart) => {
      // Resolve fallback size/color values matching product details
      const targetSize =
        selectedSize ||
        product.selectedSize ||
        (product.sizes && product.sizes[0]) ||
        'Standard';

      const targetColor =
        selectedColor ||
        product.selectedColor ||
        (product.colors && product.colors[0]) ||
        'Default';

      // Parse quantityToAdd to a valid integer (defaults to 1 if invalid/event object passed)
      const parsedQty = typeof quantityToAdd === 'number' && !isNaN(quantityToAdd) ? quantityToAdd : 1;

      // Find if exact item variant already exists in cart (handles loose matching for defaults and string IDs)
      const existingIndex = prevCart.findIndex(
        (item) =>
          String(item.id) === String(product.id) &&
          (item.selectedSize === targetSize || (!item.selectedSize && targetSize === 'Standard')) &&
          (item.selectedColor === targetColor || (!item.selectedColor && targetColor === 'Default'))
      );

      if (existingIndex > -1) {
        // Item exists: Immutably map through to prevent direct state mutation
        return prevCart.map((item, index) => {
          if (index === existingIndex) {
            const currentQty = typeof item.quantity === 'number' ? item.quantity : 1;
            return {
              ...item,
              quantity: currentQty + parsedQty,
            };
          }
          return item;
        });
      }

      // New item: Add entry with explicit parameters and sanitized quantity
      return [
        ...prevCart,
        {
          ...product,
          selectedSize: targetSize,
          selectedColor: targetColor,
          quantity: parsedQty,
        },
      ];
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            String(item.id) === String(id) &&
            (selectedSize ? item.selectedSize === selectedSize : true) &&
            (selectedColor ? item.selectedColor === selectedColor : true)
          )
      )
    );
  };

  const updateQuantity = (id, selectedSize, selectedColor, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (
            String(item.id) === String(id) &&
            (selectedSize ? item.selectedSize === selectedSize : true) &&
            (selectedColor ? item.selectedColor === selectedColor : true)
          ) {
            const currentQty = typeof item.quantity === 'number' ? item.quantity : 1;
            const newQty = currentQty + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Counts unique product variants in the cart for the badge icon
  const totalItems = cart.length;

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (typeof item.quantity === 'number' ? item.quantity : 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);