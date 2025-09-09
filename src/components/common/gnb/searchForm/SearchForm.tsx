'use client';

import { useEffect, useState, useCallback } from 'react';

import { Search } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useSuggestions } from '@/hooks/useSuggestions';

import SearchSuggestions from './SearchSuggestions';

interface SearchFormProps {
  onSearchExecute?: () => void;
}

const SearchForm = ({ onSearchExecute }: SearchFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // url에 q가 이미 있다면 초기 렌더부터 인풋에 반영
  const initial = sp.get('q') ?? '';
  const [query, setQuery] = useState(initial);
  const [open, setOpen] = useState(false);

  const sugs = useSuggestions(query);

  // 쿼리값이 서치박스가 아닌 url로 변환될 경우 쿼리에 업데이트
  // ex) 에어팟 검색 -> /?q=에어팟 -> 뒤로가기 -> 이전에 검색했던 /?q=맥북이 url에 노출 -> 에어팟에서 맥북으로 쿼리 업데이트
  useEffect(() => {
    setQuery(sp.get('q') ?? '');
  }, [pathname, sp]);

  // 쿼리 복사해서 홈('/')으로 이동
  // 이동과 동시에 드롭다운 닫음
  const goHomeWithQ = useCallback(
    (q: string) => {
      const next = new URLSearchParams(sp.toString());
      if (q) next.set('q', q);
      else next.delete('q');
      next.delete('cursor');
      router.push(`/?${next.toString()}`);
      setOpen(false);
      // 검색 실행 시 콜백 호출
      if (q && onSearchExecute) {
        onSearchExecute();
      }
    },
    [sp, router, onSearchExecute],
  );

  // URL 초기화 처리
  useEffect(() => {
    if (!query && sp.get('q')) {
      goHomeWithQ('');
    }
  }, [query, sp, goHomeWithQ]);

  return (
    <div className='relative px-2'>
      {/* 모바일용 서치박스 래퍼 */}
      <div className='bg-black-17171C absolute -top-2 left-0 h-[75px] w-full rounded-md md:hidden' />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') goHomeWithQ(query);
        }}
        placeholder='상품 이름을 검색해 보세요'
        className='bg-black-252530 light:bg-gray-200 text-white-f1f1f5 placeholder:text-gray-6e6e82 md:max-x-[300px] relative w-full rounded-[28px] py-4 pr-12 pl-13 outline-none focus:border-none focus:ring-0 focus:outline-none md:h-[50px] xl:h-[56px] xl:max-w-[400px]'
      />
      <Search className='text-gray-9fa6b2 absolute top-4 left-6 md:top-3 xl:top-4' />
      {/* X 버튼 : 사용자 의도로만 지우기 */}
      {query && (
        <button
          aria-label='검색어 지우기'
          className='text-gray-9fa6b2 absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer'
          onClick={() => {
            setQuery('');
            goHomeWithQ('');
          }}
        >
          <CircleX />
        </button>
      )}
      {open && (
        <SearchSuggestions
          query={query}
          suggestions={sugs}
          onSelect={(name) => {
            setQuery(name);
            goHomeWithQ(name);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchForm;
