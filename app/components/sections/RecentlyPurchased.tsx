"use client";

import { recentPurchases } from '@/app/data/products';
import RecentPurchaseCard from '../RecentPurchaseCard';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const RecentlyPurchased = () => {
  const [purchases, setPurchases] = useState(recentPurchases);

  // Simulate new purchases coming in
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate the array to simulate live activity
      setPurchases(prev => {
        const newPurchases = [...prev];
        const first = newPurchases.shift();
        if (first) {
          newPurchases.push({
            ...first,
            timeAgo: 'just now',
            customerName: ['Rahul from Delhi', 'Priya from Mumbai', 'Amit from Bangalore'][Math.floor(Math.random() * 3)]
          });
        }
        return newPurchases;
      });
    }, 15000); // New "purchase" every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 md:py-5 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy border-b-4 border-navy pb-2 inline-block">
              Recently Purchased
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Real-time purchases from our customers
            </p>
          </div>
          <Link 
            href="/purchases" 
            className="text-navy hover:text-gold font-medium flex items-center gap-1 whitespace-nowrap text-sm sm:text-base"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {/* Live Activity Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-gray-500">Live purchases</span>
        </div>

        {/* Recent Purchases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {purchases.map((purchase) => (
            <RecentPurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>

        {/* View More Link - Mobile */}
        <div className="text-center mt-6 md:hidden">
          <Link href="/purchases" className="text-gold text-sm font-medium">
            See all purchases →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentlyPurchased;