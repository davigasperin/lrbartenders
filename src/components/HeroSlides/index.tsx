'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { SERVICOS_HERO_SLIDES } from '@/lib/content';
import { usePrefersReducedMotion } from '@/hooks/useMedia';
import { usePointerTilt } from '@/hooks/usePointerTilt';

const DURATION = 4000;

export function HeroSlides() {
  const reduced = usePrefersReducedMotion();
  const tiltRef = usePointerTilt<HTMLElement>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SERVICOS_HERO_SLIDES.length);
    }, DURATION);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <Frame ref={tiltRef}>
      <Track>
        {SERVICOS_HERO_SLIDES.map((slide, i) => (
          <Slide as={Link} key={i} href={slide.href} $active={i === index}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 1500px) 0vw, 40vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
            <Gradient />
            <Label>{slide.title}</Label>
          </Slide>
        ))}
      </Track>

      <Dots aria-hidden="true">
        {SERVICOS_HERO_SLIDES.map((_, i) => (
          <Dot key={i} $active={i === index} onClick={() => setIndex(i)} />
        ))}
      </Dots>
      <Counter aria-hidden="true">
        {String(index + 1).padStart(2, '0')} / {String(SERVICOS_HERO_SLIDES.length).padStart(2, '0')}
      </Counter>
      <Hint>Clique para ver os serviços</Hint>
    </Frame>
  );
}

const Frame = styled.figure`
  position: relative;
  width: min(400px, 82vw);
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
`;

const Track = styled.div`
  position: absolute;
  inset: 0;
`;

const Slide = styled(Link)<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
  &.focus-visible:focus {
    outline: 2px solid rgba(240, 215, 123, 0.8);
    outline-offset: -4px;
  }

  ${({ $active }) =>
    $active
      ? `
    opacity: 1;
    z-index: 1;
  `
      : `
    z-index: 0;
  `}
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

const Dots = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 6px;
  z-index: 2;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? 'rgba(240, 215, 123, 0.95)' : 'rgba(247, 243, 234, 0.4)'};
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

const Counter = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: rgba(247, 243, 234, 0.85);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
`;

const Hint = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(240, 215, 123, 0.9);
`;