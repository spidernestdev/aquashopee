"use client";

import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown, FiTrash2, FiPlus, FiMinus, FiStar, FiHeart, FiFilter } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { allProducts } from '@/app/data/products';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof allProducts>([]);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice, increaseQuantity, decreaseQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, clearWishlist } = useWishlist();

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'low-to-high' | 'high-to-low' | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  // Get unique categories
  const categories = [...new Set(allProducts.map(p => p.category))];

  // Shop categories with subcategories
  const shopCategories = [
    {
      name: 'Fishes',
      slug: 'fishes',
      subcategories: [
        { name: 'Betta Fish', slug: 'betta-fish' },
        { name: 'Guppy Fish', slug: 'guppy-fish' },
        { name: 'Aquarium Fishes', slug: 'aquarium-fishes' },
        { name: 'Monster Fishes', slug: 'monster-fishes' },
        { name: 'Koi Carp Fish', slug: 'koi-carp' },
      ]
    },
    {
      name: 'Shrimps & Crustaceans',
      slug: 'shrimps-crustaceans',
      subcategories: [
        { name: 'Shrimps', slug: 'shrimps' },
        { name: 'Crayfish', slug: 'crayfish' },
        { name: 'Aquatic Snail', slug: 'aquatic-snail' },
      ]
    },
    {
      name: 'Aquatic Plants',
      slug: 'aquatic-plants',
      subcategories: [
        { name: 'Aquatic Plants', slug: 'aquatic-plants' },
        { name: 'Water Lilly', slug: 'water-lilly' },
        { name: 'Lotus', slug: 'lotus' },
        { name: 'Floating & Pond Plant', slug: 'floating-pond-plants' },
        { name: 'Tissue Culture', slug: 'tissue-culture' },
      ]
    },
    {
      name: 'Accessories & Equipment',
      slug: 'accessories',
      subcategories: [
        { name: 'Aquarium & Accessories', slug: 'aquarium-accessories' },
        { name: 'Fish Food', slug: 'fish-food' },
      ]
    },
    {
      name: 'Health & Medicine',
      slug: 'health',
      subcategories: [
        { name: 'Aquatic Medicine', slug: 'aquatic-medicine' },
      ]
    },
    {
      name: 'Offers',
      slug: 'offers',
      subcategories: [
        { name: 'Combo Pack', slug: 'combo-pack' },
      ]
    }
  ];

  // Calculate totals
  const getTotalOriginalPrice = () => {
    return cart.reduce((total, item) => {
      const original = item.originalPrice || item.price;
      return total + (original * item.quantity);
    }, 0);
  };

  const totalOriginal = getTotalOriginalPrice();
  const totalAfterDiscount = getTotalPrice();
  const totalSavings = totalOriginal - totalAfterDiscount;
  const discountPercentage = totalOriginal > 0 
    ? Math.round((totalSavings / totalOriginal) * 100) 
    : 0;
  
  const deliveryCharges = totalAfterDiscount > 499 ? 0 : 99;
  const finalAmount = totalAfterDiscount + deliveryCharges;

  // Search with debounce
// Search with debounce
const handleSearch = (value: string) => {
  setSearchTerm(value);
  
  if (searchTimeout.current) {
    clearTimeout(searchTimeout.current);
  }

  searchTimeout.current = setTimeout(() => {
    if (value.trim()) {
      const searchLower = value.toLowerCase();
      const filtered = allProducts.filter(p => {
        // Search in name
        const nameMatch = p.name.toLowerCase().includes(searchLower);
        
        // Search in category
        const categoryMatch = p.category.toLowerCase().includes(searchLower);
        
        // Special mapping for "fish" - shows all fish types
        if (searchLower === 'fish' || searchLower.includes('fish')) {
          const fishCategories = ['betta fish', 'guppy fish', 'aquarium fishes', 'monster fishes', 'koi carp fish', 'shrimp fish'];
          if (fishCategories.some(f => p.category.toLowerCase().includes(f))) {
            return true;
          }
        }
        
        // Special mapping for "plant" - shows all plants
        if (searchLower === 'plant' || searchLower.includes('plant')) {
          const plantCategories = ['aquatic plants', 'stem plant', 'water lilly', 'lotus', 'floating & pond plant', 'tissue culture'];
          const plantNames = ['cabomba', 'foxtail', 'limnophila', 'lilly', 'lotus'];
          
          if (plantCategories.some(pCat => p.category.toLowerCase().includes(pCat)) ||
              plantNames.some(pName => p.name.toLowerCase().includes(pName))) {
            return true;
          }
        }
        
        // Special mapping for "shrimp"
        if (searchLower === 'shrimp' || searchLower.includes('shrimp')) {
          if (p.category.toLowerCase().includes('shrimp')) {
            return true;
          }
        }
        
        return nameMatch || categoryMatch;
      });
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, 10);
};

// Scroll to product
const scrollToProduct = (productId: string) => {
  router.push(`/products#product-${productId}`);
  setShowSuggestions(false);
  setSearchTerm('');
};

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    }
    if (sortBy) {
      params.set('sort', sortBy);
    }
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    router.push(`/products?${params.toString()}`);
    setIsFilterOpen(false);
  };

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
        setIsShopOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setIsWishlistOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container-custom py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
            Aqua<span className="text-gold">Shopee</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Shop with Mega Menu */}
            <div className="relative" ref={shopRef}>
              <button 
                className="text-gray-700 hover:text-navy font-medium text-sm lg:text-base flex items-center gap-1 transition-colors"
                onClick={() => setIsShopOpen(!isShopOpen)}
              >
                Shop <FiChevronDown className={`text-gold transition-transform duration-200 ${isShopOpen ? 'rotate-180' : ''}`} size={16} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {isShopOpen && (
                <div className="absolute left-0 top-full mt-2 w-150 bg-white rounded-xl shadow-2xl border border-gray-200 py-4 z-50">
                  <div className="px-6 pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-navy text-lg">Shop All</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-6">
                    {shopCategories.map((category, idx) => (
                      <div key={idx} className="space-y-2">
                        <Link
                          href={`/categories?category=${category.slug}`}
                          className="font-semibold text-navy hover:text-gold text-sm block"
                          onClick={() => setIsShopOpen(false)}
                        >
                          {category.name}
                        </Link>
                        <div className="space-y-1.5 pl-2 border-l-2 border-gray-100">
                          {category.subcategories.map((sub, subIdx) => (
                            <Link
                              key={subIdx}
                              href={`/categories?category=${sub.slug}`}
                              className="block text-xs text-gray-600 hover:text-navy transition-colors"
                              onClick={() => setIsShopOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/" className="text-gray-700 hover:text-navy text-sm lg:text-base transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-navy text-sm lg:text-base transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-navy text-sm lg:text-base transition-colors">Contact</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Desktop Search with Filter - NEW */}
            <div className="hidden sm:flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold/20 transition-all relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                className="w-64 lg:w-80 px-4 py-2 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <button className="px-3 text-gray-500 hover:text-navy">
                <FiSearch size={18} />
              </button>
              <div className="w-px h-6 bg-gray-200" />
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-3 text-gray-500 hover:text-navy flex items-center gap-1"
              >
                <FiFilter size={16} />
                <span className="text-sm">Filter</span>
              </button>

              {/* Search Suggestions Dropdown - NEW */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 max-h-96 overflow-y-auto z-50">
                  {suggestions.map((product) => (
<div
  key={product.id}
  onClick={() => scrollToProduct(product.id)}
  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
>
  
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <Image 
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy">{product.name}</p>
                        <p className="text-xs text-gray-500">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Panel - NEW */}
            {isFilterOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-navy text-lg">Filter Products</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-navy"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <h4 className="font-semibold text-navy mb-3">Categories</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, cat]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== cat));
                              }
                            }}
                            className="text-gold focus:ring-gold rounded"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <h4 className="font-semibold text-navy mb-3">Sort By Price</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="sort"
                          checked={sortBy === ''}
                          onChange={() => setSortBy('')}
                          className="text-gold focus:ring-gold"
                        />
                        Default
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="sort"
                          checked={sortBy === 'low-to-high'}
                          onChange={() => setSortBy('low-to-high')}
                          className="text-gold focus:ring-gold"
                        />
                        Price: Low to High
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="sort"
                          checked={sortBy === 'high-to-low'}
                          onChange={() => setSortBy('high-to-low')}
                          className="text-gold focus:ring-gold"
                        />
                        Price: High to Low
                      </label>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-navy mb-3">Price Range</h4>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex items-center gap-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>-</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSortBy('');
                      setPriceRange([0, 2000]);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-navy"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-6 py-2 bg-gold text-navy rounded-lg font-medium hover:bg-navy hover:text-gold transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist Icon - EXACTLY AS BEFORE */}
            <div className="relative" ref={wishlistRef}>
              <button 
                className="text-gray-700 hover:text-navy relative transition-colors"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
              >
                <FiHeart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Wishlist Dropdown */}
              {isWishlistOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-navy text-lg">My Wishlist ({wishlist.length})</h3>
                    {wishlist.length > 0 && (
                      <button 
                        onClick={() => {
                          if (window.confirm('Remove all items from wishlist?')) {
                            clearWishlist();
                          }
                        }}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 border border-red-200 px-2 py-1 rounded"
                      >
                        <FiTrash2 size={12} /> Remove All
                      </button>
                    )}
                  </div>
                  
                  {wishlist.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4 text-center">Your wishlist is empty</p>
                  ) : (
                    <div className="space-y-3">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-3 last:border-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <Image 
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link 
                              href={`/product/${item.id}`}
                              className="text-sm font-semibold text-navy hover:text-gold line-clamp-1"
                              onClick={() => setIsWishlistOpen(false)}
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">₹{item.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button 
                                onClick={() => {
                                  addToCart(item);
                                  setIsWishlistOpen(false);
                                }}
                                className="text-xs bg-gold text-navy px-2 py-1 rounded font-medium hover:bg-navy hover:text-gold transition-colors"
                              >
                                Add to Cart
                              </button>
                              <button 
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-xs border border-black/30 text-black px-2 py-1 rounded hover:text-red-500 hover:border-red-500 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Cart with Dropdown - EXACTLY AS BEFORE */}
            <div className="relative" ref={cartRef}>
              <button 
                className="text-gray-700 hover:text-navy relative transition-colors"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <FiShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {getTotalItems()}
                </span>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="fixed sm:absolute right-0 left-4 sm:left-auto top-16 sm:top-full sm:mt-2 w-auto sm:w-96 mx-4 sm:mx-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 max-h-[calc(100vh-80px)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-navy text-lg">Shopping Cart ({getTotalItems()})</h3>
                    {cart.length > 0 && (
                      <button 
                        onClick={() => {
                          if (window.confirm('Remove all items from cart?')) {
                            cart.forEach(item => removeFromCart(item.id));
                          }
                        }}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 border border-red-200 px-2 py-1 rounded"
                      >
                        <FiTrash2 size={12} /> Remove All
                      </button>
                    )}
                  </div>
                  
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">Your cart is empty</p>
                  ) : (
                    <>
                      {/* Cart Items */}
                      <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
                        {cart.map((item) => {
                          return (
                            <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-4 last:border-0">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                <Image 
                                  src={item.image}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <Link 
                                  href={`/product/${item.id}`}
                                  className="text-xs sm:text-sm font-semibold text-navy hover:text-gold line-clamp-1"
                                  onClick={() => setIsCartOpen(false)}
                                >
                                  {item.name}
                                </Link>
                                
                                <div className="flex items-center gap-1 mt-1">
                                  <div className="flex text-gold">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar 
                                        key={i} 
                                        className={i < Math.floor(item.rating) ? 'text-gold fill-gold' : 'text-gray-300'}
                                        size={10}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] sm:text-xs text-gray-500">({item.reviewCount})</span>
                                </div>
                                
                                <div className="flex items-center justify-between mt-2 gap-1">
                                  <div className="flex flex-wrap items-center">
                                    <span className="text-xs sm:text-sm font-bold text-navy">₹{item.price}</span>
                                    {item.originalPrice && (
                                      <span className="text-[10px] sm:text-xs text-gray-400 line-through ml-1">₹{item.originalPrice}</span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                                    <button 
                                      onClick={() => decreaseQuantity(item.id)}
                                      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white rounded text-navy hover:bg-gold hover:text-navy transition-colors"
                                    >
                                      <FiMinus size={10} />
                                    </button>
                                    <span className="text-xs sm:text-sm font-bold text-navy w-4 sm:w-5 text-center">{item.quantity}</span>
                                    <button 
                                      onClick={() => increaseQuantity(item.id)}
                                      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white rounded text-navy hover:bg-gold hover:text-navy transition-colors"
                                    >
                                      <FiPlus size={10} />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-1 sm:gap-2 mt-2 flex-wrap">
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-[10px] sm:text-xs border border-black/30 text-black hover:text-red-500 hover:border-red-500 flex items-center gap-0.5 px-2 py-1 rounded transition-colors"
                                  >
                                    <FiTrash2 size={10} /> Remove
                                  </button>
                                  <span className="text-gray-300 text-[10px]">|</span>
                                  <button 
                                    onClick={() => {
                                      addToWishlist(item);
                                      removeFromCart(item.id);
                                    }}
                                    className="text-[10px] sm:text-xs text-gray-600 hover:text-gold transition-colors border border-black/30 px-2 py-1 rounded"
                                  >
                                    Save for later
                                  </button>
                                  <span className="text-gray-300 text-[10px]">|</span>
                                  <Link 
                                    href={`/product/${item.id}`}
                                    className="text-[10px] sm:text-xs text-gold hover:text-navy transition-colors font-medium border border-gold/30 px-2 py-1 rounded"
                                    onClick={() => setIsCartOpen(false)}
                                  >
                                    Buy now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Price Breakdown */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-3">
                        <h4 className="font-semibold text-navy text-xs sm:text-sm mb-2">Price Details</h4>
                        
                        <div className="space-y-1.5 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">MRP</span>
                            <span className="text-gray-800">₹{totalOriginal}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Discounts</span>
                            <span className="text-green-600">-₹{totalSavings} ({discountPercentage}%)</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery</span>
                            <span className={deliveryCharges === 0 ? 'text-green-600' : 'text-gray-800'}>
                              {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                            </span>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between font-bold">
                              <span className="text-navy">Total</span>
                              <span className="text-gold text-base sm:text-lg">₹{finalAmount}</span>
                            </div>
                            {deliveryCharges === 0 && (
                              <p className="text-[10px] sm:text-xs text-green-600 mt-1">
                                🎉 Saved ₹99 on delivery!
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Link 
                        href="/checkout"
                        className="block w-full bg-gold text-navy text-center py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-bold hover:bg-navy hover:text-gold transition-colors border-2 border-gold mt-3"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Checkout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="text-gray-700 hover:text-navy hidden sm:block transition-colors">
              <FiUser size={20} />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-navy transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

{/* Mobile Search with Filter */}
<div className="sm:hidden mt-3 relative" ref={searchRef}>
  <div className="flex items-center gap-2">
    <div className="relative flex-1">
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => searchTerm && setShowSuggestions(true)}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-navy">
        <FiSearch size={18} />
      </button>
    </div>
    
{/* Mobile Filter Button - Darker Navy */}
<button
  onClick={() => setIsFilterOpen(!isFilterOpen)}
  className="bg-[#0B1E33] text-white p-3 rounded-lg hover:bg-gold hover:text-navy transition-colors shadow-lg"
>
  <FiFilter size={20} />
</button>
  </div>

  {/* Mobile Search Suggestions */}
  {showSuggestions && suggestions.length > 0 && (
    <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 max-h-96 overflow-y-auto z-50">
      {suggestions.map((product) => (
        <button
          key={product.id}
          onClick={() => scrollToProduct(product.id)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <Image 
              src={product.image}
              alt={product.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-navy">{product.name}</p>
            <p className="text-xs text-gray-500">₹{product.price}</p>
          </div>
        </button>
      ))}
    </div>
  )}
</div>

        {/* Mobile Menu - Fixed Version - EXACTLY AS BEFORE */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Bottom Sheet Menu */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 md:hidden max-h-[80vh] overflow-y-auto animate-slide-up">
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="font-bold text-navy text-lg">Menu</h3>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-4 pb-8">
                <nav className="flex flex-col space-y-2">
                  {/* Shop Accordion */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      className="w-full px-4 py-4 text-left text-gray-700 hover:text-navy font-medium flex items-center justify-between bg-gray-50"
                      onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                    >
                      <span>Shop</span>
                      <FiChevronDown className={`text-gold transition-transform duration-300 ${isMobileShopOpen ? 'rotate-180' : ''}`} size={18} />
                    </button>
                    
                    {/* Shop Submenu */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMobileShopOpen ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="p-4 space-y-4 border-t border-gray-100">
                        {shopCategories.map((category, idx) => (
                          <div key={idx} className="space-y-2">
                            <Link
                              href={`/categories?category=${category.slug}`}
                              className="block font-semibold text-navy text-sm hover:text-gold"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileShopOpen(false);
                              }}
                            >
                              {category.name}
                            </Link>
                            <div className="pl-3 space-y-2 border-l-2 border-gray-200">
                              {category.subcategories.map((sub, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={`/categories?category=${sub.slug}`}
                                  className="block text-xs text-gray-600 hover:text-navy py-1"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsMobileShopOpen(false);
                                  }}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <Link 
                    href="/" 
                    className="block px-4 py-4 text-gray-700 hover:text-navy border border-gray-200 rounded-lg bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="block px-4 py-4 text-gray-700 hover:text-navy border border-gray-200 rounded-lg bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block px-4 py-4 text-gray-700 hover:text-navy border border-gray-200 rounded-lg bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  {/* Account Button */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <button className="text-gray-700 hover:text-navy flex items-center gap-2 transition-colors w-full">
                      <FiUser size={18} /> 
                      <span className="text-sm font-medium">Account</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;