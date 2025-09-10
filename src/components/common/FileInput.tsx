'use client';

import { useState, ChangeEvent, useRef } from 'react';

import Image from 'next/image';
import { useErrorBoundary } from 'react-error-boundary';

import { postImageUrl } from '@/actions/profile/postImageUrl';
import { cn } from '@/lib/utils';

import FilePreview from './FilePreview';

interface FileInputProps {
  maxFiles?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

const FileInput = ({ maxFiles = 1, value, onChange }: FileInputProps) => {
  const [files, setFiles] = useState<string[]>(value ?? []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showBoundary } = useErrorBoundary();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const ext = file.name.split('.').pop(); //확장자 잡시 뽑아
    const newFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`; //다시 넣어
    const renamedFile = new File([file], newFileName, { type: file.type });

    try {
      const { url } = await postImageUrl(renamedFile);
      setFiles((prev) => {
        const updated = [...prev, url].slice(0, maxFiles);
        onChange(updated);
        return updated;
      });
    } catch (err) {
      showBoundary(err);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange(updated);
    //브라우저가 삭제했다가 다시 같은 이미지를 넣더라도 이벤트가 트리거 되게
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      className={cn('flex shrink-0 items-center', 'gap-[10px]', 'md:gap-[15px]', 'xl:gap-[20px]')}
    >
      {/* 업로드 버튼 */}
      {files.length < maxFiles && (
        <div
          className={cn(
            'flex shrink-0 cursor-pointer items-center justify-center',
            'border-black-353542 bg-black-252530 border',
            'aspect-square w-30 rounded-[8px]',
            'md:w-40',
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image src='/icon/Icon-addfile.svg' alt='파일 추가 아이콘' width={24} height={24} />
        </div>
      )}

      {/* 업로드된 이미지 미리보기 - FilePreview 컴포넌트 사용 */}
      {files.map((url, index) => (
        <FilePreview key={index} url={url} index={index} onRemove={handleRemoveFile} />
      ))}

      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='.png, .jpg, .jpeg'
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
