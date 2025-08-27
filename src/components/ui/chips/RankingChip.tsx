import { cn } from '@/lib/utils';
import { RankingChipProps } from '@/types/chips';

const RankingChip = ({ idx, className }: RankingChipProps) => {
  const ranking = `${idx + 1}등`;

  return (
    <span
      className={cn(
        '!text-mogazoa-10px-400 xl:!text-mogazoa-12px-400 flex shrink-0 items-center rounded-full px-1.5 py-0.5 leading-none xl:px-2',
        idx === 0 && 'bg-[#FF2F9F]/10 text-[#FF2F9F]',
        idx === 1 && 'bg-[#05D58B]/10 text-[#05D58B]',
        idx >= 2 && 'bg-gray-9fa6b2/10 text-gray-9fa6b2',
        className,
      )}
    >
      {ranking}
    </span>
  );
};

export default RankingChip;
