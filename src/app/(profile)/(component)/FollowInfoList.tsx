'use client';

import { useCallback, useRef } from 'react';

import Link from 'next/link';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useModalStore } from '@/store/modalStore';
import { FollowUserInfo } from '@/types/profile/follow';

interface Props {
  fetchFollowInfo: () => void;
  cursor: number | null;
  userList: FollowUserInfo[] | undefined;
  error: string | null;
  isFetching: boolean;
}

const FollowInfoList = ({ fetchFollowInfo, cursor, isFetching, userList }: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const close = useModalStore((state) => state.close);

  const onIntersect = useCallback(() => {
    if (!isFetching && cursor !== null) fetchFollowInfo();
  }, [cursor]);

  useIntersectionObserver(loadMoreRef, cursor, onIntersect);

  if (!userList) return <h1>로딩 중...</h1>; //서스펜스나 스트리밍 쓰고 싶었는데 클라컴포에서 방법 없을까요?

  return (
    <ul className='scrollbar-hide flex h-[456px] flex-col gap-5 overflow-y-scroll xl:h-[514px]'>
      {userList?.length === 0 && <div>팔로워가 없어요 😥</div>}

      {userList?.map(({ id, nickname }: FollowUserInfo) => {
        return (
          <li key={id}>
            <Link href={`/user/${id}`} onClick={close} className='flex items-center gap-5'>
              {/*추후 이미지로 변경*/}
              <div className='bg-green-05d58b h-12 w-12 rounded-full md:h-13 md:w-13' />
              {nickname}
            </Link>
          </li>
        );
      })}
      {cursor !== null && <div key={'observerRef'} ref={loadMoreRef} className='h-[5px] w-4' />}
    </ul>
  );
};

export default FollowInfoList;
