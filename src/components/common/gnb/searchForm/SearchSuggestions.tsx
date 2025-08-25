'use client';

import { useRef } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { getCategoryName } from '@/lib/utils/categoryNameMap';

import Highlight from './Highlight';

const SearchSuggestions = ({
  query,
  suggestions,
  onSelect,
  onClose,
}: {
  query: string;
  suggestions: { id: number; name: string; categoryId: number }[];
  onSelect: (name: string) => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLUListElement | null>(null);

  useOnClickOutside(ref, () => {
    onClose();
  });

  if (!query || suggestions.length === 0) return null;

  return (
    <ul
      ref={ref}
      role='listbox'
      className='bg-black-252530 border-black-353542 absolute z-50 mt-1 w-full rounded-md border'
    >
      {suggestions.slice(0, 8).map((p) => (
        <li key={p.id}>
          <button
            // role='option'
            className='hover:bg-black-353542 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left hover:rounded-md'
            onClick={() => onSelect(p.name)}
          >
            <span>
              <Highlight text={p.name} query={query} />
            </span>
            <span className='bg-main-blue text-mogazoa-12px-400 ml-2 rounded px-2 py-0.5'>
              {/* 카테고리 이름 변경 */}
              {getCategoryName(p.categoryId)}
            </span>
          </button>
        </li>
      ))}
      <li>
        <button
          className='text-mogazoa-12px-300 text-gray-6e6e82 w-full cursor-pointer px-3 py-2 text-right hover:underline'
          onClick={onClose}
        >
          닫기
        </button>
      </li>
    </ul>
  );
};

export default SearchSuggestions;
