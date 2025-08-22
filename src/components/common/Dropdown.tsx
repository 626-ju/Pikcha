'use client';

import { useState } from 'react';

import DropdownIcon from '@/../public/icon/Icon-dropdown.svg';
import DropupIcon from '@/../public/icon/Icon-dropup.svg';
import useDropdown from '@/hooks/useDropdown';
import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
}

const CATEGORY: Category[] = [
  { id: 1, name: '카테고리1' },
  { id: 2, name: '카테고리2' },
  { id: 3, name: '카테고리3' },
  { id: 4, name: '카테고리4' },
  { id: 5, name: '카테고리5' },
  { id: 6, name: '카테고리6' },
  { id: 7, name: '카테고리7' },
];

export const CategoryDropdown = () => {
  const [value, setValue] = useState<string | null>(null);
  const { isOpen, closeDropdown, toggleDropdown, dropdwonRef } = useDropdown();

  const initialValue = value ? value : '카테고리 선택';

  const handleSelectValue = (name: string) => {
    setValue(name);
    closeDropdown();
  };

  return (
    <div ref={dropdwonRef} className='relative'>
      <div
        onClick={toggleDropdown}
        tabIndex={0}
        className='bg-black-353542 focus:bg-main-gradation hover:bg-main-gradation text-mogazoa-14px-400 flex h-[55px] w-[295px] items-center justify-center rounded-[8px] p-[1.2px] md:h-[60px] md:w-90 xl:h-[70px]'
      >
        <div
          className={cn(
            'bg-black-252530 flex h-full w-full items-center justify-between rounded-[8px] px-5 py-[17px]',
            isOpen ? 'text-white-f1f1f5' : 'text-black-6e6e82',
          )}
        >
          {initialValue}
          {isOpen ? <DropupIcon /> : <DropdownIcon />}
        </div>
      </div>
      {isOpen && (
        <div className='bg-black-252530 border-black-353542 absolute top-[60px] left-0 flex w-[295px] flex-col gap-[10px] rounded-lg border-1 p-[10px] md:w-90'>
          {CATEGORY.map((ca) => (
            <button
              key={ca.id}
              value={ca.name}
              onClick={() => handleSelectValue(ca.name)}
              className='hover:bg-black-353542 flex w-full justify-start rounded-[6px] px-5 py-[6px]'
            >
              {ca.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const SortDropdown = () => {
  const { isOpen, toggleDropdown, dropdwonRef } = useDropdown();

  return (
    <div ref={dropdwonRef}>
      <div onClick={toggleDropdown}>카테고리 선택</div>
      {isOpen && CATEGORY.map((ca) => <div key={ca.id}>{ca.name}</div>)}
    </div>
  );
};
