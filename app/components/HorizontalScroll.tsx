"use client";

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';
import ReviewCard from './ReviewCard';

interface Props {
  title: string;
  items: any[];
  type: 'category' | 'product' | 'review';
  viewAllLink?: string;
}

const HorizontalScroll = ({ title, items, type, viewAllLink }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderCard = (item: any, index: number) => {
    switch(type) {
      case 'category':
        return <CategoryCard key={item.id || index} category={item} />;
      case 'product':
        return <ProductCard key={item.id || index} product={item} />;
      case 'review':
        return <ReviewCard key={item.id || index} review={item} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-5 md:py-5 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-navy border-b-4 border-navy pb-2 inline-block">
            {title}
          </h2>
          
          <div className="flex items-center gap-2">
            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-gray-100 hover:bg-navy hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-gray-100 hover:bg-navy hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {viewAllLink && (
              <a 
                href={viewAllLink}
                className="text-navy hover:text-gold font-medium ml-2"
              >
                View All
              </a>
            )}
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
{Array.from({ length: Math.ceil(items.length / 2) }).map((_, i) => (
  <div key={i} className="flex-none w-full snap-center">
    <div className="grid grid-cols-2 gap-4">
      {items.slice(i * 2, i * 2 + 2).map((item, index) =>
        renderCard(item, index)
      )}
    </div>
  </div>
))}
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

export default HorizontalScroll;