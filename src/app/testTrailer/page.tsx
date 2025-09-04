'use client';
import { useEffect } from 'react';

import { toast } from 'sonner';

import { getHtmlJustWatch, getMovieId, getStreamingUrl } from '@/actions/tmdb/getStreamingUrl';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';

import { StreamingIcon } from './GoToStreaming';
import TrailerModal from './TrailerModal';

const Page = () => {
  const openModal = useModalStore().openModal;

  useEffect(() => {
    const getLinks = async () => {
      const providers = await getHtmlJustWatch('라퓨타');
      toast(<StreamingIcon providers={providers} />, {
        duration: 999999,
        position: 'bottom-right',
        style: { minWidth: 0, width: 'auto' },
      });
    };
    getLinks();
  }, []);

  return (
    <div>
      <Button onClick={() => getStreamingUrl('라퓨타')}>url</Button>
      <Button onClick={() => getMovieId('라퓨타')}>id</Button>
      <Button onClick={() => getHtmlJustWatch('라퓨타')}>저스트</Button>
      <Button onClick={() => openModal({ component: TrailerModal, props: { title: '무한성' } })}>
        트레일러
      </Button>
    </div>
  );
};

export default Page;
