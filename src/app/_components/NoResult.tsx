import { Clapperboard } from 'lucide-react';

import ReturnToListButton from '@/components/common/ReturnToListButton';

const NoResult = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-start gap-3 pt-[20vh]'>
      <Clapperboard className='text-black-2e2e3a h-[100px] w-[100px]' />
      <h2 className='text-mogazoa-18px-400 text-white-f1f1f5 light:text-gray-6e6e82'>
        검색 결과가 없습니다
      </h2>
      <ReturnToListButton />
    </div>
  );
};

export default NoResult;
