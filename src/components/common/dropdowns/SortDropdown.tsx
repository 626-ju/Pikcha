'use client';

import { useState } from 'react';

import DropdownIcon from '@/../public/icon/Icon-dropdown.svg';
import DropupIcon from '@/../public/icon/Icon-dropup.svg';
import { Sort, SORT_OPTION_PRODUCTS, SORT_OPTION_REVIEWS } from '@/constants/ProductsConst';
import useDropdown from '@/hooks/useDropdown';
import { cn } from '@/lib/utils';

const SortDropdown = ({
  variant,
  className,
  onChange,
}: {
  variant: 'product' | 'review';
  className?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = useState<string | null>('최신순');
  const { isOpen, toggleDropdown, dropdwonRef } = useDropdown();

  const initialValue = value ? value : '카테고리 선택';

  const handleSelectValue = (op: Sort) => {
    setValue(op.name);
    onChange?.(op.value);
  };

  const getSortOption = () => {
    switch (variant) {
      case 'product':
        return SORT_OPTION_PRODUCTS;
        break;
      case 'review':
        return SORT_OPTION_REVIEWS;
        break;
    }
  };

  return (
    <div ref={dropdwonRef} className=''>
      <div
        onClick={toggleDropdown}
        className={cn(
          'text-mogazoa-14px-400 xl:text-mogazoa-16px-400 relative flex shrink-0 items-center gap-[5px] p-0 transition-transform md:w-[140px] md:justify-between xl:w-[160px]',
          isOpen ? 'text-white-f1f1f5' : 'text-black-6e6e82',
          className,
        )}
      >
        {initialValue}
        {isOpen ? <DropupIcon /> : <DropdownIcon />}
        {isOpen && (
          <div className='bg-black-252530 border-black-353542 absolute top-10 right-0 flex w-[150px] flex-col gap-[10px] rounded-lg border-1 p-[10px] md:w-[200px]'>
            {getSortOption().map((op) => (
              <button
                key={op.value}
                value={op.value}
                onClick={() => handleSelectValue(op)}
                className='hover:bg-black-353542 text-mogazoa-14px-400 text-gray-6e6e82 hover:text-white-f1f1f5 xl:text-mogazoa-16px-400 flex w-full justify-start rounded-[6px] px-5 py-[6px]'
              >
                {op.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
