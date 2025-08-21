import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

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
          'focus-within:[background-image:var(--color-main-gradation)]',
        )}
      >
        <input
          id={inputId}
          type={type}
          data-slot='input'
          className={cn(
            'bg-black-252530 text-base border-[var(--color-black-353542)]',
            hasError ? 'border-[var(--color-red-FF0000)]' : 'border-[var(--color-black-353542)]',
            'rounded-[8px] border outline-none',
            'flex h-[55px] md:h-[70px] w-full px-5 py-6',
            'disabled:pointer-events-none disabled:cursor-not-allowed',
            'aria-invalid:border-red-FF0000',
            'focus:border-none',
            className,
          )}
          aria-invalid={hasError} // ✅ 에러메시지가 있을 때 aria-invalid 속성을 true로 설정
          {...props}
        />
      </div>
      {errorMessage && <p className='text-sm text-[var(--color-red-FF0000)]'>{errorMessage}</p>}
    </div>
  );
}

export default Input;
