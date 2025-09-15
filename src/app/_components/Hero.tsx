'use client';

import { useRef } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import HeroLogoCard from './HeroLogoCard';
import TestHeroLogoCard from './TestHeroLogoCard';

const Hero = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 5000, // 5초마다 자동으로 슬라이드
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    }),
  );

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[autoplay.current]}
      className='hidden pt-15 md:block'
      onMouseEnter={() => autoplay.current.reset()}
      onTouchStart={() => autoplay.current.reset()}
      onMouseLeave={() => autoplay.current.play()}
    >
      <CarouselContent>
        <CarouselItem>
          <Link href='/products/1825' className='block h-full' aria-label='굿 윌 헌팅 상세로 이동'>
            <Image
              src='/images/Hero1.webp'
              alt='굿 윌 헌팅'
              width={1180}
              height={460}
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
              fetchPriority='high'
            />
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link
            href='https://github.com/TEAM3-Mogazoa/Mogazoa'
            className='block h-full'
            aria-label='개발진 깃허브 이동'
            target='_blank'
            rel='noopener noreferrer'
          >
            <HeroLogoCard />
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link
            href='https://github.com/TEAM3-Mogazoa/Mogazoa'
            className='block h-full'
            aria-label='개발진 깃허브 이동'
            target='_blank'
            rel='noopener noreferrer'
          >
            <TestHeroLogoCard />
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link
            href='/products/1824'
            className='block h-full'
            aria-label='귀멸의 칼날 무한열차편 상세로 이동'
          >
            <Image
              src='/images/Hero2.webp'
              alt='귀멸의 칼날'
              width={1180}
              height={460}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
            />
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link
            href='/products/1823'
            className='block h-full'
            aria-label='뜨거운 것이 좋아 상세로 이동'
          >
            <Image
              src='/images/Hero4.webp'
              alt='뜨거운 것이 좋아'
              width={1180}
              height={460}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
            />
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link href='/products/1826' className='block h-full' aria-label='기적 상세로 이동'>
            <Image
              src='/images/Hero3.webp'
              alt='기적 1'
              width={1180}
              height={460}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
            />
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link href='/products/1826' className='block h-full' aria-label='기적 상세로 이동'>
            <Image
              src='/images/Hero3-1.webp'
              alt='기적 2'
              width={1180}
              height={460}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
            />
          </Link>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Hero;
