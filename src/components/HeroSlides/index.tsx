'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { SERVICOS_HERO_SLIDES } from '@/lib/content';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMedia';

const DURATION = 4000;
const DURATION_REDUCED = 7000;

export function HeroSlides() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [counter, setCounter] = useState(1);

  const autoplay = useMemo(
    () => ({
      delay: reduced ? DURATION_REDUCED : DURATION,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      waitForTransition: true,
    }),
    [reduced],
  );

  const onSlideChange = useCallback((sw: { activeIndex: number }) => {
    setCounter(sw.activeIndex + 1);
  }, []);

  return (
    <SlidesSection>
      <Banner>
        <Swiper
          modules={[A11y, Autoplay, Pagination]}
          slidesPerView={1}
          effect="slide"
          allowTouchMove
          grabCursor
          speed={800}
          rewind
          autoplay={autoplay}
          pagination={{ clickable: true }}
          a11y={{ paginationBulletMessage: 'Ir para o slide {{index}}' }}
          onSlideChange={onSlideChange}
        >
          {SERVICOS_HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.image}>
              <SlideLink href={slide.href}>
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={82}
                  priority={slide.image === SERVICOS_HERO_SLIDES[0].image}
                  style={{ objectFit: isMobile ? 'cover' : 'contain' }}
                />
                <Gradient />
                <Label>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideTagline>{slide.tagline}</SlideTagline>
                </Label>
              </SlideLink>
            </SwiperSlide>
          ))}
        </Swiper>

        <Counter aria-hidden="true">
          {String(counter).padStart(2, '0')} / {String(SERVICOS_HERO_SLIDES.length).padStart(2, '0')}
        </Counter>
      </Banner>
    </SlidesSection>
  );
}

const SlidesSection = styled.section`
  position: relative;
  padding: 76px 0 0;
  background: #000000;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 76px);
  height: calc(100svh - 76px);
  overflow: hidden;
  background: #000000;

  @media (max-width: 768px) {
    height: calc(100vh - 76px);
    height: calc(100svh - 76px);
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    position: relative;
    height: 100%;
  }

  .swiper-pagination {
    left: 24px;
    right: auto;
    bottom: 24px;
    width: auto;
    display: flex;
    gap: 8px;
    z-index: 3;
  }

  .swiper-pagination-bullet {
    width: 28px;
    height: 4px;
    margin: 0;
    border-radius: 999px;
    background: rgba(247, 243, 234, 0.45);
    opacity: 1;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: rgba(240, 215, 123, 0.95);
  }

  .swiper-pagination-bullet:hover {
    transform: scaleX(1.15);
  }
`;

const SlideLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &:focus-visible {
    outline: 2px solid rgba(240, 215, 123, 0.8);
    outline-offset: -4px;
  }
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(3, 26, 29, 0.9) 0%,
    rgba(3, 26, 29, 0.35) 40%,
    rgba(3, 26, 29, 0.15) 100%
  );
`;

const Label = styled.span`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 60px;
  max-width: 680px;
  font-family: ${({ theme }) => theme.fonts.serif};

  @media (max-width: 768px) {
    bottom: 32px;
  }
`;

const SlideTitle = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.douradoClaro};
  background-image: linear-gradient(
    100deg,
    ${({ theme }) => theme.colors.dourado} 0%,
    #f7e7b1 45%,
    ${({ theme }) => theme.colors.douradoClaro} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55);
  filter: drop-shadow(0 2px 14px rgba(0, 0, 0, 0.4));

  @media (max-width: 768px) {
    font-size: clamp(1.6rem, 6.5vw, 2.4rem);
  }
`;

const SlideTagline = styled.span`
  display: block;
  margin-top: 8px;
  text-transform: uppercase;
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: rgba(247, 243, 234, 0.96);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: clamp(0.85rem, 3.5vw, 1.05rem);
  }
`;

const Counter = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: rgba(247, 243, 234, 0.9);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
`;