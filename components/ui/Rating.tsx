import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 transition-all duration-300 ${
            index < rating
              ? "fill-red-400 text-yellow-400 drop-shadow-sm"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
