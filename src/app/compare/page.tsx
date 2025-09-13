'use client';

import { useMemo } from 'react';

import { useCompareController } from '@/hooks/useCompareController';
import { useCompareProducts } from '@/hooks/useCompareProducts';
import { useCompareStore } from '@/store/compareStore';

import CompareGrid from './components/CompareGrid';
import CompareInput from './components/CompareInput';
import CompareResult from './components/CompareResult';
import CompareToolbar from './components/CompareToolbar';
import NoList from './components/NoList';

const CONTAINER_CLASS = 'container mx-auto md:px-4 xl:px-30 py-[60px]';
const TEXT_CENTER_CLASS = 'text-center';

const ComparePage = () => {
  const { compareList, removeProduct, clearCompareList } = useCompareStore();
  const { products: compareProducts, loading, error } = useCompareProducts(compareList);

  const {
    mode,
    selectedIds,
    selectedDeleteIds,
    selectedProducts,
    comparePair,
    handleCardSelect,
    handleInputSelect,
    handleSlotRemove,
    handleCompare,
    backToBrowse,
    enterDeleteMode,
    exitDeleteMode,
    confirmDeleteSelected,
    openClearAllModal,
  } = useCompareController({ compareList, removeProduct, clearCompareList, compareProducts });

  const selectedDeleteProducts = useMemo(
    () => compareProducts.filter((p) => selectedDeleteIds.includes(p.id)),
    [compareProducts, selectedDeleteIds],
  );

  // 로딩 상태
  if (loading) {
    return (
      <div className={CONTAINER_CLASS}>
        <div className={TEXT_CENTER_CLASS}>
          <p className='text-gray-9fa6b2'>영화 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={CONTAINER_CLASS}>
        <div className={TEXT_CENTER_CLASS}>
          <p className='mb-4 text-red-400'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='text-main-indigo hover:underline'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 비교목록이 비어있을 때
  if (compareList.length === 0) {
    return (
      <div className={CONTAINER_CLASS}>
        <CompareInput
          selectedProducts={selectedProducts}
          onProductSelect={handleInputSelect}
          onProductRemove={handleSlotRemove}
          onCompare={handleCompare}
          isCompareEnabled={!!comparePair}
        />
        <NoList />
      </div>
    );
  }

  // 비교 모드일 때
  if (mode === 'compare' && comparePair) {
    return (
      <div className='px-4 py-[60px] md:min-w-[800px] md:px-10 xl:px-30'>
        <CompareResult products={comparePair} onBackToSelection={backToBrowse} />
      </div>
    );
  }

  return (
    <div className={CONTAINER_CLASS}>
      <CompareInput
        selectedProducts={selectedProducts}
        onProductSelect={handleInputSelect}
        onProductRemove={handleSlotRemove}
        onCompare={handleCompare}
        isCompareEnabled={!!comparePair}
      />

      {mode !== 'compare' && (
        <div className='flex w-auto items-center justify-between'>
          {mode === 'delete' && (
            <p className='text-main-blue text-mogazoa-14px-300 md:text-mogazoa-16px-400 py-3 pl-2 md:pl-16'>
              삭제할 영화를 선택해주세요
            </p>
          )}
          <div className={mode === 'delete' ? '' : 'ml-auto'}>
            <CompareToolbar
              mode={mode}
              compareListLength={compareList.length}
              selectedDeleteCount={selectedDeleteProducts.length}
              onEnterDelete={enterDeleteMode}
              onExitDelete={exitDeleteMode}
              onConfirmDelete={confirmDeleteSelected}
              onClearAll={openClearAllModal}
            />
          </div>
        </div>
      )}

      <CompareGrid
        list={compareProducts}
        isSelected={(product) =>
          mode === 'delete'
            ? selectedDeleteIds.includes(product.id)
            : selectedIds.includes(product.id)
        }
        onSelect={handleCardSelect}
      />
    </div>
  );
};

export default ComparePage;
