'use client';

import { getHtmlJustWatch } from '@/actions/external/getHtmlJustWatch';
import { getYoutubeTrailer } from '@/actions/external/getYoutubeTrailer';
import Button from '@/components/ui/Buttons';
import { useStreamingProvider } from '@/hooks/useStreamingProvider';
import { useModalStore } from '@/store/modalStore';

import TrailerModal from './TrailerModal';

const Page = () => {
  const openModal = useModalStore().openModal;

  useStreamingProvider('조제');

  return (
    <div>
      <Button onClick={() => getHtmlJustWatch('라퓨타')}>저스트와치</Button>
      <Button onClick={() => getYoutubeTrailer('조제')}>유튜브</Button>
      <Button onClick={() => openModal({ component: TrailerModal, props: { title: '조제' } })}>
        유튜브 트레일러
      </Button>
    </div>
  );
};

export default Page;
