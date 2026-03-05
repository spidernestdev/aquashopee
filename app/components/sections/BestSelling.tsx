"use client";

import { bestSellingProducts } from '@/app/data/products';
import ProductCard from '../ProductCard';
import { FiArrowRight } from 'react-icons/fi';
import { Leaf, Fish, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';

const BestSelling = () => {
  const [showPlants, setShowPlants] = useState(true);
  const [showShrimps, setShowShrimps] = useState(false);
  
  // Refs for horizontal scroll
  const plantsScrollRef = useRef<HTMLDivElement>(null);
  const shrimpsScrollRef = useRef<HTMLDivElement>(null);

  // Split products
  const plants = bestSellingProducts.filter(p => 
    p.name.toLowerCase().includes('plant') || 
    p.name.toLowerCase().includes('cabomba') || 
    p.name.toLowerCase().includes('limnophila')
  );
  
  const others = bestSellingProducts.filter(p => 
    p.name.toLowerCase().includes('shrimp') || 
    p.name.toLowerCase().includes('guppy')
  );

const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
  if (ref.current) {
    const scrollAmount = 300;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

  return (
    <section className="py-5 md:py-5 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy border-b-4 border-navy pb-2 inline-block">
              Best Selling 
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Customer favorites
            </p>
          </div>
          <Link 
            href="/best-selling" 
            className="text-navy hover:text-gold font-medium flex items-center gap-1 whitespace-nowrap text-sm sm:text-base"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {/* Plants Section */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer border-b-2 border-navy/20 pb-2 mb-2"
            onClick={() => setShowPlants(!showPlants)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-navy flex items-center gap-2">
                <Leaf className="w-5 h-5" /> Plants
              </h3>
              <span className="text-xs text-gray-500 font-normal">(Click To {showPlants ? 'Close' : 'Open'})</span>
            </div>
            {showPlants ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          
          <div className={`grid transition-all duration-500 ease-in-out ${
            showPlants 
              ? 'grid-rows-[1fr] opacity-100 mb-4' 
              : 'grid-rows-[0fr] opacity-0 mb-0'
          }`}>
            <div className="overflow-hidden">
              {/* Horizontal Scroll with Buttons */}
              {showPlants && plants.length > 0 && (
                <div className="relative">
                  {true && (
                    <>
                      <button 
                        onClick={() => scroll(plantsScrollRef, 'left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-navy hover:text-white transition-colors"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => scroll(plantsScrollRef, 'right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-navy hover:text-white transition-colors"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  <div 
                    ref={plantsScrollRef}
                    className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {plants.map((product) => (
                      <div key={product.id} className="flex-none w-64 sm:w-72 snap-center">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shrimps & Guppies Section */}
        <div>
          <div 
            className="flex items-center justify-between cursor-pointer border-b-2 border-navy/20 pb-2 mb-2"
            onClick={() => setShowShrimps(!showShrimps)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-navy flex items-center gap-2">
                <Fish className="w-5 h-5" /> Shrimps & Guppies
              </h3>
              <span className="text-xs text-gray-500 font-normal">(click to {showShrimps ? 'Close' : 'Open'})</span>
            </div>
            {showShrimps ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          
          <div className={`grid transition-all duration-500 ease-in-out ${
            showShrimps 
              ? 'grid-rows-[1fr] opacity-100' 
              : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              {/* Horizontal Scroll with Buttons */}
              {showShrimps && others.length > 0 && (
                <div className="relative">
                  {true && (
                    <>
                      <button 
                        onClick={() => scroll(shrimpsScrollRef, 'left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-navy hover:text-white transition-colors"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => scroll(shrimpsScrollRef, 'right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-navy hover:text-white transition-colors"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  <div 
                    ref={shrimpsScrollRef}
                    className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {others.map((product) => (
                      <div key={product.id} className="flex-none w-64 sm:w-72 snap-center">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BestSelling;