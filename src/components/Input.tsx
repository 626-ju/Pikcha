import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

function Input({ className, type, id, label, errorMessage, ...props }: InputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  // 에러메시지가 있는지 확인하는 불리언 변수
  const hasError = !!errorMessage;

  return (
    <div className='flex flex-col gap-[10px] w-full'>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div
        className={cn(
          'relative w-full rounded-[8px]',
          'focus-within:border-transparent focus-within:bg-gradient-to-r p-[1px]',
          'focus-within:bg-main-gradation',
        )}
      >
        <input
          id={inputId}
          type={type}
          data-slot='input'
          className={cn(
            'bg-black-252530 text-base border-black-353542',
            hasError ? 'border-red-FF0000' : 'border-black-353542',
            'rounded-[8px] border outline-none',
            'flex h-[55px] md:h-[70px] w-full px-5 py-6',
            'disabled:pointer-events-none disabled:cursor-not-allowed',
            'aria-invalid:border-red-ff0000',
            'focus:border-none',
            className,
          )}
          aria-invalid={hasError}
          {...props}
        />
      </div>
      {errorMessage && <p className='text-sm text-red-ff0000'>{errorMessage}</p>}
    </div>
  );
}

export default Input;
