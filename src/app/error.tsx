'use client';

//이게 좀 헷갈리는 게
//1.서버액션에서 에러 발생 ->  throw된 에러를 넥스트 자체 ErrorBoundary가 error.tsx파일로 error랑 reset을 넣어주고요
//2.제가 사용한 useErrorBoundary훅으로 잡은 에러는 react-error-boundary의 에러바운더리에서 잡힙니다.
//2번의 경우 에러가 발생할 수 있는 컴포넌트를 <ErrorBoundary FallbackComponent={}> 형태로 감싸게 되는데
//이때 FallbackComponent로 오는 ErrorFallback이 쓰이기 때문에 타입이 다르게 들어올 거라고 생각했어요 ->(이 컴포넌트를 종류가 다른 두 에러바운더리에서 사용한다는 말)
//-> 그래서 아래와 같이 확장하고 reset이 있으면 reset을 쓰고 resetErrorBoundary가 있으면 이걸 쓰는 식으로 짰습니다.

import React, { startTransition } from 'react';

import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';

interface Props extends Partial<FallbackProps> {
  error: Error; //-> 서버액션에서의 에러 발생은 Error타입
  // //리액트 에러바운더리의 에러발생은 any로 정의되어 있기는 한데 애초에 서버액션에서 throw한 에러가
  // 서버액션 호출부의 try/catch에서 걸리고 showBoundary를 통해 넘어오니까 무조건 Error타입(throw new Error(에러 생성자로 던져준 거니까)
  //Error는 js전역 내장 타입이니까 임포트x
  reset?: () => void;
  className?: string;
}

const ErrorFallback = ({ error, reset, resetErrorBoundary }: Props) => {
  const router = useRouter();

  const userErrMsg = errMap[error.message] || '에러가 발생했습니다';

  return (
    <div className='w-full'>
      <div className={cn('m-auto max-w-[640px]', reset && 'mt-80')}>
        <div className='text-mogazoa-24px-600 mb-10 text-center'>{userErrMsg}</div>

        {reset ? (
          <Button className='mb-6' onClick={() => router.back()}>
            이전 페이지로 돌아가기
          </Button>
        ) : null}
        <Button
          variant='tertiary'
          onClick={() => {
            //router.refresh가 비동기로 동작하니까 리셋이 먼저 실행되는 거 방지용
            //우선 순위 낮게 가져간 후 refresh와 reset 일괄적으로 처리
            startTransition(() => {
              router.refresh(); //rsc페이로드 다시 가져오기
              if (reset) reset(); //넥스트의 에러바운더리가 디폴트로 내려주는 함수
              if (resetErrorBoundary) resetErrorBoundary(); // react-error-boundary 디폴트로 내려주는 함수
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
  'fetch failed': '페이지를 불러오는데 실패했습니다 잠시 후 다시 시도해주세요',
  'Validation Failed': '입력값이 잘못되었습니다',
  'jwt malformed': `로그인이 필요합니다`,
  'invalid token': `권한이 없습니다`,
  404: `존재하지 않는 페이지입니다`,
  '이미 사용중인 닉네임입니다.': '이미 사용중인 닉네임입니다',
  '이미 존재하는 상품명입니다.': '이미 존재하는 영화명입니다',
  '유저를 찾을 수 없습니다.': '존재하지 않는 유저입니다',
  '상품을 찾을 수 없습니다.': '상품을 찾을 수 없습니다',
  '예고편이 존재하지 않습니다': '예고편이 존재하지 않습니다',
};
