import { cn } from '@/lib/utils';
import { categoryChipProps } from '@/types/chips';

export const CategoryChip = ({ id, name, className }: categoryChipProps) => {
  const baseStyle = 'flex text-mogazoa-12px-400 shrink-0 rounded-md px-2 py-1';

  let categoryColor;

  switch (id) {
    case 1:
      categoryColor = 'bg-[#c5d17c]/10 text-[#C5D17C]';
      break;
    case 2:
      categoryColor = 'bg-[#F75532]/10 text-[#F75532]';
      break;
    case 3:
      categoryColor = 'bg-[#A953FF]/10 text-[#A953FF]';
      break;
    case 4:
      categoryColor = 'bg-[#49AF1A]/10 text-[#49AF1A]';
      break;
    case 5:
      categoryColor = 'bg-[#D676C1]/10 text-[#D676C1]';
      break;
    case 6:
      categoryColor = 'bg-[#FF7E46]/10 text-[#FF7E46]';
      break;
    case 7:
      categoryColor = 'bg-[#23B581]/10 text-[#23B581]';
      break;
    case 8:
      categoryColor = 'bg-[#FD529A]/10 text-[#FD529A]';
      break;
    case 9:
      categoryColor = 'bg-[#757AFF]/10 text-[#757AFF]';
      break;
    case 10:
      categoryColor = 'bg-[#3098E3]/10 text-[#3098E3]';
      break;
    default:
      categoryColor = '';
  }

  return <span className={cn(baseStyle, categoryColor, className)}>{name}</span>;
};

export default CategoryChip;
