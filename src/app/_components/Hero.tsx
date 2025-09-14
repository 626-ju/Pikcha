'use client';

import { useRef } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import HeroLogoCard from './HeroLogoCard';

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
          <Image
            src='/images/Hero1.webp'
            alt='굿 윌 헌팅'
            width={1180}
            height={460}
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
            fetchPriority='high'
          />
        </CarouselItem>
        <CarouselItem>
          <HeroLogoCard />
        </CarouselItem>
        <CarouselItem>
          <Image
            src='/images/Hero2.webp'
            alt='귀멸의 칼날'
            width={1180}
            height={460}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src='/images/Hero4.webp'
            alt='뜨거운 것이 좋아'
            width={1180}
            height={460}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src='/images/Hero3.webp'
            alt='기적 1'
            width={1180}
            height={460}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src='/images/Hero3-1.webp'
            alt='기적 2'
            width={1180}
            height={460}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1180px'
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Hero;
