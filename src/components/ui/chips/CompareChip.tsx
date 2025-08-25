'use client';

import DeleteIcon from '@/../public/icon/Icon-delete.svg';
import { cn } from '@/lib/utils';

const CompareChip = ({
  variant,
  productName,
  onClick,
}: {
  variant: 'first' | 'second';
  productName: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        'text-mogazoa-16px-400 flex shrink-0 items-center gap-[10px] rounded-[6px] px-[10px] py-2',
        variant === 'first' ? 'bg-[#05D58B]/10 text-[#05D58B]' : 'bg-[#FF2F9F]/10 text-[#FF2F9F]',
      )}
    >
      {productName}
      <button
        onClick={onClick}
        className='flex h-[19px] w-[19px] cursor-pointer items-center justify-center rounded-[6px] bg-[#000000]/50'
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CompareChip;
