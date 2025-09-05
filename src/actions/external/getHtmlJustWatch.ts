'use server';

import * as cheerio from 'cheerio';

import { ProviderInfo } from '@/types/justwatch/providers';

export const getHtmlJustWatch = async (moviename: string) => {
  const encode = encodeURIComponent(moviename);

  const res = await fetch(`https://www.justwatch.com/kr/검색?q=${encode}`, {
    //.json말고 .text해야해서 그냥 fetch로
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
