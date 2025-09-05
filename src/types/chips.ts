export interface CompareChipProps {
  variant: 'first' | 'second';
  productName: string;
  onClick?: () => void;
}

export interface categoryChipProps {
  category: {
    id: number;
    name: string;
  };
  className?: string;
}

export interface CategoryFilterChipProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export interface RankingChipProps {
  idx: number;
  className?: string;
}

export interface ThumbChipProps {
  initialCount: number; //likeCount
  initialState: boolean; // isLiked 주세여
  reviewId: number;
}
