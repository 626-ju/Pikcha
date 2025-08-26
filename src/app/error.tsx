'use client';

/*
->프롭으로 error객체 받으면 {error:Error,reset:()=>void} -> 에러메세지 보여줄 수도 있음
reset 서버 컴포(데이터패칭을) 다시 실행하진 않음 에러상태 초기화 및 렌더만 다시 
--> 리셋을 아예 새로고침 해버리거나(비추) 
router.refresh()(rsc 페이로드만 새로 받아오고)를 하고 reset()을 호출하는 게 좋음
✔그런데 문제는  router.refresh()는 비동기인데  await사용불가->reset()이 먼저 실행 
->> startTransition사용 (콜백으로 받는 함수 내부의 동작을 모두 일괄처리)

-->로딩처럼 하위경로에도 다 반영이 된다. 
혹시나 하위 경로에  개별적인 에러 컴포넌트가 필요하다??
->그냥 하위폴더(경로)에 error.tsx또 만들면 됨
*/

interface Props {
  error: Error;
  reset?: () => void;
  className?: string;
}

import React from 'react';

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
        <Button onClick={router.back} className='mb-6'>
          이전 페이지로 돌아가기
        </Button>
        <Button
          variant='tertiary'
          onClick={() => {
            router.refresh();
            reset && reset();
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
