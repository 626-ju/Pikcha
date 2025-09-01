import Link from 'next/link';

const SignupButton = () => {
  return (
    <Link
      href='/signup'
      className='md:text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5'
    >
      회원가입
    </Link>
  );
};

export default SignupButton;
