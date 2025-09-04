'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { ProviderInfo } from '@/actions/tmdb/getStreamingUrl';

export const StreamingIcon = ({ providers }: { providers: ProviderInfo[] }) => {
  return (
    <div className='relative inline-block'>
      <h3 className='text-mogazoa-16px-600 text-gray-6e6e82 mb-5'>감상하기</h3>
      <div className='inline-flex items-center'>
        {providers.map((el) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={el.url}
            key={el.url}
            className='mr-10 duration-300 last:mr-0 hover:scale-110'
          >
            <Image src={el.logo ?? ''} alt='프로바이더 로고' width={40} height={40} />
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

//트랜지션-노말
