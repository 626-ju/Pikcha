import Image from 'next/image';
import Link from 'next/link';

const LogoButton = () => {
  return (
    <Link href='/'>
      <Image src='/icon/Logo.svg' alt='Logo' width={166} height={28} />
    </Link>
  );
};

export default LogoButton;
