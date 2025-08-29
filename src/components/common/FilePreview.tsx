import { X } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface FilePreviewProps {
  url: string;
  index: number;
  onRemove: (index: number) => void;
}

const FilePreview = ({ url, index, onRemove }: FilePreviewProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'aspect-square w-[140px] rounded-[8px]',
        'md:w-[135px]',
        'xl:w-[160px]',
        'border-black-353542 border',
      )}
    >
      <Image src={url} alt={`선택된 이미지 ${index + 1}`} fill style={{ objectFit: 'cover' }} />
      <button
        type='button'
        onClick={() => onRemove(index)}
        className={cn(
          'absolute top-[5px] right-[5px] flex items-center justify-center',
          'h-[26px] w-[26px] rounded-[8px] p-1',
          'bg-black text-white opacity-50',
        )}
        aria-label='파일 삭제'
      >
        <X />
      </button>
    </div>
  );
};

export default FilePreview;
