export interface Followee {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export interface Followees {
  list: {
    id: number;
    followee: Followee;
  }[];
}
