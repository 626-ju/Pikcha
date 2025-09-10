import Link from 'next/link';

const LoginButton = () => {
  return (
    <Link
      href='/signin'
      className='md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 light:text-gray-6e6e82 flex h-[70px] items-center px-2 md:h-[80px] xl:h-[100px]'
    >
      로그인
    </Link>
  );
};
export default LoginButton;
