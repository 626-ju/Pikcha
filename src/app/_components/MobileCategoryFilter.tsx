'use client';

import { useSearchParams } from 'next/navigation';

import CategoryModal from '@/app/_components/CategoryModal';
import { getCategoryName } from '@/lib/utils/categoryNameMap';
import { useModalStore } from '@/store/modalStore';

import CategoryFilterChip from '../../components/ui/chips/CategoryFilterChips';

interface MobileCategoryFilterProps {
  className?: string;
}

const MobileCategoryFilter = ({ className }: MobileCategoryFilterProps) => {
  const { open } = useModalStore();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('categoryId')
    ? Number(searchParams.get('categoryId'))
    : null;

  const displayName = selectedCategory ? getCategoryName(selectedCategory, '알 수 없음') : '전체';

  const handleClick = () => {
    open({
      component: CategoryModal,
      props: {},
    });
  };

  return <CategoryFilterChip name={displayName} className={className} onClick={handleClick} />;
};

export default MobileCategoryFilter;
