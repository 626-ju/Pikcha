'use client';

import { useEffect } from 'react';

import { toast } from 'sonner';

import { getHtmlJustWatch } from '@/actions/external/getHtmlJustWatch';
import { StreamingIcon } from '@/app/testTrailer/StreamingIcon';

export const useStreamingProvider = (title: string) => {
  useEffect(() => {
    const getLinks = async () => {
      const providers = await getHtmlJustWatch(title);

      if (providers.length === 0) return; //프로바이더 없으면 토스트 호출 x

      toast(<StreamingIcon providers={providers} moviePosterUrl={'/images/testTrailer.jpeg'} />, {
        className: 'trailer-toast',
        duration: 30 * 1000,
        position: 'bottom-right',
        style: { width: 'auto', margin: '0' },
      });
    };

    getLinks();
  }, [title]);
};
