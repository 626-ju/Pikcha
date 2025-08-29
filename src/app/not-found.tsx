'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';

const ErrorFallback = ({}) => {
  const router = useRouter();

  return (
    <div className='w-full'>
      <div className={cn('m-auto mt-80 max-w-[640px]')}>
        <div className='text-mogazoa-24px-600 mb-10 text-center'>존재하지 않는 페이지입니다</div>

        <Button onClick={() => router.back()} className='mb-6'>
          이전 페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
