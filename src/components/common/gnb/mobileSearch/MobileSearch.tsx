'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import SearchForm from '../searchForm/SearchForm';

const MobileSearch = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div>
      <button
        type='button'
        aria-label='검색 열기'
        aria-expanded={searchOpen}
        onClick={() => {
          setSearchOpen((prev) => !prev);
        }}
      >
        <Search />
      </button>
      {searchOpen && (
        <>
          {/* 오버레이 - 헤더와 서치폼 아래 영역만 */}
          <div
            className='animate-in fade-in fixed top-[130px] right-0 bottom-0 left-0 z-[5] bg-black/50 duration-300'
            onClick={() => setSearchOpen(false)}
          />
          {/* 검색창 */}
          <div
            className='bg-black-1c1c22 animate-in slide-in-from-top-2 absolute top-[80px] left-0 z-20 h-[50px] w-full duration-300 ease-out'
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 오버레이 닫힘 방지
          >
            {/* 검색 진입 시 검색창, 오버레이 제거 */}
            <SearchForm onSearchExecute={() => setSearchOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default MobileSearch;
