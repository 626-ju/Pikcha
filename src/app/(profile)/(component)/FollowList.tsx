'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import getFollowInfo from '@/actions/profile/getFollowInfo';
import ErrorFallback from '@/app/error';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useModalStore } from '@/store/modalStore';
import { FolloweeInfos, FollowerInfos } from '@/types/profile/follow';

import LoadingFallback from '../loading';

interface Props {
  type: 'followers' | 'followees';
}

const FollowList = ({ type }: Props) => {
  const [userList, setUserList] = useState<FollowerInfos | FolloweeInfos>();
  const [cursor, setCursor] = useState<number | null>(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const pop = useModalStore((state) => state.pop);

  const fetchFollowInfo = async (type: 'followers' | 'followees') => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getFollowInfo(type, cursor);

      setUserList((prev) => ({
        list: [...(prev?.list ?? []), ...data.list],
      }));

      //cursor 업데이트
      setCursor(data.nextCursor ?? null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
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

  //클라이언트 단에서 폴백 처리
  if (error)
    return (
      <ErrorFallback
        className='mt-0'
        error={error}
        reset={() => {
          setError(null);
          fetchFollowInfo(type);
        }}
      />
    );
  if (isFetching) return <LoadingFallback />;

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
                onClick={pop}
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
