import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth'; // NextAuth의 서버 함수 임포트

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='ko'>
      <body>
        <SessionProvider session={session}>
          {/* 서버 컴포넌트에서 세션 정보를 가져와 클라이언트 컴포넌트에 전달 */}

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
