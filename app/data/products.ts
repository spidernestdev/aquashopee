import { Category, Product, Review, RecentPurchase } from '../types';

// Categories Data (18 items)
export const categories: Category[] = [
  { id: '1', name: 'Betta Fish', image: '/images/betta.webp', discount: '50% OFF', productCount: 24, slug: 'betta-fish' },
  { id: '2', name: 'Aquatic Plants', image: '/images/plants.webp', discount: '60% OFF', productCount: 56, slug: 'aquatic-plants' },
  { id: '3', name: 'Guppy Fish', image: '/images/guppy.webp', discount: '60% OFF', productCount: 18, slug: 'guppy-fish' },
  { id: '4', name: 'Shrimps', image: '/images/shrimps.webp', discount: '60% OFF', productCount: 32, slug: 'shrimps' },
  { id: '5', name: 'Crayfish', image: '/images/crayfish.webp', discount: '40% OFF', productCount: 12, slug: 'crayfish' },
  { id: '6', name: 'Aquatic Snail', image: '/images/snail.webp', discount: '40% OFF', productCount: 15, slug: 'aquatic-snail' },
  { id: '7', name: 'Combo Pack', image: '/images/combo.webp', discount: '50% OFF', productCount: 9, slug: 'combo-pack' },
  { id: '8', name: 'Water Lilly', image: '/images/lilly.webp', discount: '60% OFF', productCount: 8, slug: 'water-lilly' },
  { id: '9', name: 'Exotic Calocasia', image: '/images/calocasia.webp', discount: '50% OFF', productCount: 7, slug: 'exotic-calocasia' },
  { id: '10', name: 'Lotus', image: '/images/lotus.webp', discount: '70% OFF', productCount: 11, slug: 'lotus' },
  { id: '11', name: 'Aquarium Fishes', image: '/images/fishes.webp', discount: '50% OFF', productCount: 45, slug: 'aquarium-fishes' },
  { id: '12', name: 'Tissue Culture', image: '/images/tissue.webp', discount: '50% OFF', productCount: 22, slug: 'tissue-culture' },
  { id: '13', name: 'Monster Fishes', image: '/images/monster.webp', discount: '30% OFF', productCount: 14, slug: 'monster-fishes' },
  { id: '14', name: 'Koi Carp Fish', image: '/images/koi.webp', discount: '50% OFF', productCount: 17, slug: 'koi-carp' },
  { id: '15', name: 'Fish Food', image: '/images/fish-food.webp', discount: '60% OFF', productCount: 38, slug: 'fish-food' },
  { id: '16', name: 'Aquarium & Accessories', image: '/images/aquarium.webp', discount: '40% OFF', productCount: 62, slug: 'aquarium-accessories' },
  { id: '17', name: 'Aquatic Medicine', image: '/images/medicine.webp', discount: '40% OFF', productCount: 28, slug: 'aquatic-medicine' },
  { id: '18', name: 'Floating & Pond Plant', image: '/images/pond-plants.webp', discount: '50% OFF', productCount: 21, slug: 'floating-pond-plants' },
];

// FEATURED PRODUCTS - Betta Fish Only
export const featuredProducts: Product[] = [
  {
    id: 'f1',
    name: 'Glow Candy Hmpk(1 pair)',
    price: 999,
    originalPrice: 1899,
    image: '/images/betta-glow.webp',
    category: 'Betta Fish',
    rating: 4.9,
    reviewCount: 67,
    isFeatured: true,
    discount: '57% OFF'
  },
  {
    id: 'f2',
    name: 'Multi Galaxy hmpk betta (1Male)',
    price: 599,
    originalPrice: 1399,
    image: '/images/betta-galaxy.webp',
    category: 'Betta Fish',
    rating: 4.7,
    reviewCount: 34,
    isFeatured: true,
    discount: '53% OFF'
  },
  {
    id: 'f3',
    name: 'Green Dumpo hmpk Betta(1 pair)',
    price: 399,
    originalPrice: 600,
    image: '/images/betta-green.webp',
    category: 'Betta Fish',
    rating: 4.8,
    reviewCount: 45,
    isFeatured: true,
    discount: '47% OFF'
  },
  {
    id: 'f4',
    name: 'Candy Dumpo hmpk Betta(1 pair)',
    price: 1399,
    originalPrice: 2999,
    image: '/images/betta-candy.webp',
    category: 'Betta Fish',
    rating: 4.8,
    reviewCount: 52,
    isFeatured: true,
    discount: '53% OFF'
  },
  {
    id: 'f5',
    name: '24K Gold HMPK Betta Fish(1 pair)',
    price: 999,
    originalPrice: 1599,
    image: '/images/betta-gold.webp',
    category: 'Betta Fish',
    rating: 4.9,
    reviewCount: 78,
    isFeatured: true,
    isSoldOut: true,
    discount: '38% OFF'
  },
  {
    id: 'f6',
    name: 'Multi Galaxy HMPK Betta (1Pair)',
    price: 1299,
    originalPrice: 1999,
    image: '/images/betta-multi.webp',
    category: 'Betta Fish',
    rating: 4.8,
    reviewCount: 41,
    isFeatured: true,
    discount: '35% OFF'
  },
  {
    id: 'f7',
    name: 'Red Rosetail Betta(1 pair)',
    price: 619,
    originalPrice: 1000,
    image: '/images/betta-red.webp',
    category: 'Betta Fish',
    rating: 4.6,
    reviewCount: 29,
    isFeatured: true,
    isSoldOut: true,
    discount: '38% OFF'
  },
  {
    id: 'f8',
    name: 'Yellow Galaxy hmpk Betta(1 pair)',
    price: 899,
    originalPrice: 1499,
    image: '/images/betta-yellow.webp',
    category: 'Betta Fish',
    rating: 4.7,
    reviewCount: 37,
    isFeatured: true,
    discount: '40% OFF'
  }
];

// BEST SELLING PRODUCTS - Shrimp, Stem Plants, Guppy
export const bestSellingProducts: Product[] = [
  {
    id: 'bs1',
    name: 'Cherry Red Shrimp(1 pair)',
    price: 50,
    originalPrice: 80,
    image: '/images/cherry-shrimp.webp',
    category: 'Shrimp Fish',
    rating: 4.8,
    reviewCount: 56,
    isBestSelling: true,
    discount: '38% OFF'
  },
  {
    id: 'bs2',
    name: 'foxtail plant(5 stem)',
    price: 44,
    originalPrice: 66,
    image: '/images/foxtail.webp',
    category: 'Stem Plant',
    rating: 4.6,
    reviewCount: 34,
    isBestSelling: true,
    discount: '33% OFF'
  },
  {
    id: 'bs3',
    name: 'Light Green Shrimp(1 pair)',
    price: 50,
    originalPrice: 80,
    image: '/images/green-shrimp.webp',
    category: 'Shrimp Fish',
    rating: 4.7,
    reviewCount: 42,
    isBestSelling: true,
    discount: '38% OFF'
  },
  {
    id: 'bs4',
    name: 'Red Cabomba(5 stem)',
    price: 33,
    originalPrice: 88,
    image: '/images/red-cabomba.webp',
    category: 'Stem Plant',
    rating: 4.5,
    reviewCount: 28,
    isBestSelling: true,
    discount: '63% OFF'
  },
  {
    id: 'bs5',
    name: 'Limnophila indica mini(6stem)',
    price: 28,
    originalPrice: 49,
    image: '/images/limnophila.webp',
    category: 'Stem Plant',
    rating: 4.4,
    reviewCount: 31,
    isBestSelling: true,
    discount: '43% OFF'
  },
  {
    id: 'bs6',
    name: 'Emerald Green Guppy(1 pair)',
    price: 199,
    originalPrice: 300,
    image: '/images/emerald-guppy.webp',
    category: 'Guppy Fish',
    rating: 4.8,
    reviewCount: 67,
    isBestSelling: true,
    discount: '34% OFF'
  },
  {
    id: 'bs7',
    name: 'Green Cabomba(5 stem)',
    price: 35,
    originalPrice: 88,
    image: '/images/green-cabomba.webp',
    category: 'Stem Plant',
    rating: 4.6,
    reviewCount: 44,
    isBestSelling: true,
    discount: '60% OFF'
  },
  {
    id: 'bs8',
    name: 'Full Gold Guppy(1 pair)',
    price: 219,
    originalPrice: 369,
    image: '/images/gold-guppy.webp',
    category: 'Guppy Fish',
    rating: 4.7,
    reviewCount: 52,
    isBestSelling: true,
    discount: '41% OFF'
  }
];

// TRENDING PRODUCTS - Betta Fish (you said "trending betta fish")
export const trendingProducts: Product[] = [
  {
    id: 't1',
    name: 'Halfmoon Betta Fish',
    price: 699,
    originalPrice: 1399,
    image: '/images/halfmoon-betta.webp',
    category: 'Betta Fish',
    rating: 4.8,
    reviewCount: 124,
    isTrending: true,
    discount: '50% OFF'
  },
  {
    id: 't2',
    name: 'Red Dragon Betta(1 pair)',
    price: 899,
    originalPrice: 1699,
    image: '/images/betta-red-dragon.jpg',
    category: 'Betta Fish',
    rating: 4.9,
    reviewCount: 89,
    isTrending: true,
    discount: '47% OFF'
  },
  {
    id: 't3',
    name: 'Blue Rim Betta(1 Male)',
    price: 549,
    originalPrice: 1099,
    image: '/images/betta-blue.jpg',
    category: 'Betta Fish',
    rating: 4.7,
    reviewCount: 56,
    isTrending: true,
    discount: '50% OFF'
  },
  {
    id: 't4',
    name: 'Koi Betta Fish(1 pair)',
    price: 1299,
    originalPrice: 2499,
    image: '/images/koi.webp',
    category: 'Betta Fish',
    rating: 4.8,
    reviewCount: 73,
    isTrending: true,
    discount: '48% OFF'
  }
];

// Combine all products for any component that needs the full list
export const allProducts: Product[] = [
  ...featuredProducts,
  ...bestSellingProducts,
  ...trendingProducts
];

// Reviews Data (unchanged)
export const reviews: Review[] = [
  {
    id: 'r1',
    customerName: 'Rahul Sharma',
    rating: 5,
    comment: 'Beautiful Betta fish! Healthy and vibrant colors. Packing was excellent.',
    date: '2 days ago',
    productName: 'Halfmoon Betta'
  },
  {
    id: 'r2',
    customerName: 'Priya Patel',
    rating: 5,
    comment: 'Plants arrived fresh and green. Growing well in my aquarium.',
    date: '1 week ago',
    productName: 'Amazon Sword'
  },
  {
    id: 'r3',
    customerName: 'Amit Kumar',
    rating: 4,
    comment: 'Good quality shrimp, all 10 survived and are active.',
    date: '3 days ago',
    productName: 'Red Cherry Shrimp'
  },
  {
    id: 'r4',
    customerName: 'Neha Singh',
    rating: 5,
    comment: 'Fast delivery and great packaging. Fish food seems high quality.',
    date: '5 days ago',
    productName: 'Premium Fish Food'
  }
];

// Recently Purchased Data (unchanged)
export const recentPurchases: RecentPurchase[] = [
  {
    id: 'rp1',
    productName: 'Halfmoon Betta',
    customerName: 'Vikram from Mumbai',
    timeAgo: '2 min ago',
    image: '/images/betta.webp'
  },
  {
    id: 'rp2',
    productName: 'Aquatic Plant Pack',
    customerName: 'Sanjay from Delhi',
    timeAgo: '15 min ago',
    image: '/images/plants.webp'
  },
  {
    id: 'rp3',
    productName: 'Cherry Shrimp',
    customerName: 'Divya from Bangalore',
    timeAgo: '27 min ago',
    image: '/images/shrimps.webp'
  },
  {
    id: 'rp4',
    productName: 'Fish Food Flakes',
    customerName: 'Arjun from Pune',
    timeAgo: '1 hour ago',
    image: '/images/fish-food.webp'
  }
];