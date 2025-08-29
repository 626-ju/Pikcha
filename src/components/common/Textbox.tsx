'use client';

import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';

interface TextboxProps extends React.ComponentProps<'textarea'> {
  maxLength?: number;
}

const Textbox = React.forwardRef<HTMLTextAreaElement, TextboxProps>(
  ({ maxLength = 300, ...props }, ref) => {
    const [count, setCount] = React.useState(props?.defaultValue?.toString().length ?? 0);

    return (
      <div className='relative w-fit'>
        <Textarea
          ref={ref}
          maxLength={maxLength}
          {...props}
          onChange={(e) => {
            setCount(e.target.value.length);
            props.onChange?.(e);
          }}
        />

        {/* 글자수 카운트 */}
        <span className='text-gray-6e6e82 absolute right-3 bottom-2 text-xs'>
          {count}/{maxLength}자
        </span>
      </div>
    );
  },
);

Textbox.displayName = 'Textbox';
export default Textbox;
