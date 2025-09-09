'use client';

import { useCallback, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useFetchUserList from '@/hooks/useFetchUserList';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useModalStore } from '@/store/modalStore';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FollowType, FollowUserInfo } from '@/types/profile/follow';

interface Props {
  type: FollowType;
}

const FollowInfoList = ({ type }: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const userid = useUserInfoStore((state) => state.userid);

  const { userList, isFetching, fetchFollowInfo, cursor } = useFetchUserList(type, userid);

  const onIntersect = useCallback(() => {
    if (!isFetching && cursor !== null) fetchFollowInfo();
    // eslint-disable-next-line
  }, [cursor, isFetching]);

  useIntersectionObserver(loadMoreRef, cursor, onIntersect);

  return (
    <ul className='scrollbar-hide flex h-[456px] flex-col gap-5 overflow-y-scroll xl:h-[514px]'>
      {userList?.length === 0 && getEmptyMsg(type)}

      {userList?.map(({ id, nickname, image }: FollowUserInfo) => {
        return (
          <li key={id}>
            <Link href={`/user/${id}`} className='flex items-center gap-5' onClick={closeModal}>
              <div className='bg-gray-9fa6b2 relative h-12 w-12 overflow-hidden rounded-full md:h-13 md:w-13'>
                <Image
                  src={image ?? '/images/default-profile.png'}
                  alt='프로필 이미지'
                  className='rounded-full'
                  sizes='(max-width: 768px) 48px, 52px'
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

const getEmptyMsg = (type: FollowType) =>
  type === 'followers' ? <li>팔로워가 없어요 😥</li> : <li>팔로우 해보세요! 😘</li>;
