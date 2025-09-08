'use client';

import Link from 'next/link';

import { useCompareStore } from '@/store/compareStore';

const CompareButton = () => {
  const { compareList } = useCompareStore();
  const count = compareList.length;

  return (
    // 버튼 내 숫자 버전
    // <Link
    //   href='/compare'
    //   className='md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 whitespace-nowrap'
    // >
    //   비교하기 {count > 0 && `(${count})`}
    // </Link>

    // 버튼 위 숫자 버전
    <Link
      href='/compare'
      className='md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 relative whitespace-nowrap'
    >
      비교하기
      {count > 0 && (
        <span className='bg-main-gradation text-white-f1f1f5 text-mogazoa-10px-300 xl:text-mogazoa-12px-300 absolute -top-2.5 -right-3.5 flex h-3 w-3 items-center justify-center rounded-full xl:h-4 xl:w-4'>
          {count}
        </span>
      )}
    </Link>
  );
};
export default CompareButton;
