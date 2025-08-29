'use client';

import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';

interface TextboxProps extends React.ComponentProps<'textarea'> {
  maxLength?: number;
}

const truncated = (e: React.ChangeEvent<HTMLTextAreaElement>, maxLength: number) => {
  const chars = e.target.value;
  if (chars.length > maxLength) {
    e.target.value = chars.slice(0, maxLength);
  }

  return chars.slice(0, maxLength).length;
};

const Textbox = React.forwardRef<HTMLTextAreaElement, TextboxProps>(
  ({ maxLength = 300, ...props }, ref) => {
    const [count, setCount] = React.useState(props?.defaultValue?.toString().length ?? 0);

    return (
      <div className='relative w-fit'>
        <Textarea
          ref={ref}
          spellCheck={false}
          {...props}
          onChange={(e) => {
            setCount(truncated(e, 100));
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
