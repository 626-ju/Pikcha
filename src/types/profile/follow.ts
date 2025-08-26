export type FollowType = 'followers' | 'followees';

export interface FollowerInfo {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface FollowerInfos {
  list: {
    id: number;
    follower: FollowerInfo;
  }[];
}

export interface FolloweeInfo {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface FolloweeInfos {
  list: {
    id: number;
    followee: FolloweeInfo;
  }[];
}
