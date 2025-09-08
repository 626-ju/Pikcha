'use client';

import Button from '@/components/ui/Buttons';

type Mode = 'browse' | 'delete' | 'compare';

type Props = {
  mode: Mode;
  compareListLength: number;
  selectedDeleteCount: number;
  onEnterDelete: () => void;
  onExitDelete: () => void;
  onConfirmDelete: () => void;
  onClearAll: () => void;
};

const CompareToolbar = ({
  mode,
  compareListLength,
  selectedDeleteCount,
  onEnterDelete,
  onExitDelete,
  onConfirmDelete,
  onClearAll,
}: Props) => {
  return (
    <div className='flex w-auto justify-end gap-3 py-3'>
      {mode === 'delete' ? (
        <>
          <Button
            variant='primary'
            onClick={onConfirmDelete}
            disabled={selectedDeleteCount === 0}
            className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[35px] w-[100px] px-5 py-1 whitespace-nowrap'
          >
            삭제 ({selectedDeleteCount})
          </Button>
          <Button
            variant='tertiary'
            onClick={onExitDelete}
            className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[35px] w-[100px] px-5 py-1 whitespace-nowrap'
          >
            취소
          </Button>
        </>
      ) : (
        <>
          <Button
            variant='tertiary'
            onClick={onEnterDelete}
            disabled={compareListLength === 0}
            className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[35px] w-[100px] px-5 py-1 whitespace-nowrap'
          >
            선택 삭제
          </Button>
          <Button
            variant='tertiary'
            onClick={onClearAll}
            disabled={compareListLength === 0}
            className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[35px] w-[100px] px-5 py-1 whitespace-nowrap'
          >
            전체 삭제
          </Button>
        </>
      )}
    </div>
  );
};

export default CompareToolbar;

// 버튼 공통 컴포로 만들 수 있을 것 같음.
