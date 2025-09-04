'use server';

import * as cheerio from 'cheerio';

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

export interface ProviderInfo {
  url: string;
  logo?: string;
}

export const getHtmlJustWatch = async (moviename: string) => {
  const encode = encodeURIComponent(moviename);
  const res = await fetch(`https://www.justwatch.com/kr/검색?q=${encode}`, {
    cache: 'force-cache',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  const providers: ProviderInfo[] = [];
  $('.buybox-row a').each((_, el) => {
    const $el = $(el);
    const url = $el.attr('href') || '';
    const logo = $el.find('img').attr('src');

    if (url.startsWith('http') && !providers.some((p) => p.logo === logo)) {
      providers.push({ url, logo });
    }
  });

  return providers;
};
