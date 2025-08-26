export type FollowType = 'followers' | 'followees';

export interface FollowUserInfo {
  image: string;
  nickname: string;
  id: number;
}

export type FollowList =
  | { id: number; type: 'followers'; follower: FollowUserInfo[] }
  | { id: number; type: 'followees'; followee: FollowUserInfo[] };
