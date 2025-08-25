import React from 'react';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  onClick,
  children = 'give me the children!',
  disabled,
}) => {
  const baseStyle =
    'text-mogazoa-16px-600 flex h-[50px] w-full max-w-[640px] items-center justify-center rounded-lg md:h-[55px] xl:h-[65px] ';

  const cursorAndHoverClasses = disabled
    ? 'cursor-not-allowed'
    : 'hover:opacity-70 hover:cursor-pointer active:opacity-50';

  let variantStyle;

  switch (variant) {
    case 'primary':
      variantStyle = `text-white-f1f1f5 disabled:text-gray-6e6e82 ${disabled ? 'bg-black-353542' : 'bg-main-gradation'}`;
      break;
    case 'secondary':
      variantStyle = `bg-black-1c1c2 ${disabled ? 'bg-black-353542' : 'bg-main-gradation'}`;
      break;
    case 'tertiary':
      variantStyle =
        'bg-black-1c1c22 text-gray-9fa6b2 border-gray-9fa6b2 disabled:border-black-353542 border-[1px] disabled:text-gray-6e6e82';
      break;
  }

  return (
    <>
      {variant === 'secondary' ? (
        <button
          className={cn(`p-[1.2px]`, baseStyle, variantStyle, cursorAndHoverClasses, className)}
          onClick={onClick}
          disabled={disabled}
        >
          <div className='bg-black-1c1c22 flex h-full w-full items-center justify-center rounded-lg'>
            <div className={`${disabled ? 'text-gray-6e6e82' : 'text-gradient'}`}>{children}</div>
          </div>
        </button>
      ) : (
        <button
          className={cn(baseStyle, variantStyle, cursorAndHoverClasses, className)}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
