'use client';

import { useRef } from 'react';

import { ImperativeModal, ImperativeModalHandles } from '@/components/common/ImperativeModal';

function FollowerModalTrigger() {
  const modalRef = useRef<ImperativeModalHandles>(null);

  return (
    <div>
      <button className='bg-[var(--color-yellow-ffc83c)]' onClick={() => modalRef.current?.open()}>
        모달 열기
      </button>
      <ImperativeModal ref={modalRef} type={'follower'} />
    </div>
  );
}

export default FollowerModalTrigger;
