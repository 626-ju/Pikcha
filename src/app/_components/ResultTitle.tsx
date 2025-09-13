import { getCategoryName } from '@/lib/utils/categoryNameMap';

interface ResultTitleProps {
  q?: string;
  category: number | null;
}

const ResultTitle = ({ q, category }: ResultTitleProps) => {
  if (q && category !== null) {
    return (
      <h2 className='text-mogazoa-24px-600 md:pt-[35px]'>
        <span className='text-main-blue'>{getCategoryName(category)}</span> 내{' '}
        <span className='text-gradient'>&apos;{q}&apos;</span> 를(을) 검색한 결과입니다
      </h2>
    );
  }
  if (q) {
    return (
      <h2 className='text-mogazoa-24px-600 md:pt-[35px]'>
        <span className='text-gradient'>&apos;{q}&apos;</span> 를(을) 검색한 결과입니다
      </h2>
    );
  }
  if (category !== null) {
    return (
      <h2 className='text-mogazoa-24px-600 md:pt-[35px]'>
        <span className='text-main-blue'>{getCategoryName(category)}</span> 내 영화목록입니다
      </h2>
    );
  }
  return null;
};

export default ResultTitle;
