import Image from 'next/image';
import Link from 'next/link';

const LogoButton = () => {
  return (
    <Link href='/' className='flex items-center'>
      <Image src='/icon/PickCha2.svg' alt='Logo' width={166} height={28} />
    </Link>
  );
};

export default LogoButton;
