"use client";

import { reviews } from '@/app/data/products';
import ReviewCard from '../ReviewCard';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Calculate average rating
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

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
              Customer Reviews
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              What our customers say about us
            </p>
          </div>
          
          {/* Overall Rating */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-black/5">
            <div className="flex items-center gap-1">
              <FiStar className="text-gold fill-gold" size={20} />
              <span className="font-bold text-navy">{avgRating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-600">{totalReviews} reviews</span>
          </div>
        </div>

        {/* Horizontal Scroll with Buttons */}
        <div className="relative">
          {true && (
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
            {reviews.map((review) => (
              <div key={review.id} className="flex-none w-80 sm:w-96 snap-center">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-5">
          <Link 
            href="/reviews" 
            className="inline-flex items-center gap-2 bg-navy text-black px-6 py-3 rounded-lg font-medium hover:bg-gold hover:text-navy transition-colors"
          >
            Read All Reviews <FiArrowRight />
          </Link>
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

export default Reviews;