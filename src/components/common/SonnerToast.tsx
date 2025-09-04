'use client';

import { Toaster } from 'sonner';

// 사용 예시
/*
      <Button onClick={() => toast.error('안녕')}>토스트(실패) 테스트</Button>
      <Button onClick={() => toast.success('안녕')}>토스트(성공) 테스트</Button>
      <Button onClick={() => toast.info('안녕')}>토스트(안내) 테스트</Button>
      <Button onClick={() => toast.warning('안녕')}>토스트(경고) 테스트</Button>
*/

const SonnerToast = () => {
  return <Toaster position='bottom-center' richColors expand={false} duration={1500} />;
};

export default SonnerToast;
