import { categories } from '@/app/data/products';
import CategoryCard from '@/app/components/CategoryCard';

export default function CategoriesPage() {
  return (
    <main className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        {/* Header - same style as homepage */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy border-b-4 border-navy pb-2 inline-block">
              All Categories
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Browse all {categories.length} categories
            </p>
          </div>
        </div>

        {/* Categories Grid - same grid as homepage */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}