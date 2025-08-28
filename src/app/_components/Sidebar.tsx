'use client';

import { useCategoryNavigation } from '@/hooks/useCategoryNavigation';
import { CATEGORY_NAME_MAP } from '@/lib/utils/categoryNameMap';

const Sidebar = ({ selected, q }: { selected: number | null; q: string }) => {
  const { navigateToCategory } = useCategoryNavigation();

  return (
    <aside className='hidden w-[clamp(250px,25vw,350px)] pt-[45px] md:flex md:justify-end'>
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
              onClick={() => navigateToCategory(isSelected ? null : numId, q)}
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
