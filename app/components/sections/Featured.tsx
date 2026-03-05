"use client";

import { featuredProducts } from '@/app/data/products';
import ProductCard from '../ProductCard';
import { FiArrowRight } from 'react-icons/fi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const Featured = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
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
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Hand-picked just for you
            </p>
          </div>
          <Link 
            href="/featured" 
            className="text-navy hover:text-gold font-medium flex items-center gap-1 whitespace-nowrap text-sm sm:text-base"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {/* Horizontal Scroll with Buttons */}
        <div className="relative">
          {featuredProducts.length > 4 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-navy hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-navy hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex-none w-64 sm:w-72 snap-center">
                <ProductCard product={product} />
              </div>
            ))}
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

export default Featured;