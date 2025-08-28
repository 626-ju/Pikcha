'use client';

import { useState, ChangeEvent, useRef } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

import FilePreview from './FilePreview'; // 새로 만든 컴포넌트 import

interface FileInputProps {
  maxFiles?: number; // 기본값 1
}

const FileInput = ({ maxFiles = 1 }: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, maxFiles - files.length);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      newFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviewUrls((prev) => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('flex items-center', 'gap-[10px]', 'md:gap-[15px]', 'xl:gap-[20px]')}>
      {/* 업로드 버튼 */}
      {imagePreviewUrls.length < maxFiles && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer items-center justify-center',
            'border-black-353542 bg-black-252530 border',
            'aspect-square w-[140px] rounded-[8px]',
            'md:w-[135px]',
            'xl:w-[160px]',
          )}
        >
          <Image src='/icon/Icon-addfile.svg' alt='파일 추가 아이콘' width={24} height={24} />
        </div>
      )}

      {/* 업로드된 이미지 미리보기 - FilePreview 컴포넌트 사용 */}
      {imagePreviewUrls.map((url, index) => (
        <FilePreview key={index} url={url} index={index} onRemove={handleRemoveFile} />
      ))}

      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
