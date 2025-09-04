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

      toast(<StreamingIcon providers={providers} />, {
        duration: 60_000,
        position: 'bottom-right',
        style: { minWidth: 0, width: 'auto', zIndex: 50 },
      });
    };

    getLinks();
  }, [title]);
};
