import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      href={`/category/${category.slug}`}
      className="group block relative overflow-hidden rounded-xl bg-white border border-black/10 hover:border-black/30 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <Image 
          src={category.image}
          alt={category.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
        {category.discount}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-navy text-base sm:text-lg mb-1 group-hover:text-gold transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm mb-3">
          {category.productCount} Products
        </p>
        <div className="flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
          Shop Now <FiArrowRight className="ml-1 group-hover:ml-2 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;