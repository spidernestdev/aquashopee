import { Review } from '../types';
import { FiStar, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useState } from 'react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userAction === 'like') {
      setLikes(likes - 1);
      setUserAction(null);
    } else if (userAction === 'dislike') {
      setDislikes(dislikes - 1);
      setLikes(likes + 1);
      setUserAction('like');
    } else {
      setLikes(likes + 1);
      setUserAction('like');
    }
  };

  const handleDislike = () => {
    if (userAction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserAction(null);
    } else if (userAction === 'like') {
      setLikes(likes - 1);
      setDislikes(dislikes + 1);
      setUserAction('dislike');
    } else {
      setDislikes(dislikes + 1);
      setUserAction('dislike');
    }
  };

  return (
    <div className="bg-linear-to-br from-black to-gray-800 p-6 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
      {/* Rating Stars - Yellow for filled, white border for empty */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/50'}
            size={18}
          />
        ))}
      </div>
      
      {/* Review Comment */}
      <p className="text-gray-200 text-sm mb-4 line-clamp-3">
        "{review.comment}"
      </p>
      
      {/* Customer Info */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-white text-sm">{review.customerName}</p>
          <p className="text-xs text-gray-400">{review.date}</p>
        </div>
        {review.productName && (
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
            {review.productName}
          </span>
        )}
      </div>

      {/* Like/Dislike Buttons */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/10">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm transition-colors ${
            userAction === 'like' ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
          }`}
        >
          <FiThumbsUp size={16} />
          <span>{likes}</span>
        </button>
        
        <button 
          onClick={handleDislike}
          className={`flex items-center gap-2 text-sm transition-colors ${
            userAction === 'dislike' ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <FiThumbsDown size={16} />
          <span>{dislikes}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;