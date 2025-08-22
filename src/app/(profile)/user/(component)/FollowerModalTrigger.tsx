'use client';

import { useModalStore } from '@/store/modalStore';

import { FollowerModal } from './FollowerModal';

function FollowerModalTrigger() {
  const push = useModalStore((state) => state.push);

  return (
    <div>
      {/*여기서 꼭 jsx말고 함수 형태로 넘겨주셔야 합니다 */}
      <button className='bg-[var(--color-yellow-ffc83c)]' onClick={() => push(FollowerModal)}>
        모달 열기
      </button>
    </div>
  );
}

export default FollowerModalTrigger;
