import { useEffect, useState } from 'react';

import { useErrorBoundary } from 'react-error-boundary';

import { getTrailer } from '@/actions/tmdb/getStreamingUrl';

const TrailerContents = ({ title }: { title: string }) => {
  const { showBoundary } = useErrorBoundary();
  const [videoKey, setVideoKey] = useState();

  useEffect(() => {
    const getTrailerInfo = async (title: string) => {
      try {
        const data = await getTrailer(title);
        setVideoKey(data);
      } catch (err) {
        showBoundary(err);
      }
    };

    getTrailerInfo(title);
  });

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
      width='100%'
      height='100%'
    />
  );
};

export default TrailerContents;
