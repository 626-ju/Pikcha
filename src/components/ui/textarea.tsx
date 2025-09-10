import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  hasError?: boolean;
}

function Textarea({ hasError, ...props }: TextareaProps) {
  return (
    <div
      className={cn(
        'bg-black-353542 light:bg-gray-300',
        'relative rounded-[8px] p-[1px]',
        'focus-within:bg-main-gradation',
        hasError ? 'bg-red-ff0000 focus-within:bg-red-ff0000' : '',
        'transition-all duration-300',
        'w-[295px] md:w-[510px] xl:w-[540px]',
      )}
    >
      <div
        className={cn(
          // Border
          'rounded-[8px]',

          // Background & Text
          'bg-black-252530 light:bg-white',
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
