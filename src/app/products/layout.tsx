'use client';

import { useEffect } from 'react';

import Script from 'next/script';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string);
    }
  }, []);

  return (
    <>
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js'
        strategy='afterInteractive'
        onLoad={() => {
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
          }
        }}
      />
      {children}
    </>
  );
}
