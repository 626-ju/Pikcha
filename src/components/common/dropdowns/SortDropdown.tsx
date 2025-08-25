'use client';

import { useState } from 'react';

import DropdownIcon from '@/../public/icon/Icon-dropdown.svg';
import DropupIcon from '@/../public/icon/Icon-dropup.svg';
import {
  Sort,
  SORT_OPTION_PRODUCTS,
  SORT_OPTION_REVIEWS,
  SORT_OPTION_USER_PAGE,
} from '@/constants/ProductsConst';
import useDropdown from '@/hooks/useDropdown';
import { cn } from '@/lib/utils';

const SortDropdown = ({
  variant,
  selectbox = 'right',
  className,
  onChange,
}: {
  variant: 'product' | 'review' | 'user'; //product는 제품 sort / review는 리뷰 sort / user 는 유저페이지용
  selectbox?: 'left' | 'right';
  className?: string; //트리거만 커스텀...
  onChange?: (value: string) => void;
}) => {
  const getSortOption = () => {
    switch (variant) {
      case 'product':
        return SORT_OPTION_PRODUCTS;
        break;
      case 'review':
        return SORT_OPTION_REVIEWS;
        break;
      case 'user':
        return SORT_OPTION_USER_PAGE;
    }
  };

  const [value, setValue] = useState<string | undefined>(() => getSortOption()?.[0].name); // 초기값으로 옵션의 0번 인덱스 name
  const { isOpen, toggleDropdown, dropdwonRef } = useDropdown();

  const handleSelectValue = (op: Sort) => {
    setValue(op.name);
    onChange?.(op.value);
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
        {value}
        {isOpen ? <DropupIcon /> : <DropdownIcon />}
        {isOpen && (
          <div
            className={cn(
              'bg-black-252530 border-black-353542 absolute top-10 flex w-[150px] flex-col gap-[10px] rounded-lg border-1 p-[10px] md:w-[200px]',
              selectbox === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {getSortOption()?.map((op) => (
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
