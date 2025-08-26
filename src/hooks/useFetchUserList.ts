'use client';

import { useEffect, useState } from 'react';

import getFollowInfo from '@/actions/profile/getFollowInfo';
import { FolloweeInfos, FollowerInfos, FollowType } from '@/types/profile/follow';

const useFetchUserList = (type: FollowType) => {
  const [userList, setUserList] = useState<FollowerInfos | FolloweeInfos>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<number | null>(0);

  const fetchFollowInfo = async () => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getFollowInfo(type, cursor);

      setUserList((prev) => ({
        list: [...(prev?.list ?? []), ...data.list],
      }));

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
