import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  size?: 'sm' | 'md' | 'lg';
}

function Textarea({ className, size = 'sm', ...props }: TextareaProps) {
  const wrapperSize = {
    sm: 'w-[295px] h-[120px]',
    md: 'w-[360px] h-[120px]',
    lg: 'w-[400px] h-[128px]',
  };

  const innerSize = {
    sm: 'w-[293px] h-[118px]', // 2px 작게
    md: 'w-[358px] h-[118px]',
    lg: 'w-[398px] h-[126px]',
  };

  return (
    <div
      className={cn(
        'flex justify-center items-center',
        'relative rounded-[8px]',
        'focus-within:border-transparent focus-within:bg-gradient-to-r p-[1px]',
        'focus-within:bg-main-gradation',
        'transition-all duration-700',
        wrapperSize[size], // wrapper 크기
      )}
    >
      <textarea
        data-slot='textarea'
        className={cn(
          // Border
          'border-black-353542 rounded-[8px] border',
          'focus:border-black-353542',
          'focus:ring-0 focus:outline-none',

          // Background & Text
          'bg-black-252530 dark:bg-input/30',
          'text-base placeholder:text-gray-6e6e82',

          // Layout & Sizing
          'flex field-sizing-content p-5',
          innerSize[size], // inner 크기
          'md:text-mogazoa-16px-400',
          'resize-none',
          'no-scrollbar',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
