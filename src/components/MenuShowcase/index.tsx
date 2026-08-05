'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { MENUS } from '@/lib/content';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMedia';

export function MenuShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      if (reduced || isMobile) {
        return;
      }

      const getAmount = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.from('[data-menu-panel]', {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [isMobile, reduced]);

  return (
    <Section ref={sectionRef} id="cardapios">
      <Intro>
        <SectionTitle
          eyebrow="Cardápios"
          title={
            <>
              Uma carta para <em>cada ocasião</em>
            </>
          }
          subtitle="Seis menus exclusivos elaborados pela nossa coquetelaria. Role e viaje por eles."
        />
      </Intro>

      <TrackWrap $mobile={isMobile || reduced}>
        <Track ref={trackRef}>
          {MENUS.map((menu) => (
            <Panel key={menu.id} data-menu-panel>
              <DecoFrame>
                <DecoCorner className="tl" />
                <DecoCorner className="tr" />
                <DecoCorner className="bl" />
                <DecoCorner className="br" />
                <PanelImage>
                  <Image
                    src={menu.image}
                    alt={menu.title}
                    fill
                    sizes="(max-width: 1024px) 85vw, 560px"
                    style={{ objectFit: 'cover' }}
                  />
                </PanelImage>
              </DecoFrame>
              <PanelNumber>{menu.number}</PanelNumber>
              <PanelTitle>{menu.title}</PanelTitle>
              <PanelText>{menu.description}</PanelText>
            </Panel>
          ))}
        </Track>
      </TrackWrap>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: max(100svh, 640px);

  @media (max-width: 1024px) {
    height: auto;
    padding: 80px 0;
  }
`;

const Intro = styled.div`
  padding: 0 24px;
`;

const TrackWrap = styled.div<{ $mobile: boolean }>`
  margin-top: ${({ theme }) => theme.spacing[24]};

  ${({ $mobile }) =>
    $mobile
      ? `
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding: 0 24px 16px;
    &::-webkit-scrollbar { display: none; }
  `
      : `overflow: hidden;`}
`;

const Track = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[32]};
  width: max-content;
  padding: 0 24px;
  will-change: transform;

  @media (max-width: 1024px) {
    gap: ${({ theme }) => theme.spacing[24]};
    padding: 0;
  }
`;

const Panel = styled.article`
  position: relative;
  width: min(520px, 86vw);
  flex-shrink: 0;
  scroll-snap-align: center;

  @media (max-width: 1024px) {
    width: min(560px, 82vw);
  }
`;

const DecoFrame = styled.div`
  position: relative;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.large};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(201, 162, 39, 0.55);
    border-radius: ${({ theme }) => theme.radius.large};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const DecoCorner = styled.span`
  position: absolute;
  width: 34px;
  height: 34px;
  z-index: 2;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.dourado};
    box-shadow: 0 0 8px rgba(201, 162, 39, 0.5);
  }

  &.tl {
    top: -1px;
    left: -1px;

    &::before {
      top: 0;
      left: 0;
      width: 34px;
      height: 2px;
      transform-origin: left top;
      transform: rotate(90deg);
    }

    &::after {
      top: 0;
      left: 0;
      width: 34px;
      height: 2px;
    }
  }

  &.tr {
    top: -1px;
    right: -1px;

    &::before {
      top: 0;
      right: 0;
      width: 34px;
      height: 2px;
    }

    &::after {
      top: 0;
      right: 0;
      width: 2px;
      height: 34px;
    }
  }

  &.bl {
    bottom: -1px;
    left: -1px;

    &::before {
      bottom: 0;
      left: 0;
      width: 34px;
      height: 2px;
    }

    &::after {
      bottom: 0;
      left: 0;
      width: 2px;
      height: 34px;
    }
  }

  &.br {
    bottom: -1px;
    right: -1px;

    &::before {
      bottom: 0;
      right: 0;
      width: 34px;
      height: 2px;
    }

    &::after {
      bottom: 0;
      right: 0;
      width: 2px;
      height: 34px;
    }
  }
`;

const PanelImage = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;
`;

const PanelNumber = styled.div`
  margin-top: ${({ theme }) => theme.spacing[16]};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.95rem;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.dourado};
`;

const PanelTitle = styled.h3`
  margin-top: 6px;
  font-size: 1.9rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const PanelText = styled.p`
  margin-top: 10px;
  max-width: 460px;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
