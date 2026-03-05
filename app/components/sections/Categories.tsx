"use client";

import { categories } from '@/app/data/products';
import CategoryCard from '../CategoryCard';
import { FiArrowRight } from 'react-icons/fi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Main categories to show on homepage (8 items)
  const mainCategories = categories.filter(cat => 
    ['Betta Fish', 'Guppy Fish', 'Aquatic Plants', 'Aquarium Fishes', 
     'Shrimps', 'Fish Food', 'Aquarium & Accessories', 'Combo Pack'].includes(cat.name)
  );

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
              Shop by Categories
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Explore our wide range of aquatic life & accessories
            </p>
          </div>
          <a 
            href="/categories" 
            className="text-navy hover:text-gold font-medium flex items-center gap-1 whitespace-nowrap text-sm sm:text-base"
          >
            View All <FiArrowRight />
          </a>
        </div>

        {/* Horizontal Scroll with Buttons */}
        <div className="relative">
          {mainCategories.length > 4 && (
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
            {mainCategories.map((category) => (
              <div key={category.id} className="flex-none w-64 sm:w-72 snap-center">
                <CategoryCard category={category} />
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

export default Categories;