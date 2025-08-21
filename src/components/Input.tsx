import * as React from 'react';

import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, errorMessage, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!errorMessage;
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className='flex flex-col gap-[10px] w-full'>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div
          className={cn(
            'relative w-full rounded-[8px]',
            'focus-within:border-transparent focus-within:bg-gradient-to-r p-[1px]',
            'focus-within:bg-main-gradation',
            'transition-all duration-700',
          )}
        >
          <input
            id={inputId}
            ref={ref} // RHF와 연결됨
            type={inputType}
            data-slot='input'
            className={cn(
              'bg-black-252530 text-mogazoa-14px-400 border-black-353542',
              hasError ? 'border-red-FF0000' : 'border-black-353542',
              'rounded-[8px] border outline-none',
              'flex h-[55px] xl:h-[70px] w-full px-5 py-6',
              'disabled:pointer-events-none disabled:cursor-not-allowed',
              'aria-invalid:border-red-ff0000',
              'focus:border-none',
              'transition-all duration-700',
              className,
            )}
            aria-invalid={hasError}
            {...props}
          />
          {type === 'password' && (
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-4 top-1/2 -translate-y-1/2'
            >
              <Image
                src={
                  showPassword
                    ? '/images/status=visibility_300.svg'
                    : '/images/status=visibility_off_300.svg'
                }
                alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
        {errorMessage && <p className='text-mogazoa-14px-400 text-red-ff0000'>{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
