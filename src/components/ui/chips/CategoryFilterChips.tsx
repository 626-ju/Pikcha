import CategoryIcon from '@/../public/icon/Icon-category.svg';
import { cn } from '@/lib/utils';
import { CategoryFilterChipProps } from '@/types/chips';

const CategoryFilterChip = ({ name, className }: CategoryFilterChipProps) => {
  return (
    <span
      className={cn(
        'border-black-353542 text-mogazoa-14px-400 text-gray-9fa6b2 flex max-w-[120px] shrink-0 items-center justify-between gap-[4px] rounded-full border-1 px-3 py-2',
        className,
      )}
    >
      <CategoryIcon />
      {name}
    </span>
  );
};

export default CategoryFilterChip;
