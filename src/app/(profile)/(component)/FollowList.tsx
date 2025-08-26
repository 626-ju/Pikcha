'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useModalStore } from '@/store/modalStore';
import { FolloweeInfos, FollowerInfos, FollowType } from '@/types/profile/follow';

interface Props {
  type: FollowType;
  fetchFollowInfo: (type: FollowType) => void;
  cursor: number | null;
  userList: FollowerInfos | FolloweeInfos | undefined;
  error: string | null;
}

const FollowList = ({ type, fetchFollowInfo, cursor, userList }: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const close = useModalStore((state) => state.close);

  useIntersectionObserver(loadMoreRef, cursor, () => fetchFollowInfo(type));

  if (!userList) return <h1>로딩 중...</h1>; //서스펜스나 스트리밍 쓰고 싶었는데 클라컴포에서 방법 없을까요?

  return (
    <ul className='scrollbar-hide flex h-[550px] flex-col gap-5 overflow-y-scroll md:h-[600px] xl:h-[660px]'>
      {userList?.list?.length === 0 && <div>팔로워가 없어요 😥</div>}

      {userList?.list?.map((info, i) => {
        const user = 'follower' in info ? info.follower : info.followee;

        return (
          <>
            <li>
              <Link
                key={info.id}
                href={`/user/${user.id}`}
                onClick={close}
                className='flex items-center gap-5'
              >
                {/*추후 이미지로 변경*/}
                <div className='bg-green-05d58b h-12 w-12 rounded-full md:h-13 md:w-13' />
                {user.nickname}
              </Link>
            </li>
            {cursor !== null && i === userList.list.length - 1 && (
              <>
                <div className='sr-only'>{cursor}</div>
                <div ref={loadMoreRef} className='h-[5px] w-1' />
              </>
            )}
          </>
        );
      })}
    </ul>
  );
};

export default FollowList;
