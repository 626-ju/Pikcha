import Link from 'next/link';

const ReturnToListButton = () => {
  return (
    <Link
      href={'/'}
      className='bg-main-gradation text-mogazoa-16px-300 inline-block self-center rounded-2xl px-6 py-2.5'
    >
      전체 인기 목록 보기
    </Link>
  );
};

export default ReturnToListButton;
