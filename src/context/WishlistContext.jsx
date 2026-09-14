import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('bmax_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bmax_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist((prev) => {
      if (prev.some((item) => String(item.id) === String(product.id))) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    if (id === undefined || id === null) return;
    setWishlist((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => {
    if (id === undefined || id === null) return false;
    return wishlist.some((item) => String(item.id) === String(id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);