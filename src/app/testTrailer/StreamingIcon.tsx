'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { ProviderInfo } from '@/types/justwatch/providers';

interface Props {
  providers: ProviderInfo[];
}

export const StreamingIcon = ({ providers }: Props) => {
  return (
    <div className='relative inline-block'>
      <h3 className='text-mogazoa-16px-600 text-gray-6e6e82 mb-5'>감상하기</h3>
      <div className='inline-flex items-center'>
        {providers.map((item) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={item.url}
            key={item.url}
            className='mr-10 duration-300 last:mr-0 hover:scale-110'
          >
            <Image src={item.logo ?? ''} alt='프로바이더 로고' width={40} height={40} />
          </a>
        ))}
      </div>
      <button
        onClick={() => toast.dismiss()}
        className='hover:bg-gray-9fa6b2 text-gray-6e6e82 absolute top-0 right-0 ml-2 rounded p-1'
      >
        <X size={16} />
      </button>
    </div>
  );
};
