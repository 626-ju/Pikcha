export interface reviewImagesType {
  source: string | undefined;
  id: number;
}

export interface userType {
  image: string | null;
  nickname: string;
  id: number;
}

export interface ReviewDetail {
  user: userType;
  reviewImages: reviewImagesType[];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
}

export interface ReviewCardProps {
  review: ReviewDetail;
}

export interface ReviewFormValue {
  productId?: number;
  images?: string[];
  content: string;
  rating: number;
}
