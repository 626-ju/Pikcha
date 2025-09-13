'use client';

import { useState } from 'react';

import DropdownIcon from '@/assets/icon/Icon-dropdown.svg';
import DropupIcon from '@/assets/icon/Icon-dropup.svg';
import { Category } from '@/constants/ProductsConst';
import useDropdown from '@/hooks/useDropdown';
import { cn } from '@/lib/utils';
import { categoryArray, getCategoryName } from '@/lib/utils/categoryNameMap';

export const CategoryDropdown = ({
  onChange,
  currentValue,
  hasError,
}: {
  onChange?: (id: number) => void;
  currentValue: number | undefined;
  hasError?: string | undefined;
}) => {
  // onChange = 프롭을 number로 받는 함수
  const [value, setValue] = useState<string | null>(null);
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  const initialValue = () => {
    if (currentValue) return getCategoryName(currentValue);
    if (value) return value;
    return '카테고리 선택';
  };

  const handleSelectValue = (ca: Category) => {
    setValue(ca.name);
    onChange?.(ca.id);
  };

  return (
    <button
      type='button'
      tabIndex={0}
      ref={dropdownRef}
      className={`bg-black-353542 ${hasError ? 'bg-red-ff0000' : 'focus:bg-main-gradation hover:bg-main-gradation'} text-mogazoa-14px-400 relative flex h-[55px] w-full items-center justify-center rounded-[8px] p-[1.2px] md:h-[60px] xl:h-[70px]`}
      onClick={toggleDropdown}
    >
      <div
        className={cn(
          'bg-black-252530 flex h-full w-full items-center justify-between rounded-[8px] px-5 py-[17px]',
          isOpen ? 'text-white-f1f1f5' : 'text-black-6e6e82',
        )}
      >
        {initialValue()}
        {isOpen ? <DropupIcon /> : <DropdownIcon />}
      </div>
      {isOpen && (
        <div className='bg-black-252530 no-scrollbar border-black-353542 absolute top-[60px] left-0 z-50 flex max-h-[250px] w-full flex-col gap-2 overflow-y-auto rounded-lg border-1 p-[10px] md:top-[65px] xl:top-[75px]'>
          {categoryArray.map((ca) => (
            <div
              key={ca.id}
              role='button'
              tabIndex={0}
              className='hover:bg-black-353542 text-mogazoa-14px-400 text-gray-6e6e82 hover:text-white-f1f1f5 xl:text-mogazoa-16px-400 flex w-full justify-start rounded-[6px] px-5 py-[6px]'
              onClick={() => handleSelectValue(ca)}
            >
              {ca.name}
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default CategoryDropdown;
