'use client';

import CategoryDropdown from '@/components/common/dropdowns/CategoryDropdown';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import Button from '@/components/ui/Buttons';
import CategoryChip from '@/components/ui/chips/CategoryChip';
import CategoryFilterChip from '@/components/ui/chips/CategoryFilterChips';
import CompareChip from '@/components/ui/chips/CompareChip';
import RankingChip from '@/components/ui/chips/RankingChip';
import ThumbChip from '@/components/ui/chips/ThumbChip';
import FloatingButton from '@/components/ui/FloatingButton';
import { CATEGORY } from '@/constants/ProductsConst';

const arr = Array.from({ length: 5 }, (_, i) => i + 1);

/**
 * 좋아요 API 요청을 성공적으로 시뮬레이션하는 비동기 함수
 * 1초 후 성공적으로 응답합니다.
 */
export const mockThumbsUpSuccess = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API 호출 성공: 좋아요 업데이트 완료');
      resolve();
    }, 1000);
  });
};

/**
 * 좋아요 API 요청이 실패하는 것을 시뮬레이션하는 비동기 함수
 * 1초 후 에러를 반환합니다.
 */
export const mockThumbsUpFailure = (): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.error('API 호출 실패: 네트워크 에러 또는 서버 오류');
      reject(new Error('서버 에러'));
    }, 1000);
  });
};

const Page = () => {
  return (
    <div className='mb-100 p-4'>
      <div className='flex flex-col gap-4'>
        <Button variant='primary' type='button'>
          Primary
        </Button>
        <Button variant='primary' type='button' disabled>
          Primary-disabled
        </Button>
        <Button variant='secondary' type='button'>
          Secondary
        </Button>
        <Button variant='secondary' type='button' disabled>
          Secondary-disabled
        </Button>
        <Button variant='tertiary' type='button'>
          Tertiary
        </Button>
        <Button variant='tertiary' type='button' disabled>
          Tertiary-disabled
        </Button>
      </div>
      <div className='flex gap-2 py-4'>
        {CATEGORY.map((ca) => (
          <CategoryChip key={ca.id} id={ca.id} name={ca.name} />
        ))}
      </div>
      <div className='flex items-center gap-2 pb-4'>
        {arr.map((i, idx) => (
          <RankingChip key={i} idx={idx} />
        ))}
        <CompareChip variant='first' productName='영화무엇' />
        <CompareChip variant={'second'} productName={'영화 이것'} />
        <ThumbChip asyncAction={mockThumbsUpFailure} initialState={true} initialCount={20} />
        <ThumbChip asyncAction={mockThumbsUpSuccess} initialState={false} initialCount={24} />
      </div>
      <div className='flex'>
        <CategoryFilterChip name='카테고리' />
      </div>
      <div>
        <CategoryDropdown />
        <div className='flex justify-end gap-3'>
          <SortDropdown variant='product' />
          <SortDropdown variant='review' />
          {/* <SortDropdown variant='user' /> */}
        </div>
      </div>
      {/* <div className='text-5xl'>잠시 자리비움...</div> */}
      <FloatingButton />
    </div>
  );
};

export default Page;
