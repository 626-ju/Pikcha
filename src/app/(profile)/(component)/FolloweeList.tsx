'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import getFollowee from '@/actions/getFollowee';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Followees } from '@/types/profile/follow';

const FolloweeList = () => {
  const [followees, setFollowees] = useState<Followees>();
  const [cursor, setCursor] = useState<number | null>(0);
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchFollowees = async () => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getFollowee(cursor);

      setFollowees((prev) => ({
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
    fetchFollowees();
    // eslint-disable-next-line
  }, []);

  useIntersectionObserver(loadMoreRef, cursor, fetchFollowees);

  if (!followees) return <h1>로딩 중...</h1>; //서스펜스나 스트리밍 쓰고 싶었는데 클라컴포에서 방법 없을까요?

  return (
    <ul className='scrollbar-hide flex h-[550px] flex-col gap-5 overflow-y-scroll md:h-[600px] xl:h-[660px]'>
      {followees?.list?.length === 0 && <div>팔로워가 없어요 😥</div>}
      {followees?.list?.map(({ id, followee }, i) => {
        return (
          <Link key={id} href={`/user/${followee.id}`}>
            <li className='flex items-center gap-5'>
              {/*추후 이미지로 변경*/}
              <div className='bg-green-05d58b h-12 w-12 rounded-full md:h-13 md:w-13' />
              {followee.nickname}
            </li>
            {cursor !== null && i === followees.list.length - 1 && (
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

export default FolloweeList;

// const followees = {
//   list: [
//     { id: 1, followee: { id: 1, nickname: '성주' } },
//     { id: 2, followee: { id: 1, nickname: '소연' } },
//     { id: 3, followee: { id: 1, nickname: '만재' } },
//     { id: 4, followee: { id: 1, nickname: '민지' } },
//     { id: 5, followee: { id: 1, nickname: '성주' } },
//     { id: 6, followee: { id: 1, nickname: '소연' } },
//     { id: 7, followee: { id: 1, nickname: '만재' } },
//     { id: 8, followee: { id: 1, nickname: '민지' } },
//     { id: 9, followee: { id: 1, nickname: '성주' } },
//     { id: 10, followee: { id: 1, nickname: '소연' } },
//     { id: 11, followee: { id: 1, nickname: '만재' } },
//     { id: 12, followee: { id: 1, nickname: '민지' } },
//   ],
// };
