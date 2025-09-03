'use server';

import fetcher from '@/lib/utils/fetcher';

export const getMovieId = async (moviename: string) => {
  const data = await fetcher(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${moviename}`,
  );

  const movieId = data.results[0].id;

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
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`,
  );
  const trailers = data.results.filter(
    // eslint-disable-next-line
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  console.log(trailers);
  return trailers[0].key;
};

// 아 TMDB가 내부적으로 저스트 와치 쓰네....
export const getHtmlJustWatch = async (moviename: string) => {
  const encodeString = encodeURIComponent(moviename);

  const results = await fetch(`https://www.justwatch.com/kr/%EA%B2%80%EC%83%89?q=${encodeString}`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    },
  });
  // const regex = `/herf="(\/[a-zA-Z0-9\-\/]+)"/g`;
  // const links = [];

  console.log(results);
};
