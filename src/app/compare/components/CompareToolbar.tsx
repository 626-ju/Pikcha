'use client';

import Button from '@/components/ui/Buttons';

type Mode = 'browse' | 'delete' | 'compare';

const BUTTON_CLASS =
  'text-mogazoa-12px-300 text-white-f1f1f5 !h-[35px] w-[100px] px-5 py-1 whitespace-nowrap';

interface CompareToolbarProps {
  mode: Mode;
  compareListLength: number;
  selectedDeleteCount: number;
  onEnterDelete: () => void;
  onExitDelete: () => void;
  onConfirmDelete: () => void;
  onClearAll: () => void;
}

const CompareToolbar = ({
  mode,
  compareListLength,
  selectedDeleteCount,
  onEnterDelete,
  onExitDelete,
  onConfirmDelete,
  onClearAll,
}: CompareToolbarProps) => {
  return (
    <div className='flex w-auto justify-end gap-3 py-3'>
      {mode === 'delete' ? (
        <>
          <Button
            variant='primary'
            onClick={onConfirmDelete}
            disabled={selectedDeleteCount === 0}
            className={BUTTON_CLASS}
          >
            삭제 ({selectedDeleteCount})
          </Button>
          <Button variant='tertiary' onClick={onExitDelete} className={BUTTON_CLASS}>
            취소
          </Button>
        </>
      ) : (
        <>
          <Button
            variant='tertiary'
            onClick={onEnterDelete}
            disabled={compareListLength === 0}
            className={BUTTON_CLASS}
          >
            선택 삭제
          </Button>
          <Button
            variant='tertiary'
            onClick={onClearAll}
            disabled={compareListLength === 0}
            className={BUTTON_CLASS}
          >
            전체 삭제
          </Button>
        </>
      )}
    </div>
  );
};

export default CompareToolbar;
