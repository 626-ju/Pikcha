'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import getFollowee from '@/actions/profile/getFollowee';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useModalStore } from '@/store/modalStore';
import { FolloweeInfos, FollowerInfos } from '@/types/profile/follow';

interface Props {
  type: 'followers' | 'followees';
}

const FollowList = ({ type }: Props) => {
  const [userList, setUserList] = useState<FollowerInfos | FolloweeInfos>();
  const [cursor, setCursor] = useState<number | null>(0);
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const pop = useModalStore((state) => state.pop);

  const fetchFollowInfo = async (type: 'followers' | 'followees') => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getFollowee(type, cursor);

      setUserList((prev) => ({
        list: [...(prev?.list ?? []), ...data.list],
      }));

      //cursor 업데이트
      setCursor(data.nextCursor ?? null);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isFetching) return;
    fetchFollowInfo(type);
    // eslint-disable-next-line
  }, []);

  useIntersectionObserver(loadMoreRef, cursor, () => fetchFollowInfo(type));

  if (!userList) return <h1>로딩 중...</h1>; //서스펜스나 스트리밍 쓰고 싶었는데 클라컴포에서 방법 없을까요?

  return (
    <ul className='scrollbar-hide flex h-[550px] flex-col gap-5 overflow-y-scroll md:h-[600px] xl:h-[660px]'>
      {userList?.list?.length === 0 && <div>팔로워가 없어요 😥</div>}

      {userList?.list?.map((info, i) => {
        const user = 'follower' in info ? info.follower : info.followee;

        return (
          <Link key={info.id} href={`/user/${user.id}`} onClick={pop}>
            <li className='flex items-center gap-5'>
              {/*추후 이미지로 변경*/}
              <div className='bg-green-05d58b h-12 w-12 rounded-full md:h-13 md:w-13' />
              {user.nickname}
            </li>
            {cursor !== null && i === userList.list.length - 1 && (
              <>
                <div className='sr-only'>{cursor}</div>
                <div ref={loadMoreRef} className='h-[5px] w-1' />
              </>
            )}
          </Link>
        );
      })}
    </ul>
  );
};

export default FollowList;
