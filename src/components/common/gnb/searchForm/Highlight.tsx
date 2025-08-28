const Highlight = ({ text, query }: { text: string; query: string }) => {
  // 예상치 못한 쿼리값 대비 (추천목록은 일치 쿼리 없을 시 보이지 않음.)
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escape(query)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className='text-main-blue bg-transparent font-bold'>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

// 사용자가 검색어에 정규표현식 특수문자를 넣더라도 단순 문자로 판단
function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default Highlight;
