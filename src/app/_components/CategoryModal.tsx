'use client';

import { useSearchParams } from 'next/navigation';

import CategoryChip from '@/components/ui/chips/CategoryChip';
import { useCategoryNavigation } from '@/hooks/useCategoryNavigation';
import { cn } from '@/lib/utils';
import { CATEGORY_NAME_MAP } from '@/lib/utils/categoryNameMap';
import { useModalStore } from '@/store/modalStore';

const CategoryModal = () => {
  const { closeModal } = useModalStore();
  const { navigateToCategory } = useCategoryNavigation();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('categoryId')
    ? Number(searchParams.get('categoryId'))
    : null;

  const handleCategorySelect = (categoryId: number | null) => {
    navigateToCategory(categoryId);
    closeModal(); // 선택 후 모달 닫기
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={handleOverlayClick}
    >
      <div className='bg-black-1c1c22 relative w-[320px] max-w-[90vw] rounded-lg p-6'>
        {/* 헤더 */}
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-mogazoa-18px-600 text-white-f1f1f5'>카테고리 선택</h2>
          <button
            onClick={closeModal}
            className='text-gray-9fa6b2 hover:text-white-f1f1f5 text-xl transition-colors'
          >
            ×
          </button>
        </div>

        {/* 전체 카테고리 */}
        <div className='mb-4'>
          <button
            className={cn(
              'text-mogazoa-14px-400 w-full rounded-lg p-3 text-left transition-colors',
              selectedCategory === null
                ? 'bg-black-353542 text-white-f1f1f5'
                : 'text-gray-9fa6b2 hover:bg-black-2e2e3a',
            )}
            onClick={() => handleCategorySelect(null)}
          >
            전체 카테고리
          </button>
        </div>

        {/* 카테고리 목록 */}
        <div className='space-y-2'>
          {Object.entries(CATEGORY_NAME_MAP).map(([id, name]) => {
            const numId = Number(id);
            const isSelected = selectedCategory === numId;

            return (
              <button
                key={id}
                className={cn(
                  'text-mogazoa-14px-400 w-full rounded-lg p-3 text-left transition-colors',
                  isSelected
                    ? 'bg-black-353542 text-white-f1f1f5'
                    : 'text-gray-9fa6b2 hover:bg-black-2e2e3a',
                )}
                onClick={() => handleCategorySelect(numId)}
              >
                <div className='flex items-center justify-between'>
                  <span>{name}</span>
                  <CategoryChip category={{ id: numId, name }} className='pointer-events-none' />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
