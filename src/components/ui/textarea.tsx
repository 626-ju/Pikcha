import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ ...props }: React.ComponentProps<'textarea'>) {
  return (
    <div
      className={cn(
        'relative rounded-[8px] p-[1px]',
        'focus-within:border-transparent focus-within:bg-gradient-to-r',
        'focus-within:bg-main-gradation',
        'transition-all duration-300',
        'w-[295px] md:w-[510px] xl:w-[540px]',
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
          'h-30 md:h-40',
        )}
      >
        <textarea
          data-slot='textarea'
          className={cn(
            'no-scrollbar w-full resize-none',
            'focus:ring-0 focus:outline-none',
            'w-full',
            'text-mogazoa-14px-400 xl:text-mogazoa-16px-400',
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { Textarea };
