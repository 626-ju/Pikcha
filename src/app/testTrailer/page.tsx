'use client';
import { getMovieId, getStreamingUrl } from '@/actions/tmdb/getStreamingUrl';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';

import TrailerModal from './TrailerModal';

const Page = () => {
  const openModal = useModalStore().openModal;

  return (
    <div>
      <Button onClick={() => getStreamingUrl('라퓨타')}>url</Button>
      <Button onClick={() => getMovieId('라퓨타')}>id</Button>
      <Button onClick={() => openModal({ component: TrailerModal, props: { title: '툼 레이더' } })}>
        트레일러
      </Button>
    </div>
  );
};

export default Page;
