'use client';

import { useCompareController } from '@/hooks/useCompareController';
import { useCompareStore } from '@/store/compareStore';
import { type Product } from '@/types/product/productType';

import CompareGrid from './components/CompareGrid';
import CompareInput from './components/CompareInput';
import CompareResult from './components/CompareResult';
import CompareToolbar from './components/CompareToolbar';
import NoList from './components/NoList';

const ComparePage = () => {
  const { compareList, removeProduct, clearCompareList } = useCompareStore();

  const {
    mode,
    selectedIds,
    selectedDeleteIds,
    handleCardSelect,
    handleProductRemoveFromSelected,
    handleCompare,
    backToBrowse,
    enterDeleteMode,
    exitDeleteMode,
    confirmDeleteSelected,
    clearAll,
  } = useCompareController({ compareList, removeProduct, clearCompareList });

  // 선택된 상품들을 배열로 변환
  const selectedProducts = compareList.filter((p) => selectedIds.has(p.id));
  const selectedDeleteProducts = compareList.filter((p) => selectedDeleteIds.has(p.id));

  // 비교목록이 비어있을 때
  if (compareList.length === 0) {
    return (
      <div className='container mx-auto px-4 py-[60px]'>
        <CompareInput
          selectedProducts={selectedProducts}
          onProductSelect={handleCardSelect}
          onProductRemove={handleProductRemoveFromSelected}
          onCompare={handleCompare}
        />
        <NoList />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-[60px]'>
      <CompareInput
        selectedProducts={selectedProducts}
        onProductSelect={handleCardSelect}
        onProductRemove={handleProductRemoveFromSelected}
        onCompare={handleCompare}
      />

      {mode !== 'compare' && (
        <CompareToolbar
          mode={mode}
          compareListLength={compareList.length}
          selectedDeleteCount={selectedDeleteProducts.length}
          onEnterDelete={enterDeleteMode}
          onExitDelete={exitDeleteMode}
          onConfirmDelete={confirmDeleteSelected}
          onClearAll={clearAll}
        />
      )}

      {/* 영화 비교 시 */}
      {mode === 'compare' && selectedProducts.length === 2 ? (
        <CompareResult
          products={selectedProducts as [Product, Product]}
          onBackToSelection={backToBrowse}
        />
      ) : (
        <CompareGrid
          list={compareList}
          isSelected={(product) =>
            mode === 'delete' ? selectedDeleteIds.has(product.id) : selectedIds.has(product.id)
          }
          onSelect={handleCardSelect}
        />
      )}
    </div>
  );
};

export default ComparePage;
