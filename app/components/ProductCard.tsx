"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const inWishlist = isInWishlist(product.id);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const phoneNumber = "917736041322";
  const whatsappMessage = `Hi! I'm interested in *${product.name}* (₹${product.price}) from your website. Is it available? Can you provide more details?`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-black/10 hover:border-black/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Discount Badge */}
      {product.discount && !product.isSoldOut && (
        <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          {product.discount}
        </div>
      )}
      
      {/* Sold Out Badge */}
      {product.isSoldOut && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          SOLD OUT
        </div>
      )}
      
      {/* Wishlist Button - Now Clickable */}
      <button 
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
          inWishlist 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 backdrop-blur-sm text-navy hover:bg-white'
        }`}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FiHeart className={inWishlist ? 'fill-white' : ''} size={16} />
      </button>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-14 bg-green-500 text-white p-2 rounded-full z-10 hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
        onClick={(e) => e.stopPropagation()}
      >
        <FaWhatsapp size={16} />
      </a>

      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-gray-100">
        <Image 
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-navy text-base sm:text-lg mb-1 hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-xs sm:text-sm mb-2">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg sm:text-xl font-bold text-navy">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-xs text-green-600 font-medium">{discountPercentage}% off</span>
            </>
          )}
        </div>

        {/* Add to Cart / Quantity Selector */}
        {product.isSoldOut ? (
          <button 
            disabled
            className="w-full bg-gray-400 text-white py-2.5 rounded-lg font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : quantity === 0 ? (
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-gold text-navy font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-navy hover:text-gold transition-all duration-300 border-2 border-gold"
          >
            <FiShoppingCart size={18} />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => decreaseQuantity(product.id)}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-navy hover:bg-gold hover:text-navy transition-colors shadow-sm"
            >
              <FiMinus size={16} />
            </button>
            
            <span className="font-bold text-navy text-lg">{quantity}</span>
            
            <button 
              onClick={() => increaseQuantity(product.id)}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-navy hover:bg-gold hover:text-navy transition-colors shadow-sm"
            >
              <FiPlus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;