'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { ProviderInfo } from '@/types/justwatch/providers';

interface Props {
  providers: ProviderInfo[];
  moviePosterUrl?: string;
}

export const StreamingIcon = ({ providers, moviePosterUrl }: Props) => {
  return (
    <div className='relative min-w-40 p-2'>
      <h3 className='text-mogazoa-20px-600 text-black-2e2e3a mb-5'>{`바로 감상하기`}</h3>

      <div className='flex w-[180px] flex-col gap-4 md:w-[400px] md:flex-row'>
        {/* md:flex-row */}
        <div className='relative mb-4 aspect-[5/7] w-[160px]'>
          <Image priority fill src={moviePosterUrl ?? ''} alt='승리한 영화 포스터' sizes='140px' />
        </div>

        <div className='flex flex-col gap-4'>
          {providers.map((item) => (
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={item.url}
              key={item.url}
              className='text-mogazoa-18px-500 flex w-auto items-center duration-300 last:mr-0 hover:scale-110'
            >
              <Image
                //와챠만 아이콘 이상한 거 줘서 추가
                src={item.logo?.includes('watcha') ? '/icon/Icon-watcha.png' : (item.logo ?? '')}
                alt='프로바이더 로고'
                width={40}
                height={40}
                className='bg-black-1c1c22 mr-4'
              />{' '}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className='hover:bg-gray-9fa6b2 text-black-2e2e3a absolute top-0 right-0 ml-2 rounded p-1'
      >
        <X size={16} />
      </button>
    </div>
  );
};
