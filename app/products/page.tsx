"use client";

import { Suspense } from "react";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { allProducts } from '@/app/data/products';
import ProductCard from '@/app/components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'low-to-high' | 'high-to-low' | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 2000]);

  const categories = [...new Set(allProducts.map(p => p.category))];

useEffect(() => {
  let result = [...allProducts];

  const categoriesParam = searchParams.get('categories');
  const sortParam = searchParams.get('sort') as 'low-to-high' | 'high-to-low' | '';

  let minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 1;
  let maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 2000;

  if (minPrice < 1) minPrice = 1;
  if (maxPrice < 0) maxPrice = 2000;

  if (categoriesParam) {
    setSelectedCategories(categoriesParam.split(','));
  } else {
    setSelectedCategories([]);
  }

  if (sortParam) {
    setSortBy(sortParam);
  }

  setPriceRange([minPrice, maxPrice]);

  if (maxPrice === 0) {
    setFilteredProducts([]);
    return;
  }

  if (categoriesParam) {
    const categoryList = categoriesParam.split(',');
    result = result.filter(p => categoryList.includes(p.category));
  }

  result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

  if (sortParam === 'low-to-high') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortParam === 'high-to-low') {
    result.sort((a, b) => b.price - a.price);
  }

  setFilteredProducts(result);

}, [searchParams]);

  const updateFilters = (categories: string[], sort: string, min: number, max: number) => {
    const params = new URLSearchParams();

    if (categories.length > 0) {
      params.set('categories', categories.join(','));
    }
    if (sort) {
      params.set('sort', sort);
    }

    params.set('minPrice', min.toString());
    params.set('maxPrice', max.toString());

    window.history.pushState({}, '', `/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories;

    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter(c => c !== category);
    }

    setSelectedCategories(newCategories);
    updateFilters(newCategories, sortBy, priceRange[0], priceRange[1]);
  };

  const handleSortChange = (sort: 'low-to-high' | 'high-to-low' | '') => {
    setSortBy(sort);
    updateFilters(selectedCategories, sort, priceRange[0], priceRange[1]);
  };

const handlePriceChange = (min: number, max: number) => {
  const safeMin = Math.max(1, min);
  const safeMax = Math.max(safeMin, max);

  setPriceRange([safeMin, safeMax]);
  updateFilters(selectedCategories, sortBy, safeMin, safeMax);
};

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortBy('');
    setPriceRange([1, 2000]);
    window.history.pushState({}, '', '/products');
  };

  return (
    <main className="py-8 md:py-12 bg-white">
      <div className="container-custom">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy border-b-4 border-navy pb-2 inline-block">
              All Products
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              {filteredProducts.length} products found
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:bg-gold hover:text-navy transition-colors"
          >
            <FiFilter size={18} />
            Filters
            {(selectedCategories.length > 0 || sortBy || priceRange[1] < 2000) && (
              <span className="bg-gold text-navy text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {(selectedCategories.length > 0 ? 1 : 0) + (sortBy ? 1 : 0) + (priceRange[1] < 2000 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy text-lg">Filter Products</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-navy"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <h4 className="font-semibold text-navy mb-3">Categories</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) => handleCategoryChange(cat, e.target.checked)}
                        className="text-gold focus:ring-gold rounded"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy mb-3">Sort By Price</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === ''}
                      onChange={() => handleSortChange('')}
                      className="text-gold focus:ring-gold"
                    />
                    Default
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === 'low-to-high'}
                      onChange={() => handleSortChange('low-to-high')}
                      className="text-gold focus:ring-gold"
                    />
                    Price: Low to High
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === 'high-to-low'}
                      onChange={() => handleSortChange('high-to-low')}
                      className="text-gold focus:ring-gold"
                    />
                    Price: High to Low
                  </label>
                </div>
              </div>

<div className="md:col-span-2">
  <h4 className="font-semibold text-navy mb-3">Price Range</h4>
  <div className="flex items-center gap-4">
    <input
      type="range"
      min="1"
      max="2000"
      value={priceRange[1]}
      onChange={(e) => {
        const maxVal = parseInt(e.target.value);

        setPriceRange([1, maxVal]);

        const params = new URLSearchParams();

        if (selectedCategories.length > 0) {
          params.set('categories', selectedCategories.join(','));
        }

        if (sortBy) {
          params.set('sort', sortBy);
        }

        params.set('minPrice', '1');
        params.set('maxPrice', maxVal.toString());

        window.history.pushState({}, '', `/products?${params.toString()}`);
      }}
      className="w-full"
    />

    <div className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-lg border border-gray-200">
      <span className="font-medium">₹1</span>
      <span>-</span>
      <span className="font-medium">₹{priceRange[1]}</span>
    </div>
  </div>
</div>

            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading products...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}