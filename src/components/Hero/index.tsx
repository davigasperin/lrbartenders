'use client';

import { useLayoutEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';

import { gsap, SplitText } from '@/lib/gsap';
import { SITE } from '@/lib/site';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMedia';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const splitRef = useRef<SplitText[] | null>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero-anim]', { autoAlpha: 1, y: 0 });
        return;
      }

      const split = gsap.utils
        .toArray<HTMLElement>('[data-hero-title]')
        .map((el) => new SplitText(el, { type: 'chars,words' }));

      const chars = split.flatMap((s) => s.chars);

      gsap.from(chars, {
        y: 70,
        autoAlpha: 0,
        rotateX: -40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.035,
        delay: 0.15,
      });

      gsap.from('[data-hero-anim]', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.4,
      });

      gsap.to('[data-scroll-indicator]', {
        y: 12,
        autoAlpha: 0.25,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      splitRef.current = split;
    }, sectionRef);

    return () => {
      splitRef.current?.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [reduced]);

  return (
    <HeroSection ref={sectionRef}>
      <CanvasLayer aria-hidden="true">
        <HeroCanvas reduced={reduced || isMobile} />
      </CanvasLayer>

      <Overlay aria-hidden="true" />

      <Content>
        <Eyebrow data-hero-anim>{SITE.tagline}</Eyebrow>
        <Title data-hero-title>
          <span>LR</span> <span>Bartenders</span>
        </Title>
        <Subtitle data-hero-anim>{SITE.slogan}</Subtitle>
        <Description data-hero-anim>
          Coquetelaria premium, cascata de chocolate, açaí, gin e muito mais
          para tornar o seu evento inesquecível.
        </Description>
        <CtaRow data-hero-anim>
          <PrimaryCta href="/orcamento">Solicitar Orçamento</PrimaryCta>
          <GhostCta href="/contato">Agende uma Degustação</GhostCta>
        </CtaRow>
      </Content>

      <ScrollIndicator data-scroll-indicator aria-hidden="true">
        <span>Role</span>
        <Mouse>
          <Wheel />
        </Mouse>
      </ScrollIndicator>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
`;

const CanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.base};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  background: ${({ theme }) => theme.gradients.hero};
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  max-width: 900px;
  padding: 120px 24px 80px;
  text-align: center;
`;

const Eyebrow = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.douradoClaro};
  margin-bottom: 18px;

  @media (max-width: 768px) {
    font-size: 0.72rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(3rem, 9vw, 6.5rem);
  color: ${({ theme }) => theme.colors.texto};
  text-transform: uppercase;
  line-height: 1.02;
  perspective: 600px;

  span {
    display: inline-block;
  }

  span:last-child {
    background: ${({ theme }) => theme.gradients.goldText};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: clamp(1.1rem, 2.4vw, 1.6rem);
  color: ${({ theme }) => theme.colors.dourado};
`;

const Description = styled.p`
  margin: 22px auto 0;
  max-width: 620px;
  font-size: 1.02rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const CtaRow = styled.div`
  margin-top: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const baseCta = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 30px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-3px); }
`;

const PrimaryCta = styled(Link)`
  ${baseCta}
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.douradoClaro} 0%,
    ${({ theme }) => theme.colors.dourado} 60%,
    ${({ theme }) => theme.colors.douradoEscuro} 100%
  );
  animation: ctaGlow 2.6s ease-in-out infinite;

  @keyframes ctaGlow {
    0%,
    100% {
      box-shadow: 0 0 16px rgba(201, 162, 39, 0.4);
    }
    50% {
      box-shadow: 0 0 34px rgba(240, 215, 123, 0.7);
    }
  }
`;

const GhostCta = styled(Link)`
  ${baseCta}
  color: ${({ theme }) => theme.colors.texto};
  border: 1px solid rgba(201, 162, 39, 0.6);
  background: rgba(7, 37, 41, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  span {
    font-size: 0.68rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.douradoClaro};
  }
`;

const Mouse = styled.div`
  width: 26px;
  height: 42px;
  border: 2px solid ${({ theme }) => theme.colors.dourado};
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;

const Wheel = styled.div`
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.dourado};
`;
