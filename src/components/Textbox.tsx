'use client';

import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';

interface TextboxProps extends React.ComponentProps<'textarea'> {
  maxLength?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Textbox = React.forwardRef<HTMLTextAreaElement, TextboxProps>(
  ({ maxLength = 300, size = 'sm', ...props }, ref) => {
    const [count, setCount] = React.useState(0);

    return (
      <div className='relative w-fit'>
        <Textarea
          ref={ref}
          size={size}
          maxLength={maxLength}
          onChange={(e) => {
            setCount(e.target.value.length);
          }}
          {...props}
        />

        {/* 글자수 카운트 */}
        <span className='absolute bottom-2 right-3 text-xs text-gray-6e6e82'>
          {count}/{maxLength}자
        </span>
      </div>
    );
  },
);

Textbox.displayName = 'Textbox';
export default Textbox;
