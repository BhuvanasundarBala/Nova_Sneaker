import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Products state
  const [products] = useState(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [
        // Default sample item for immediate showcase delight
        {
          id: "nova-apex-one",
          name: "NOVA Apex One",
          color: "Neon Cyber",
          size: "UK 9",
          price: 6999,
          originalPrice: 9999,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80"
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_wishlist');
      return saved ? JSON.parse(saved) : ["nova-apex-one", "nova-phantom-forge"];
    } catch (e) {
      return [];
    }
  });

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [productDetailModal, setProductDetailModal] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo code
  const [promoCode, setPromoCode] = useState('RUNNOVA');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [promoApplied, setPromoApplied] = useState(true);

  // Toast feedback
  const [toast, setToast] = useState(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nova_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Show toast utility
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Add to Cart
  const addToCart = (product, size = "UK 9", colorName = null, qty = 1) => {
    const activeColor = colorName || product.colors?.[0]?.name || "Default";
    const activeImage = product.colors?.find(c => c.name === activeColor)?.heroImage || product.colors?.[0]?.heroImage || "/brand/sneaker-pair-hero.png";

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(
        item => item.id === product.id && item.size === size && item.color === activeColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            color: activeColor,
            size: size,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: qty,
            image: activeImage
          }
        ];
      }
    });

    // Trigger celebratory micro-confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#B7FF00', '#FFFFFF', '#3A3A3A']
      });
    } catch (e) {}

    showToast(`Added ${product.name} (${size}) to bag!`);
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast("Item removed from bag", "info");
  };

  // Update quantity
  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Toggle Wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Saved to your Wishlist ❤️");
        return [...prev, productId];
      }
    });
  };

  // Apply Coupon
  const applyPromo = (code) => {
    if (code.trim().toUpperCase() === 'RUNNOVA') {
      setPromoCode('RUNNOVA');
      setDiscountPercent(15);
      setPromoApplied(true);
      showToast("15% Ambassador Discount Applied!", "success");
      return true;
    } else if (code.trim().toUpperCase() === 'SNEAKERHEAD') {
      setPromoCode('SNEAKERHEAD');
      setDiscountPercent(20);
      setPromoApplied(true);
      showToast("VIP 20% Discount Activated!", "success");
      return true;
    } else {
      showToast("Invalid promo code. Try 'RUNNOVA'", "error");
      return false;
    }
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const discountAmount = promoApplied ? Math.round(cartSubtotal * (discountPercent / 100)) : 0;
  const isFreeShipping = cartSubtotal >= 2999;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 250);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Open AR Try-On
  const openTryOn = (product) => {
    setTryOnProduct(product || products[0]);
    setIsTryOnOpen(true);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      selectedCategory,
      setSelectedCategory,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      quickViewProduct,
      setQuickViewProduct,
      productDetailModal,
      setProductDetailModal,
      isQuizOpen,
      setIsQuizOpen,
      isSizeGuideOpen,
      setIsSizeGuideOpen,
      isTryOnOpen,
      setIsTryOnOpen,
      tryOnProduct,
      openTryOn,
      isAdminView,
      setIsAdminView,
      isCheckoutOpen,
      setIsCheckoutOpen,
      promoCode,
      discountPercent,
      promoApplied,
      applyPromo,
      cartSubtotal,
      cartOriginalTotal,
      discountAmount,
      shippingFee,
      isFreeShipping,
      cartTotal,
      totalItemsCount,
      toast,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
