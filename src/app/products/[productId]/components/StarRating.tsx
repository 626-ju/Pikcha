'use client';

import { useState } from 'react';

import StarIcon from '@/assets/icon/Icon-star.svg';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const StarRating = ({ value = 0, onChange, className }: StarRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxRating = 5;

  return (
    <div
      className={cn(
        'border-black-1c1c22 flex w-38 items-center rounded-lg border-[1px] p-1',
        className,
      )}
    >
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const filled = hovered != null ? starValue <= hovered : starValue <= value;

        return (
          <button
            key={starValue}
            type='button'
            className='p-0.5'
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange?.(starValue)}
          >
            <StarIcon
              className={cn(
                'h-6 w-6 transition-colors',
                filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
