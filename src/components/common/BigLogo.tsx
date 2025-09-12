import Link from 'next/link';

import Logo from '@/assets/icon/PickCha2.svg';

const BicLogo = () => {
  return (
    <Link href='/' className='hidden items-center justify-center pt-10 md:flex'>
      <Logo width={200} height={100} />
    </Link>
  );
};

export default BicLogo;
