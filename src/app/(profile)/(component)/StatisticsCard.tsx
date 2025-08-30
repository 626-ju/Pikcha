import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const ActivityCard = ({ title, children }: Props) => {
  return (
    <div className='border-black-353542 bg-black-252530 flex h-[119px] w-[105px] flex-col items-center justify-center gap-[15px] rounded-[12px] md:w-[163px] xl:h-[128px] xl:w-[300px] xl:gap-5'>
      <h3 className='text-mogazoa-14px-500 xl:text-mogazoa-16px-500 text-gray-9fa6b2 text-center break-keep'>
        {title}
      </h3>
      <>{children}</>
    </div>
  );
};

export default ActivityCard;
