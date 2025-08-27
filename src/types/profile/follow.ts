export type FollowType = 'followers' | 'followees';

export interface FollowUserInfo {
  image: string;
  nickname: string;
  id: number;
}

export type FollowList =
  | { id: number; follower: FollowUserInfo[] }
  | { id: number; followee: FollowUserInfo[] };
