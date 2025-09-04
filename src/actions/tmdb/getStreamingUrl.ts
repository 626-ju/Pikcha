'use server';

import fetcher from '@/lib/utils/fetcher';

export const getMovieId = async (moviename: string) => {
  const data = await fetcher(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${moviename}`,
  );

  const movieId = data.results[0].id;

  if (!movieId) throw new Error('id가 없어용');

  //방법 1. -> id는 겟 했으니까 =>  https://www.themoviedb.org/movie/id로 링크를 보낸다
  return movieId;
};

export const getStreamingUrl = async (moviename: string) => {
  const movieId = await getMovieId(moviename);

  const providers = await fetcher(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
  );

  console.log(providers.results.KR);
};

export const getTrailer = async (moviename: string) => {
  const movieId = await getMovieId(moviename);

  const data = await fetcher(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}&language=ko-KO`,
  );
  const trailers = data.results.filter(
    // eslint-disable-next-line
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  if (!trailers) throw new Error('예고편이 없어요');

  console.log(trailers);
  //->다른 곳에서 뜯어올 수 있는지를 확인해봐야 할 것 같아요
  return trailers[2].key;
};

// 아 TMDB가 내부적으로 저스트 와치 쓰네....
export const getHtmlJustWatch = async (moviename: string) => {
  const url = 'https://apis.justwatch.com/content/titles/ko_KR/popular';
  // const encodeString = encodeURIComponent(moviename);

  const body = {
    query: moviename,
    page_size: 5, // 가져올 결과 개수
    page: 1,
    content_types: ['movie', 'show'],
  };

  const results = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify(body),
  });
  // const regex = `/herf="(\/[a-zA-Z0-9\-\/]+)"/g`;
  // const links = [];

  console.log(results);
};
