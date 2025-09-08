import { Clapperboard } from 'lucide-react';

import ReturnToListButton from '@/components/common/ReturnToListButton';

const NoList = () => {
  return (
    <div className='flex items-center justify-center pt-40'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <Clapperboard className='text-black-2e2e3a mb-4 h-[100px] w-[100px]' />
        <h1 className='text-mogazoa-24px-600'>비교할 영화목록이 없습니다</h1>
        <p className='text-gray-6e6e82'>영화를 직접 검색하거나 목록에 추가해주세요</p>
        <ReturnToListButton />
      </div>
    </div>
  );
};

export default NoList;
