import { Star } from "lucide-react";

export default function StarRating({ rating, reviews, size = 14 }) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((i) => {
          const filled = rating >= i + 1;
          const half = !filled && rating > i && rating < i + 1;
          return (
            <span key={i} className="relative inline-flex">
              <Star size={size} className="text-gold-500/40" />
              {(filled || half) && (
                <Star
                  size={size}
                  className="absolute inset-0 fill-gold-500 text-gold-500"
                  style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                />
              )}
            </span>
          );
        })}
      </div>
      {reviews != null && (
        <span className="text-xs text-plum-500/70">({reviews})</span>
      )}
    </div>
  );
}
