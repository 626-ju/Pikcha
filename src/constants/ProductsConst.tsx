export interface Category {
  id: number;
  name: string;
}

export interface Sort {
  value: string;
  name: string;
}

export const SORT_OPTION_PRODUCTS: Sort[] = [
  { value: 'recent', name: '최신순' },
  { value: 'rating', name: '별점순' },
  { value: 'reviewCount', name: '리뷰순' },
];

export const SORT_OPTION_REVIEWS: Sort[] = [
  { value: 'recent', name: '최신순' },
  { value: 'ratingDesc', name: '별점 높은순' },
  { value: 'ratingAsc', name: '별점 낮은순' },
  { value: 'likeCount', name: '좋아요순' },
];

export const SORT_OPTION_USER_PAGE: Sort[] = [
  { value: 'reviewed-products', name: '리뷰 남긴 영화' },
  { value: 'created-products', name: '등록한 영화' },
  { value: 'favorite-products', name: '찜한 영화' },
];
