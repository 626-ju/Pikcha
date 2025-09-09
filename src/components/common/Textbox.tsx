'use client';

import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';
import { truncated } from '@/lib/utils/truncated';

interface TextboxProps extends React.ComponentProps<'textarea'> {
  maxLength?: number;
  errorMessage?: string;
}

const Textbox = React.forwardRef<HTMLTextAreaElement, TextboxProps>(
  ({ maxLength = 300, errorMessage, ...props }, ref) => {
    const [count, setCount] = React.useState(props?.defaultValue?.toString().length ?? 0);

    const hasError = !!errorMessage;
    return (
      <>
        <div className='relative w-fit'>
          <Textarea
            ref={ref}
            spellCheck={false}
            hasError={hasError}
            {...props}
            onChange={(e) => {
              setCount(() => {
                e.target.value = truncated(e.target.value, maxLength);
                return e.target.value.length;
              });
              props.onChange?.(e);
            }}
          />

          {/* 글자수 카운트 */}
          <span className='text-gray-6e6e82 absolute right-3 bottom-2 text-xs'>
            {count}/{maxLength}자
          </span>
        </div>
      </>
    );
  },
);

Textbox.displayName = 'Textbox';
export default Textbox;
