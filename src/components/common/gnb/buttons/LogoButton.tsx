import Image from 'next/image';
import Link from 'next/link';

const LogoButton = () => {
  return (
    <Link href='/' className='flex items-center'>
      <Image src='/icon/PickCha2.svg' alt='Logo' width={110} height={28} priority />
      {/* <Image 
        src='/icon/PickCha2.svg' 
        alt='Logo' 
        width={110} 
        height={28}
        priority
        sizes='(max-width: 768px) 90px, 110px'
        className='h-6 w-auto md:h-7 xl:h-8'
      /> */}
    </Link>
  );
};

export default LogoButton;
