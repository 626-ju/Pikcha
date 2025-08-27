'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { CATEGORY_NAME_MAP } from '@/lib/utils/categoryNameMap';

const Sidebar = ({ selected, q }: { selected: number | null; q: string }) => {
  const router = useRouter();
  const sp = useSearchParams();

  const go = (category: number | null) => {
    const next = new URLSearchParams(sp);
    if (category != null) next.set('categoryId', String(category));
    else next.delete('categoryId');
    next.delete('cursor');
    if (q) next.set('q', q);
    else next.delete('q');
    router.push(`/?${next.toString()}`);
  };

  return (
    <aside className='hidden space-y-2 pt-[45px] md:block'>
      <div className='flex flex-col'>
        <p className='text-mogazoa-16px-400'>카테고리</p>
        {/* 변경된 카테고리 이름으로 변경하고 map*/}
        {Object.entries(CATEGORY_NAME_MAP).map(([id, label]) => {
          const numId = Number(id);
          const isSelected = selected === numId;

          return (
            <button
              key={id}
              className={`h-[50px] w-[200px] rounded-md px-[20px] py-[15px] text-left ${isSelected ? 'text-white-f1f1f5 bg-black-353542' : 'text-gray-6e6e82'}`}
              onClick={() => go(isSelected ? null : numId)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
