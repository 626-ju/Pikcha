'use server';

import * as cheerio from 'cheerio';

import { ProviderInfo } from '@/types/justwatch/providers';

export const getHtmlJustWatch = async (moviename: string) => {
  const encode = encodeURIComponent(moviename);

  const res = await fetch(`https://www.justwatch.com/kr/search?content_type=movie&q=${encode}`, {
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
  let matched = false;
  const allowedProviders = ['netflix', 'watcha', 'disney', 'wavve'];

  const firstTitleRow = $('.title-list-row__row').first();

  //검색 결과의 첫번째 항목
  const title = firstTitleRow.find('.title-list-row__column-header').text().trim();

  // 검색어가 영화 제목에 '포함' 되어 있는지?
  if (title.toLowerCase().includes(moviename.toLowerCase())) {
    matched = true;

    //첫번째 항목 안의 프로바이더들 중
    firstTitleRow.find('.buybox-row a').each((_, el) => {
      const $el = $(el);
      const url = $el.attr('href') || '';
      const logo = $el.find('img').attr('src');
      const title = $el.find('img').attr('title');

      const lowerUrl = url.toLowerCase();
      if (
        allowedProviders.some((p) => lowerUrl.includes(p)) && //[넷플, 디즈니, 웨이브, 왓챠만]
        url.startsWith('http') &&
        !providers.some((p) => p.logo === logo)
      ) {
        const providerName = allowedProviders.find((p) => lowerUrl.includes(p));
        const alreadyAdded = providers.some((p) => p.url.toLowerCase().includes(providerName!));

        if (!alreadyAdded) {
          providers.push({ url, logo, title });
        }
      }
    });
  }

  return matched ? providers : [];
};
