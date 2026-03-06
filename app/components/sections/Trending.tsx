"use client";

import { trendingProducts } from '@/app/data/products';
import ProductCard from '../ProductCard';
import { FiArrowRight } from 'react-icons/fi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const Trending = () => {
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
    <section className="py-5 md:py-5 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy border-b-4 border-navy pb-2 inline-block">
              Trending Now 
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Most popular picks this week
            </p>
          </div>
          <Link 
            href="/trending" 
            className="text-navy hover:text-gold font-medium flex items-center gap-1 whitespace-nowrap text-sm sm:text-base"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {/* Horizontal Scroll with Buttons */}
        <div className="relative">
          {true && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-black shadow-lg hover:bg-navy hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-black shadow-lg hover:bg-navy hover:text-white transition-colors"
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

            {/* Mobile → 2 cards snap */}
            <div className="flex sm:hidden w-full">
              {Array.from({ length: Math.ceil(trendingProducts.length / 2) }).map((_, i) => (
                <div key={i} className="flex-none w-full snap-center">
                  <div className="flex gap-4">
                    {trendingProducts.slice(i * 2, i * 2 + 2).map((product) => (
                      <div key={product.id} className="w-1/2">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop → original layout */}
            <div className="hidden sm:flex gap-5">
              {trendingProducts.map((product) => (
                <div key={product.id} className="flex-none w-64 sm:w-72 snap-center">
                  <ProductCard product={product} />
                </div>
              ))}
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

export default Trending;