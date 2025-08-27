import { RankingChipProps } from '@/types/chips';

const RankingChip = ({ idx, className }: RankingChipProps) => {
  const baseStyle =
    'flex shrink-0 px-[8px] py-[2px] rounded-full text-mogazoa-10px-400 xl:text-mogazoa-12px-400';

  let rankingStyle;
  const ranking = `${idx + 1}등`;

  if (idx === 0) {
    rankingStyle = 'bg-[#FF2F9F]/10 text-[#FF2F9F]';
  } else if (idx === 1) {
    rankingStyle = 'bg-[#05D58B]/10 text-[#05D58B]';
  } else if (idx >= 2) {
    rankingStyle = 'bg-gray-9fa6b2/10 text-gray-9fa6b2';
  }

  const allClassName = `${baseStyle} ${rankingStyle} ${className}`;

  return <span className={allClassName}>{ranking}</span>;
};

export default RankingChip;
