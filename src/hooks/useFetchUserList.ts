'use client';

import { useEffect, useState } from 'react';

import getFollowInfo from '@/actions/profile/getFollowInfo';
import { FollowType, FollowList, FollowUserInfo } from '@/types/profile/follow';

const useFetchUserList = (type: FollowType) => {
  const [userList, setUserList] = useState<FollowUserInfo[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<number | null>(0);

  const fetchFollowInfo = async () => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getFollowInfo(type, cursor);

      //간단한 배열로 관리하기 위해 flatMap+tagged union 사용(식별자 추가)
      const newUsers = data.list.flatMap((item: FollowList) =>
        item.type === 'followers' ? item.follower : item.followee,
      );

      setUserList((prev) => [...(prev ?? []), ...newUsers]);

      //cursor 업데이트
      setCursor(data.nextCursor ?? null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isFetching) return;
    fetchFollowInfo();
    // eslint-disable-next-line
  }, []);

  return { userList, isFetching, error, fetchFollowInfo, cursor };
};

export default useFetchUserList;
