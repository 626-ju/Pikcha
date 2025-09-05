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
  productId: number;
}

export interface ReviewFormValue {
  images?: string[];
  content: string;
  rating: number;
}

type ReviewPatchImage = { id: number } | { source: string };

export interface ReviewPatchFormValue {
  rating: number;
  content: string;
  images: ReviewPatchImage[] | [];
  reviewId: number;
}
