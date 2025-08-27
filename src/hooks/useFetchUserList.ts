'use client';

import { useEffect, useState } from 'react';

import { useErrorBoundary } from 'react-error-boundary';

import getFollowInfo from '@/actions/profile/getFollowInfo';
import { FollowType, FollowList, FollowUserInfo } from '@/types/profile/follow';

const useFetchUserList = (type: FollowType) => {
  const { showBoundary } = useErrorBoundary();

  const [userList, setUserList] = useState<FollowUserInfo[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [cursor, setCursor] = useState<number | null>(0);

  const fetchFollowInfo = async () => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getFollowInfo(type, cursor);

      //간단한 배열로 관리하기 위해 flatMap+타입가드 함수
      const newUsers = data.list.flatMap((item: FollowList) => {
        return isFollower(item) ? item.follower : item.followee;
      });

      setUserList((prev) => [...(prev ?? []), ...newUsers]);

      //cursor 업데이트
      setCursor(() => data.nextCursor);
    } catch (err) {
      if (err instanceof Error) showBoundary(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isFetching) return;
    fetchFollowInfo();
    // eslint-disable-next-line
  }, []);

  return { userList, isFetching, fetchFollowInfo, cursor };
};

export default useFetchUserList;

const isFollower = (item: FollowList) => {
  return 'follower' in item;
};
