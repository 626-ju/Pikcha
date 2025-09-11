'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import SearchSuggestions from '@/components/common/gnb/searchForm/SearchSuggestions';
import CompareChip from '@/components/ui/chips/CompareChip';
import { useSuggestions } from '@/hooks/useSuggestions';
import { type ProductDetail } from '@/types/product/productType';

type SuggestionProduct = { id: number; name: string; categoryId: number };

interface CompareInputFieldProps {
  index: number;
  selectedProduct: ProductDetail | null;
  onProductSelect: (product: ProductDetail, index: number) => void;
  onProductRemove: (index: number) => void;
}

const NO_RESULT_DISPLAY_TIME = 3000;

const CompareInputField = ({
  index,
  selectedProduct,
  onProductSelect,
  onProductRemove,
}: CompareInputFieldProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);

  const suggestions = useSuggestions(query);

  const handleSuggestionSelect = async (suggestion: SuggestionProduct) => {
    try {
      const res = await fetch(`/api/products/batch?ids=${suggestion.id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: { list: ProductDetail[] } = await res.json();
      const productDetail = data.list?.[0];
      if (!productDetail) throw new Error('Not found');

      onProductSelect(productDetail, index);
      setQuery('');
      setOpen(false);
    } catch {
      toast.error('영화 정보를 불러올 수 없습니다.');
    }
  };

  return (
    <div className='w-full max-w-[335px] md:max-w-[280px] xl:max-w-[350px]'>
      <div className='relative'>
        <h2 className='text-mogazoa-16px-400 text-white-f1f1f5 pb-2.5'>영화 {index + 1}</h2>
        <div
          className={`bg-black-252530 light:bg-white border-black-353542 text-white-f1f1f5 flex w-full items-center rounded-lg border px-5 py-3 transition-all md:h-[55px] xl:h-[70px] ${
            isFocused && !selectedProduct ? 'ring-main-indigo ring-2' : ''
          }`}
        >
          {selectedProduct ? (
            <CompareChip
              variant={index === 0 ? 'first' : 'second'}
              productName={selectedProduct.name}
              onClick={() => onProductRemove(index)}
            />
          ) : (
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!open) setOpen(true);
                setShowNoResult(false);
              }}
              onFocus={() => {
                setOpen(true);
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim() && suggestions.length === 0) {
                  setShowNoResult(true);
                  setTimeout(() => setShowNoResult(false), NO_RESULT_DISPLAY_TIME);
                }
              }}
              placeholder='목록에서 영화를 선택하거나 검색하세요'
              className='placeholder:text-gray-6e6e82 w-full bg-transparent outline-none'
            />
          )}
        </div>
        {open && !selectedProduct && (
          <SearchSuggestions
            query={query}
            suggestions={suggestions}
            onSelect={(name) => {
              const suggestion = suggestions.find((s) => s.name === name);
              if (suggestion) {
                handleSuggestionSelect(suggestion);
              }
            }}
            onClose={() => setOpen(false)}
          />
        )}

        {showNoResult && (
          <div className='text-mogazoa-12px-300 text-red-ff0000 absolute top-full right-0 left-0 mt-1 p-3'>
            사이트에 등록된 영화만 비교할 수 있습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareInputField;
