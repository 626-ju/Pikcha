import { getCategoryName } from '@/lib/utils/categoryNameMap';

interface ResultTitleProps {
  q?: string;
  category: number | null;
}

const ResultTitle = ({ q, category }: ResultTitleProps) => {
  if (q && category !== null) {
    return (
      <h2 className='mb-6 text-xl font-semibold'>
        <span className='text-main-blue'>{getCategoryName(category)}</span> 내{' '}
        <span className='text-gradient'>&apos;{q}&apos;</span>를(을) 검색한 결과입니다
      </h2>
    );
  }
  if (q) {
    return (
      <h2 className='mb-6 text-xl font-semibold'>
        <span className='text-gradient'>&apos;{q}&apos;</span>를(을) 검색한 결과입니다
      </h2>
    );
  }
  if (category !== null) {
    return (
      <h2 className='mb-6 text-xl font-semibold'>
        <span className='text-main-blue'>{getCategoryName(category)}</span> 내 상품목록입니다
      </h2>
    );
  }
  return null;
};

export default ResultTitle;
