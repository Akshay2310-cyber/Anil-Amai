import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Product } from './CartContext';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => Promise<boolean>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const wishlistData = await response.json();
        setWishlist(wishlistData);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (product: Product): Promise<boolean> => {
    if (!isAuthenticated) {
      return false;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        setWishlist(prev => [...prev, product]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setWishlist(prev => prev.filter(item => item.id !== productId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(item => item.id === productId);
  };

  const moveToCart = async (productId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/wishlist/move-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        // Remove from wishlist
        setWishlist(prev => prev.filter(item => item.id !== productId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to move to cart:', error);
      return false;
    }
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    isLoading,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
