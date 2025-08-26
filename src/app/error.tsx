'use client';

interface Props {
  error: Error;
  reset?: () => void;
  className?: string;
}

import React, { startTransition } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';

const ErrorFallback = ({ error, reset, className }: Props) => {
  //디자인은 임시입니다.
  const router = useRouter();
  const userErrMsg = errMap[error.message] || '에러가 발생했습니다';

  return (
    <div className='w-full'>
      <div className={cn('m-auto mt-100 max-w-[640px]', className)}>
        <div className='text-mogazoa-24px-600 mb-10 text-center'>{userErrMsg}</div>
        <Button onClick={() => router.back()} className='mb-6'>
          이전 페이지로 돌아가기
        </Button>
        <Button
          variant='tertiary'
          onClick={() => {
            //router.refresh가 비동기로 동작하니까 리셋이 먼저 실행되는 거 방지용
            //우선 순위 낮게 가져간 후 refresh와 reset 일괄적으로 처리
            startTransition(() => {
              router.refresh(); //rsc페이로드 다시 가져오기
              reset?.(); //리셋이 있을 경우만 클라이언트 단에서는 error상태를 직접 관리하고 있을테니
            });
          }}
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;

const errMap: { [key: string]: string } = {
  401: `로그인이 필요합니다`,
  403: `권한이 없습니다 다시 로그인 해주세요`,
  404: `존재하지 않는 페이지입니다`,
  500: `페이지를 불러오는데 실패했습니다 잠시 후 다시 시도해주세요`,
};
