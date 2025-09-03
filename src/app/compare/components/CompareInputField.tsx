'use client';

import { useState } from 'react';

import { getProductDetail } from '@/actions/productDetail';
import SearchSuggestions from '@/components/common/gnb/searchForm/SearchSuggestions';
import CompareChip from '@/components/ui/chips/CompareChip';
import { useSuggestions } from '@/hooks/useSuggestions';
import { type Product } from '@/types/product/productType';

type SuggestionProduct = { id: number; name: string; categoryId: number };

interface CompareInputFieldProps {
  index: number;
  selectedProduct?: Product;
  onProductSelect: (product: Product) => void;
  onProductRemove: (productId: number) => void;
}

const CompareInputField = ({
  index,
  selectedProduct,
  onProductSelect,
  onProductRemove,
}: CompareInputFieldProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const suggestions = useSuggestions(query);

  const handleSuggestionSelect = async (suggestion: SuggestionProduct) => {
    try {
      const productDetail = await getProductDetail(suggestion.id);
      const product: Product = {
        id: productDetail.id,
        name: productDetail.name,
        categoryId: productDetail.categoryId,
        rating: productDetail.rating,
        reviewCount: productDetail.reviewCount,
        favoriteCount: productDetail.favoriteCount,
        image: productDetail.image,
        createdAt: productDetail.createdAt,
        updatedAt: productDetail.updatedAt,
        writerId: productDetail.writerId,
      };

      onProductSelect(product);
      setQuery('');
      setOpen(false);
    } catch (error) {
      console.error('상품 정보를 가져오는데 실패했습니다:', error);
    }
  };

  return (
    <div className='w-full max-w-[335px] md:max-w-[280px] xl:max-w-[350px]'>
      <div className='relative'>
        <h2 className='text-mogazoa-16px-400 text-white-f1f1f5 pb-2.5'>영화 {index + 1}</h2>
        <div className='bg-black-1c1c22 text-white-f1f1f5 flex w-full items-center rounded-lg px-5 py-3 md:h-[55px] xl:h-[70px]'>
          {selectedProduct ? (
            <CompareChip
              variant={index === 0 ? 'first' : 'second'}
              productName={selectedProduct.name}
              onClick={() => onProductRemove(selectedProduct.id)}
            />
          ) : (
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
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
      </div>
    </div>
  );
};

export default CompareInputField;
