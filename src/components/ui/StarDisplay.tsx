'use client';

import StarIcon from '@/assets/icon/Icon-star.svg';
import { cn } from '@/lib/utils';

interface StarDisplayProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StarDisplay = ({ rating, size = 'md', className }: StarDisplayProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center justify-center gap-0.5', className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= Math.round(rating);
        return (
          <StarIcon
            key={i}
            className={cn(
              sizeClasses[size],
              filled ? 'fill-yellow-ffc83c text-yellow-ffc83c' : 'fill-gray-400 text-gray-400',
            )}
          />
        );
      })}
    </div>
  );
};

export default StarDisplay;
