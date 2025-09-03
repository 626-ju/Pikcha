import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

const NoResult = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-start gap-3 pt-[20vh]'>
      <Clapperboard className='text-black-2e2e3a h-[100px] w-[100px]' />
      <h2 className='text-mogazoa-18px-400 text-white-f1f1f5'>검색 결과가 없습니다</h2>
      <Link
        href={'/'}
        className='bg-main-gradation text-mogazoa-16px-300 inline-block self-center rounded-2xl px-6 py-2.5'
      >
        전체 인기 목록 보기
      </Link>
    </div>
  );
};

export default NoResult;
