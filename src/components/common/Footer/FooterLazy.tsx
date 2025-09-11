'use client';

import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/common/Footer/Footer'), { ssr: false });

const FooterLazy = () => {
  return <Footer />;
};

export default FooterLazy;
