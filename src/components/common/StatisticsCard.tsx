import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const ActivityCard = ({ title, children }: Props) => {
  return (
    <div className='flex h-[119px] w-[105px] flex-col items-center justify-center gap-[15px] rounded-[12px] border-[var(--color-black-353542)] bg-[var(--color-black-252530)] px-5 py-5 md:w-[163px] xl:h-[128px] xl:w-[300px] xl:gap-5'>
      <h3 className='text-mogazoa-14px-500 xl:text-mogazoa-16px-500 text-center break-keep text-[var(--color-gray-9fa6b2)]'>
        {title}
      </h3>
      <>{children}</>
    </div>
  );
};

export default ActivityCard;
