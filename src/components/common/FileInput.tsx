'use client';

import { useState, ChangeEvent, useRef } from 'react';

import Image from 'next/image';
import { useErrorBoundary } from 'react-error-boundary';

import { postImageUrl } from '@/actions/profile/postImageUrl';
import { cn } from '@/lib/utils';
import { useUserInfoStore } from '@/store/userInfoStore';

import FilePreview from './FilePreview'; // 새로 만든 컴포넌트 import

interface FileInputProps {
  maxFiles?: number; // 기본값 1
}

const FileInput = ({ maxFiles = 1 }: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const { showBoundary } = useErrorBoundary();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // if (e.target.files) {(성주 주석)
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
    // }(성주 주석)

    //(성주 주석)이거 일단 제가 쓰려고 급하게 추가해둔 건데 나중에 밀고
    // 액션으로 리턴 받은 url로 프리뷰할 수 있게 하면 될 것 같습니다.
    if (maxFiles === 1) {
      try {
        const url = await postImageUrl(e.target.files[0]);
        console.log(url);
        setUserInfo({ image: url.url });
      } catch (err) {
        showBoundary(err);
      }
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
