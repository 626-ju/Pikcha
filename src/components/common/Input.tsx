'use client';

import * as React from 'react';

import VisibilityIcon from '@/assets/icon/status=visibility_300.svg';
import VisibilityOffIcon from '@/assets/icon/status=visibility_off_300.svg';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
  hintMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, errorMessage, hintMessage, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!errorMessage;
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className='flex w-full flex-col gap-[10px]'>
        {/* h-[106px] xl:h-[126px]*/}
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className='relative'>
          <input
            id={inputId}
            ref={ref} // RHF와 연결됨
            type={inputType}
            data-slot='input'
            className={cn(
              'bg-black-252530 text-mogazoa-14px-400 border-black-353542',
              hasError ? 'border-red-FF0000' : 'border-black-353542',
              'rounded-[8px] border outline-none',
              'flex h-[55px] w-full py-6 pr-10 pl-5 xl:h-[70px]',
              'disabled:pointer-events-none disabled:cursor-not-allowed',
              'aria-invalid:border-red-ff0000',
              'focus:border-main-blue',
              'transition-all duration-200',
              'placeholder:text-gray-6e6e82',
              className,
            )}
            aria-invalid={hasError}
            {...props}
          />
          {type === 'password' && (
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer'
            >
              {showPassword ? (
                <VisibilityIcon className='h-6 w-6' aria-label='비밀번호 숨기기' />
              ) : (
                <VisibilityOffIcon className='h-6 w-6' aria-label='비밀번호 보기' />
              )}
            </button>
          )}
        </div>
        {errorMessage ? (
          <p className='text-sm text-red-500'>{errorMessage}</p>
        ) : (
          <p className='text-gray-6e6e82 text-sm'>{hintMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
