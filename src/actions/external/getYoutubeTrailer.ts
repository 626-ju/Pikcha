'use server';

import fetcher from '@/lib/utils/fetcher';

export const getYoutubeTrailer = async (moviename: string) => {
  const query = encodeURIComponent(`${moviename} 예고편`);

  const data = await fetcher(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`,
  );

  const results = await data;

  // if (!results.items[0].id.videoId) {
  //   const err = new Error('예고편이 존재하지 않습니다');
  //   throw err;
  // }

  return results.items[0].id.videoId;
};
