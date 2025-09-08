'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useCompareStore } from '@/store/compareStore';

const CompareButton = () => {
  const { compareList } = useCompareStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(compareList.length);
  }, [compareList]);

  return (
    <Link
      href='/compare'
      className='md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 flex h-[70px] items-center px-2 whitespace-nowrap md:h-[80px] xl:h-[100px]'
    >
      비교하기
      {count > 0 && (
        <span className='bg-main-gradation text-white-f1f1f5 text-mogazoa-10px-300 xl:text-mogazoa-12px-300 ml-1 flex h-3 w-3 items-center justify-center rounded-full xl:h-4 xl:w-4'>
          {count}
        </span>
      )}
    </Link>
  );
};
export default CompareButton;
