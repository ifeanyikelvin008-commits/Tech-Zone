// ===== 1. ProductContext.jsx - Main state management =====
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProductContext = createContext();

// Initial product data
const initialProducts = [
  {
    id: 1,
    name: 'Oraimo Earpods',
    category: 'accessories',
    price: 80,
    image: '/thumbnails/Screenshot_20250920-222329 (1).png',
    stock: 58,
    trending: true,
    badge: null,
    description: 'High-quality wireless earpods with noise cancellation'
  },
  {
    id: 2,
    name: 'Joga Pro Power Bank',
    category: 'accessories',
    price: 20,
    image: '/thumbnails/IMG-20251024-WA0047.jpg',
    stock: 42,
    trending: false,
    badge: null,
    description: '20000mAh fast charging power bank'
  },
  {
    id: 3,
    name: 'PES 4 Controller',
    category: 'games',
    price: 100,
    image: '/thumbnails/Screenshot 2025-10-24 224918.png',
    stock: 25,
    trending: true,
    badge: null,
    description: 'Professional gaming controller for PS4/PC'
  },
  {
    id: 4,
    name: 'iPhone 12 Pro',
    category: 'mobile',
    price: 300,
    image: '/thumbnails/Screenshot_20251029-001820.png',
    stock: 15,
    trending: true,
    badge: 'sale',
    description: 'Apple iPhone 12 Pro, 128GB, Pacific Blue'
  },
  {
    id: 5,
    name: 'Oraimo Headphones',
    category: 'accessories',
    price: 150,
    image: '/thumbnails/Screenshot_20251029-105417.png',
    stock: 30,
    trending: false,
    badge: null,
    description: 'Over-ear wireless headphones with 40h battery life'
  },
  {
    id: 6,
    name: 'Zealot Speaker',
    category: 'speaker',
    price: 100,
    image: '/thumbnails/Screenshot_20251029-114059.png',
    stock: 20,
    trending: true,
    badge: null,
    description: 'Portable Bluetooth speaker with deep bass'
  },
  {
    id: 7,
    name: 'iPad 10th Generation',
    category: 'mobile',
    price: 1790,
    image: '/thumbnails/Screenshot_20251110-022934.png',
    stock: 12,
    trending: true,
    badge: 'trending',
    description: 'iPad 10th Gen, A14 Bionic, 10.9" Liquid Retina'
  },
  {
    id: 8,
    name: 'Samsung Galaxy S21',
    category: 'mobile',
    price: 450,
    image: '/thumbnails/Screenshot_20251031-130356.png',
    stock: 35,
    trending: true,
    badge: null,
    description: 'Samsung Galaxy S21 5G, 128GB'
  },
  {
    id: 9,
    name: 'Samsung Galaxy S20',
    category: 'mobile',
    price: 370,
    image: '/thumbnails/Screenshot_20251031-130623.png',
    stock: 28,
    trending: false,
    badge: null,
    description: 'Samsung Galaxy S20 5G, 128GB'
  },
  {
    id: 10,
    name: 'iPhone 16 Pink',
    category: 'mobile',
    price: 2370,
    image: '/thumbnails/Screenshot_20251110-023026.png',
    stock: 8,
    trending: true,
    badge: 'new',
    description: 'Latest iPhone 16 with A18 chip, Pink'
  },
  {
    id: 11,
    name: 'Samsung Galaxy S22',
    category: 'mobile',
    price: 870,
    image: '/thumbnails/Screenshot_20251031-130715.png',
    stock: 22,
    trending: true,
    badge: null,
    description: 'Samsung Galaxy S22 5G, 256GB'
  },
  {
    id: 12,
    name: 'Samsung Galaxy S10',
    category: 'mobile',
    price: 270,
    image: '/thumbnails/Screenshot_20251031-130308.png',
    stock: 18,
    trending: false,
    badge: 'sale',
    description: 'Samsung Galaxy S10, 128GB'
  },
  {
    id: 13,
    name: 'iPhone 13 Pro Max',
    category: 'mobile',
    price: 550,
    image: '/thumbnails/Screenshot_20251124-165057.png',
    stock: 10,
    trending: true,
    badge: null,
    description: 'iPhone 13 Pro Max, 256GB, Sierra Blue'
  },
  {
    id: 14,
    name: 'iPhone 15 Pro White',
    category: 'mobile',
    price: 1170,
    image: '/thumbnails/Screenshot_20251124-144426.png',
    stock: 14,
    trending: true,
    badge: null,
    description: 'iPhone 15 Pro, White Titanium, 256GB'
  },
  {
    id: 15,
    name: 'iPhone 13 Pro',
    category: 'mobile',
    price: 460,
    image: '/thumbnails/Screenshot_20251124-165031.png',
    stock: 20,
    trending: false,
    badge: 'sale',
    description: 'iPhone 13 Pro, 128GB, Graphite'
  },
  {
    id: 16,
    name: 'Tecno Camon 40 Pro',
    category: 'mobile',
    price: 670,
    image: '/thumbnails/Screenshot_20251125-094053 (2).png',
    stock: 32,
    trending: true,
    badge: null,
    description: 'Tecno Camon 40 Pro, 256GB, 8GB RAM'
  }
];

// Reducer function
const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      
      localStorage.setItem('techzone_cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('techzone_cart', JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    
    case 'UPDATE_QUANTITY':
      const quantityCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      localStorage.setItem('techzone_cart', JSON.stringify(quantityCart));
      return { ...state, cart: quantityCart };
    
    case 'CLEAR_CART':
      localStorage.removeItem('techzone_cart');
      return { ...state, cart: [] };
    
    case 'ADD_TO_WISHLIST':
      const wishlistItem = state.wishlist.find(item => item.id === action.payload.id);
      let updatedWishlist;
      
      if (wishlistItem) {
        updatedWishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      } else {
        updatedWishlist = [...state.wishlist, action.payload];
      }
      
      localStorage.setItem('techzone_wishlist', JSON.stringify(updatedWishlist));
      return { ...state, wishlist: updatedWishlist };
    
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    
    case 'UPDATE_STOCK':
      const updatedProducts = state.products.map(product =>
        product.id === action.payload.id
          ? { ...product, stock: product.stock - action.payload.quantity }
          : product
      );
      localStorage.setItem('techzone_products', JSON.stringify(updatedProducts));
      return { ...state, products: updatedProducts };
    
    default:
      return state;
  }
};

// Provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    cart: [],
    wishlist: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    // Load products
    const storedProducts = localStorage.getItem('techzone_products');
    if (storedProducts) {
      dispatch({ type: 'SET_PRODUCTS', payload: JSON.parse(storedProducts) });
    } else {
      dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
      localStorage.setItem('techzone_products', JSON.stringify(initialProducts));
    }

    // Load cart
    const storedCart = localStorage.getItem('techzone_cart');
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      cart.forEach(item => dispatch({ type: 'ADD_TO_CART', payload: item }));
    }

    // Load wishlist
    const storedWishlist = localStorage.getItem('techzone_wishlist');
    if (storedWishlist) {
      dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(storedWishlist) });
    }
  }, []);

  // Actions
  const addToCart = (product, quantity = 1) => {
    if (product.stock >= quantity) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
      dispatch({ type: 'UPDATE_STOCK', payload: { id: product.id, quantity } });
      return true;
    }
    return false;
  };

  const removeFromCart = (productId) => {
    const cartItem = state.cart.find(item => item.id === productId);
    if (cartItem) {
      // Restore stock
      const product = state.products.find(p => p.id === productId);
      if (product) {
        const updatedProduct = { ...product, stock: product.stock + cartItem.quantity };
        const updatedProducts = state.products.map(p => p.id === productId ? updatedProduct : p);
        localStorage.setItem('techzone_products', JSON.stringify(updatedProducts));
        dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
      }
    }
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    const cartItem = state.cart.find(item => item.id === productId);
    const product = state.products.find(p => p.id === productId);
    
    if (cartItem && product) {
      const quantityDiff = quantity - cartItem.quantity;
      if (product.stock >= quantityDiff) {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
        dispatch({ type: 'UPDATE_STOCK', payload: { id: productId, quantity: quantityDiff } });
        return true;
      }
    }
    return false;
  };

  const toggleWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const isInWishlist = (productId) => {
    return state.wishlist.some(item => item.id === productId);
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    products: state.products,
    cart: state.cart,
    wishlist: state.wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleWishlist,
    isInWishlist,
    getCartTotal,
    getCartCount,
    dispatch
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

// ===== 2. App.jsx - Main application =====
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProductProvider>
  );
}


// ===== 6. pages/Shop.jsx =====
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'mobile', 'accessories', 'games', 'speaker', 'laptop', 'watch'];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="shop-page">
      <div className="container">
        <h1>Shop All Products</h1>
        
        <div className="shop-controls">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        <div className="products-count">
          Showing {filteredProducts.length} products
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;