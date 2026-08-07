'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { SERVICOS_HERO_SLIDES } from '@/lib/content';
import { usePrefersReducedMotion } from '@/hooks/useMedia';
import { usePointerTilt } from '@/hooks/usePointerTilt';

const DURATION = 4000;

export function HeroSlides() {
  const reduced = usePrefersReducedMotion();
  const tiltRef = usePointerTilt<HTMLElement>();
  const [counter, setCounter] = useState(1);

  return (
    <SlidesSection>
      <Frame ref={tiltRef}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={650}
          autoplay={
            reduced
              ? false
              : { delay: DURATION, disableOnInteraction: true }
          }
          pagination={{ clickable: true }}
          onSlideChange={(sw) => setCounter((sw.realIndex ?? sw.activeIndex) + 1)}
        >
          {SERVICOS_HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.image}>
              <SlideLink href={slide.href}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 94vw, 600px"
                  quality={82}
                  style={{ objectFit: 'cover' }}
                />
                <Gradient />
                <Label>{slide.title}</Label>
              </SlideLink>
            </SwiperSlide>
          ))}
        </Swiper>

        <Counter aria-hidden="true">
          {String(counter).padStart(2, '0')} / {String(SERVICOS_HERO_SLIDES.length).padStart(2, '0')}
        </Counter>
        <Hint>Clique para ver os serviços</Hint>
      </Frame>
    </SlidesSection>
  );
}

const SlidesSection = styled.section`
  padding: 80px 0 96px;
  background: ${({ theme }) => theme.colors.fundo};
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

const Frame = styled.figure`
  position: relative;
  width: min(520px, 88vw);
  aspect-ratio: 16 / 10;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(201, 162, 39, 0.55);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2),
    0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 162, 39, 0.18);
  will-change: transform;

  @media (max-width: 640px) {
    width: 88vw;
    aspect-ratio: 16 / 9;
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
    right: 14px;
    left: auto;
    bottom: 16px;
    width: auto;
    display: flex;
    gap: 6px;
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    margin: 0;
    border-radius: 50%;
    background: rgba(247, 243, 234, 0.4);
    opacity: 1;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: rgba(240, 215, 123, 0.95);
  }

  .swiper-pagination-bullet:hover {
    transform: scale(1.3);
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
    rgba(3, 26, 29, 0.85) 0%,
    rgba(3, 26, 29, 0.15) 45%,
    rgba(3, 26, 29, 0.1) 100%
  );
`;

const Label = styled.span`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.douradoClaro};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
`;

const Counter = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: rgba(247, 243, 234, 0.85);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
`;

const Hint = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 3;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(240, 215, 123, 0.9);
`;