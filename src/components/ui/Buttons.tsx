import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  onClick,
  children = '아이들을 주세요',
  disabled,
}) => {
  const baseStyle =
    'rounded-lg flex items-center text-mogazoa-16px-600 justify-center h-[50px] md:h-[55px] xl:h-[65px] w-full max-w-[640px] hover:cursor-pointer';

  let variantStyle;

  switch (variant) {
    case 'primary':
      variantStyle = `text-white-f1f1f5 ${disabled ? 'bg-black-353542 text-gray-6e6e82' : 'bg-main-gradation'}`;
      break;
    case 'secondary':
      variantStyle = `bg-black-1c1c2 ${disabled ? 'bg-black-353542' : 'bg-main-gradation'}`;
      break;
    case 'tertiary':
      variantStyle =
        'bg-black-1c1c22 text-gray-9fa6b2 border-[1px] border-gray-9fa6b2 disabled:border-black-353542 disabled:text-gray-6e6e82';
      break;
  }

  const allClassName = `${baseStyle} ${variantStyle} ${className || ''}`;
  //tailwind merge 를 쓸까여 cn 을 쓸까여 둘 다 쓸까요

  return (
    <>
      {variant === 'secondary' ? (
        <button className={`${allClassName} p-[1.2px]`}>
          <div className='bg-black-1c1c22 rounded-lg w-full h-full flex items-center justify-center'>
            <div className={`${disabled ? 'text-gray-6e6e82' : 'text-gradient'}`}>{children}</div>
          </div>
        </button>
      ) : (
        <button className={allClassName} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
