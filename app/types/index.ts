// Category type
export interface Category {
  id: string;
  name: string;
  image: string;
  discount: string;
  productCount: number;
  slug: string;
}

// Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSelling?: boolean;
  isSoldOut?: boolean;
  discount?: string;
}

// Review type
export interface Review {
  id: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  comment: string;
  date: string;
  productName?: string;
}

// Recently purchased type
export interface RecentPurchase {
  id: string;
  productName: string;
  customerName: string;
  timeAgo: string;
  image: string;
}