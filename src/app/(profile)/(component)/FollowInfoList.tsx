'use client';

import { useCallback, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useFetchUserList from '@/hooks/useFetchUserList';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useModalStore } from '@/store/modalStore';
import { FollowType, FollowUserInfo } from '@/types/profile/follow';

interface Props {
  type: FollowType;
}

const FollowInfoList = ({ type }: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);

  const { userList, isFetching, fetchFollowInfo, cursor } = useFetchUserList(type);

  const onIntersect = useCallback(() => {
    if (!isFetching && cursor !== null) fetchFollowInfo();
    // eslint-disable-next-line
  }, [cursor, isFetching]);

  useIntersectionObserver(loadMoreRef, cursor, onIntersect);

  if (!userList) return <h1>로딩 중...</h1>; //서스펜스나 스트리밍 쓰고 싶었는데 클라컴포에서 방법 없을까요?

  return (
    <ul className='scrollbar-hide flex h-[456px] flex-col gap-5 overflow-y-scroll xl:h-[514px]'>
      {userList?.length === 0 && <div>팔로워가 없어요 😥</div>}

      {userList?.map(({ id, nickname, image }: FollowUserInfo) => {
        return (
          <li key={id}>
            <Link href={`/user/${id}`} className='flex items-center gap-5' onClick={closeModal}>
              {/*추후 이미지로 변경*/}
              <div className='bg-gray-9fa6b2 relative h-12 w-12 rounded-full md:h-13 md:w-13'>
                <Image
                  src={image ?? '/images/default-profile.png'}
                  alt='프로필 이미지'
                  className='object-cover'
                  fill
                />
              </div>
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
