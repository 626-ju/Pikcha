'use client';

import { useModalStore } from '@/store/modalStore';

import { FollowerModal } from './FollowerModal';

function FollowerModalTrigger() {
  const push = useModalStore((state) => state.push);

  return (
    <div>
      <button
        className='bg-[var(--color-yellow-ffc83c)]'
        onClick={() => push({ component: FollowerModal })}
      >
        모달 열기
      </button>
    </div>
  );
}

export default FollowerModalTrigger;
