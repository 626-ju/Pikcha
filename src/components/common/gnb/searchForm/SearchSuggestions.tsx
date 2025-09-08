'use client';

import { useEffect, useRef, useState } from 'react';

import CategoryChip from '@/components/ui/chips/CategoryChip';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useOnClickOutside(ref, () => {
    onClose();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!suggestions.length) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setIsKeyboardMode(true);
          setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setIsKeyboardMode(true);
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            onSelect(suggestions[selectedIndex].name);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [suggestions, selectedIndex, onSelect, onClose]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  if (!query || suggestions.length === 0) return null;

  return (
    <ul
      ref={ref}
      role='listbox'
      className='bg-black-252530 light:bg-white border-black-353542 absolute z-50 mt-1 w-full rounded-md border'
    >
      {suggestions.slice(0, 8).map((p, index) => (
        <li key={p.id}>
          <button
            role='option'
            aria-selected={selectedIndex === index}
            className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left ${
              selectedIndex === index ? 'bg-black-353542' : ''
            }`}
            onMouseEnter={() => {
              if (!isKeyboardMode) setSelectedIndex(index);
            }}
            onMouseMove={() => {
              setIsKeyboardMode(false);
              setSelectedIndex(index);
            }}
            onMouseLeave={() => setSelectedIndex(-1)}
            onClick={() => onSelect(p.name)}
          >
            <span>
              <Highlight text={p.name} query={query} />
            </span>
            <span>
              <CategoryChip category={{ id: p.categoryId, name: '' }} />
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
