"use client";

import Link from 'next/link';
import { FiArrowRight, FiTruck, FiShield, FiClock, FiSearch } from 'react-icons/fi';
import { FiLock, FiCreditCard, FiRefreshCw } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Hero = () => {
  // Live visitor count
  const [visitorCount, setVisitorCount] = useState(127);
  
  // Simulate visitor count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 10) - 3;
        return Math.max(85, Math.min(250, prev + change));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-navy text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" 
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/95 to-navy/80"></div>
      

      
      {/* Content */}
<div className="relative container-custom pt-4 sm:pt-6 md:pt-8 lg:pt-6 pb-16 z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="w-full">
            {/* Badge with live visitor count */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="inline-block bg-gold/20 text-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-gold/30">
                🔥 Limited Time Offer
              </div>
              
              {/* Live Visitor Count */}
              <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="whitespace-nowrap">{visitorCount} viewing</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              Huge Discounts <br />
              <span className="text-gold relative">
                on All Products
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M0 0L300 12" stroke="#C6A43F" strokeWidth="2" strokeDasharray="4 4"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-gray-200 font-light">
              Up to 70% off on premium aquatic essentials.
            </p>
            
            {/* Category Quick Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {['Betta', 'Plants', 'Shrimps', 'Snails', 'Food', 'Accessories'].map((item) => (
                <Link 
                  key={item}
                  href={`/category/${item.toLowerCase()}`}
                  className="bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-white/10 hover:bg-gold hover:text-navy transition"
                >
                  {item}
                </Link>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                href="/shop" 
                className="bg-gold text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-md text-sm sm:text-base font-semibold hover:bg-opacity-90 transition flex items-center gap-2 shadow-lg shadow-gold/20 group"
              >
                Shop Now <FiArrowRight className="group-hover:translate-x-1 transition" />
              </Link>
              
              <Link 
                href="/categories" 
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-sm sm:text-base font-semibold hover:bg-black hover:text-navy transition flex items-center gap-2"
              >
                Browse Categories
              </Link>
            </div>
            
            {/* Stats with icons */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/10 p-2 sm:p-3 rounded-full">
                  <FiTruck className="text-gold text-base sm:text-xl" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold text-white">500+</div>
                  <div className="text-xs sm:text-sm text-gray-300">Products</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/10 p-2 sm:p-3 rounded-full">
                  <FiShield className="text-gold text-base sm:text-xl" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold text-white">10k+</div>
                  <div className="text-xs sm:text-sm text-gray-300">Happy</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/10 p-2 sm:p-3 rounded-full">
                  <FiClock className="text-gold text-base sm:text-xl" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold text-white">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-300">Support</div>
                </div>
              </div>
            </div>
            
            {/* Trust Badges - Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              <span className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-1">
                <FiLock className="text-gold text-xs sm:text-sm" /> Secured
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-1">
                <FiTruck className="text-gold text-xs sm:text-sm" /> Free ₹499+
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-1">
                <FiCreditCard className="text-gold text-xs sm:text-sm" /> COD
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-1">
                <FiRefreshCw className="text-gold text-xs sm:text-sm" /> 7 Day
              </span>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-navy bg-gold/20 flex items-center justify-center text-xs text-gold backdrop-blur-sm">
                    👤
                  </div>
                ))}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-navy bg-gold flex items-center justify-center text-[10px] sm:text-xs text-navy font-bold">
                  +2k
                </div>
              </div>
              <span className="text-xs sm:text-sm text-gray-300">happy customers this month</span>
            </div>
          </div>
          
{/* Right Content - Fully responsive */}
<div className="block space-y-6 mt-8 lg:mt-0">
  {/* Offer Card with Animation */}
  <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl animate-float">
    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Today's Top Deals 🔥</h3>
    <div className="space-y-2 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/20 pb-2 sm:pb-3 text-sm sm:text-base">
        <span>Betta Fish</span>
        <span className="text-gold font-bold">50% OFF</span>
      </div>
      <div className="flex items-center justify-between border-b border-white/20 pb-2 sm:pb-3 text-sm sm:text-base">
        <span>Aquatic Plants</span>
        <span className="text-gold font-bold">60% OFF</span>
      </div>
      <div className="flex items-center justify-between border-b border-white/20 pb-2 sm:pb-3 text-sm sm:text-base">
        <span>Lotus</span>
        <span className="text-gold font-bold">70% OFF</span>
      </div>
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span>Fish Food</span>
        <span className="text-gold font-bold">60% OFF</span>
      </div>
    </div>
    <Link href="/deals" className="block text-center mt-4 sm:mt-6 text-gold hover:underline text-sm sm:text-base">
      View All Deals →
    </Link>
  </div>
  
  {/* Search Bar */}
  <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl">
    <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Find what you need</h4>
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search fish, plants..." 
        className="w-full bg-white/5 backdrop-blur-md border border-white/20 rounded-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base text-white placeholder:text-gray-300 focus:outline-none focus:border-gold"
      />
      <button className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-gold text-navy p-1.5 sm:p-2 rounded-full hover:bg-opacity-90 transition">
        <FiSearch size={16} className="sm:w-4.5 sm:h-4.5" />
      </button>
    </div>
    <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300">
      <span>Popular:</span>
      <Link href="/search?q=betta" className="hover:text-gold">Betta</Link>
      <Link href="/search?q=plants" className="hover:text-gold">Plants</Link>
      <Link href="/search?q=shrimps" className="hover:text-gold">Shrimps</Link>
    </div>
  </div>
</div>
        </div>
      </div>
      
{/* Bottom Wave Divider - responsive */}
<div className="absolute bottom-0 left-0 w-full">
  <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
  </svg>
</div>


    </section>
  );
};

export default Hero;