// 출처 : 영화진흥위원회(KOBIS) DB
// 선정 기준 : 2000년 ~ 2025년 개봉한 한국영화 DB 내 repGenreNm(대표장르) 수집 후 중복 내용 삭제, 유사 장르는 한 카테고리로 묶음
// 순서 : 가나다 순 (논의 후 변경 가능)

// 카테고리 10개까지 가능.
export const CATEGORY_NAME_MAP: Record<number, string> = {
  1: '공포/스릴러',
  2: '다큐멘터리',
  3: '드라마/뮤지컬',
  4: '멜로/로맨스',
  5: '범죄/미스터리',
  6: '가족/애니메이션',
  7: '액션/어드벤쳐',
  8: '코미디',
  9: '판타지',
  10: '기타',
};

export function getCategoryName(id: number, fallback?: string) {
  return CATEGORY_NAME_MAP[id] ?? fallback ?? `Unknown(${id})`;
}

export const categoryArray = Object.entries(CATEGORY_NAME_MAP).map(([id, name]) => ({
  id: Number(id),
  name: name,
}));

// 대표 장르 리스트 결과 (17개) [
// *   "가족",
// *   "공연",
// *   "공포(호러)",
// *   "기타",
// *   "다큐멘터리",
// *   "드라마",
// *   "멜로/로맨스",
// *   "뮤지컬",
// *   "미스터리",
// *   "범죄",
// *   "성인물(에로)",
// *   "스릴러",
// *   "애니메이션",
// *   "액션",
// *   "어드벤처",
// *   "코미디",
// *   "판타지"
// * ]
