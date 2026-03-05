import Image from 'next/image';
import { RecentPurchase } from '../types';
import { FiClock } from 'react-icons/fi';

interface RecentPurchaseCardProps {
  purchase: RecentPurchase;
}

const RecentPurchaseCard = ({ purchase }: RecentPurchaseCardProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-black/5 shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
        <Image 
          src={purchase.image}
          alt={purchase.productName}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Details */}
      <div className="flex-1">
        <p className="text-sm font-medium text-navy">{purchase.productName}</p>
        <p className="text-xs text-gray-500">{purchase.customerName}</p>
      </div>
      
      {/* Time */}
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <FiClock size={12} />
        <span>{purchase.timeAgo}</span>
      </div>
    </div>
  );
};

export default RecentPurchaseCard;