export interface Category {
  id: number;
  name: string;
}

export const CATEGORY: Category[] = [
  { id: 1, name: '카테고리1' },
  { id: 2, name: '카테고리2' },
  { id: 3, name: '카테고리3' },
  { id: 4, name: '카테고리4' },
  { id: 5, name: '카테고리5' },
  { id: 6, name: '카테고리6' },
  { id: 7, name: '카테고리7' },
];

export interface Sort {
  value: string;
  name: string;
}

export const SORT_OPTION_PRODUCTS: Sort[] = [
  { value: 'recent', name: '조회순' },
  { value: 'ratingDesc', name: '별점 높은순' },
  { value: 'ratingAsc', name: '별점 낮은순' },
];

export const SORT_OPTION_REVIEWS: Sort[] = [
  { value: 'recent', name: '최신순' },
  { value: 'ratingDesc', name: '별점 높은순' },
  { value: 'ratingAsc', name: '별점 낮은순' },
  { value: 'likeCount', name: '좋아요순' },
];

export const SORT_OPTION_USER_PAGE: Sort[] = [
  { value: 'reviewed-products', name: '리뷰 남긴 상품' },
  { value: 'created-products', name: '등록한 상품' },
  { value: 'favorite-products', name: '찜한 상품' },
];
