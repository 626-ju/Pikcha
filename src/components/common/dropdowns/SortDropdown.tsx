'use client';

import { useMemo } from 'react';

import DropdownIcon from '@/assets/icon/Icon-dropdown.svg';
import DropupIcon from '@/assets/icon/Icon-dropup.svg';
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
  menuPosition = 'right',
  className,
  onChange,
  option,
}: {
  variant: 'product' | 'review' | 'user'; //product는 제품 sort / review는 리뷰 sort / user 는 유저페이지용
  menuPosition?: 'left' | 'right'; // 셀렉트박스(isOpen 하면 나오는 부분)의 정렬 방향
  className?: string; //트리거만 커스텀...
  onChange?: (value: string) => void; // 프롭을 string으로 받는 함수
  option?: string;
}) => {
  const getSortOption = () => {
    switch (variant) {
      case 'product':
        return SORT_OPTION_PRODUCTS;
      case 'review':
        return SORT_OPTION_REVIEWS;
      case 'user':
        return SORT_OPTION_USER_PAGE;
      default:
        return [];
    }
  };

  const sortOptions = useMemo(() => getSortOption(), [variant, getSortOption]);

  const displayValue =
    sortOptions.find((op) => op.value === option)?.name || sortOptions?.[0]?.name;

  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  const handleSelectValue = (op: Sort) => {
    onChange?.(op.value);
  };

  return (
    <button
      type='button'
      tabIndex={0}
      ref={dropdownRef}
      className={cn(
        'text-mogazoa-14px-400 xl:text-mogazoa-16px-400 relative flex shrink-0 items-center gap-[5px] p-0 transition-transform md:w-[140px] md:justify-between xl:w-[160px]',
        isOpen ? 'text-white-f1f1f5' : 'text-black-6e6e82',
        className,
      )}
      onClick={toggleDropdown}
    >
      {displayValue}
      {isOpen ? <DropupIcon /> : <DropdownIcon />}
      {isOpen && (
        <div
          className={cn(
            'bg-black-252530 border-black-353542 absolute top-10 z-50 flex w-[150px] flex-col gap-[10px] rounded-lg border-1 p-[10px] md:w-[200px]',
            menuPosition === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {getSortOption()?.map((op) => (
            <div
              key={op.value}
              role='button'
              onClick={() => handleSelectValue(op)}
              className='hover:bg-black-353542 text-mogazoa-14px-400 text-gray-6e6e82 hover:text-white-f1f1f5 xl:text-mogazoa-16px-400 flex w-full justify-start rounded-[6px] px-5 py-[6px]'
              tabIndex={0}
            >
              {op.name}
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default SortDropdown;
