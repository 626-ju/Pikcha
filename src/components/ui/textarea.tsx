import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  size?: 'sm' | 'md' | 'lg';
}

function Textarea({ className, size = 'sm', ...props }: TextareaProps) {
  const sizeMap = {
    sm: {
      border: 'w-[295px] h-[120px]',
      inner: 'w-[293px] h-[118px]',
      textbox: 'h-[80px]',
    },
    md: {
      border: 'w-[360px] h-[120px]',
      inner: 'w-[358px] h-[118px]',
      textbox: 'h-[80px]',
    },
    lg: {
      border: 'w-[400px] h-[128px]',
      inner: 'w-[398px] h-[126px]',
      textbox: 'h-[90px]',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={cn(
        'relative rounded-[8px] p-[1px]',
        'focus-within:border-transparent focus-within:bg-gradient-to-r',
        'focus-within:bg-main-gradation',
        'transition-all duration-700',
        currentSize.border,
      )}
    >
      <div
        className={cn(
          // Border
          'border-black-353542 rounded-[8px] border',
          'focus:border-black-353542 focus:ring-0 focus:outline-none',

          // Background & Text
          'bg-black-252530 dark:bg-input/30',
          'placeholder:text-gray-6e6e82 text-base',

          // Layout & Sizing
          'flex field-sizing-content p-5',
          currentSize.inner,
        )}
      >
        <textarea
          data-slot='textarea'
          className={cn(
            'no-scrollbar w-full resize-none',
            'focus:ring-0 focus:outline-none',
            currentSize.textbox,
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { Textarea };
