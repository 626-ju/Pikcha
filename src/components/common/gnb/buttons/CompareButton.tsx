import Link from 'next/link';

const CompareButton = () => {
  return (
    <Link
      href='/compare'
      className='md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 whitespace-nowrap'
    >
      비교하기
    </Link>
  );
};
export default CompareButton;
