'use client';

import { useLayoutEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { buttonBase, buttonSizes, buttonVariants } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';
import { SITE } from '@/lib/site';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMedia';
import { usePointerTilt } from '@/hooks/usePointerTilt';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => <CanvasPlaceholder />,
});

function CanvasPlaceholder() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #031A1D 0%, #062327 42%, #471828 100%)',
      }}
      aria-hidden="true"
    />
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const medallionTiltRef = usePointerTilt<HTMLElement>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero-anim]', { autoAlpha: 1, y: 0 });
        gsap.set('[data-hero-image]', { autoAlpha: 1, y: 0, rotateY: 0 });
        gsap.set('[data-hero-logo]', { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo('[data-hero-anim]',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.4,
        },
      );

      gsap.fromTo('[data-hero-image]',
        { y: 40, autoAlpha: 0, rotateY: -8 },
        {
          y: 0,
          autoAlpha: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
        },
      );

      gsap.fromTo('[data-hero-logo]',
        { y: 30, autoAlpha: 0, scale: 0.92 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.15,
        },
      );

      gsap.to('[data-scroll-indicator]', {
        y: 12,
        autoAlpha: 0.25,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <HeroSection ref={sectionRef}>
      <CanvasLayer aria-hidden="true">
        <HeroCanvas reduced={reduced || isMobile} />
      </CanvasLayer>

      <Overlay aria-hidden="true" />

      <HeroImageFrame data-hero-image>
        <Image
          src="/images/hero.jpg"
          alt="Close-up de coquetel premium servido pela LR Bartenders"
          fill
          sizes="(max-width: 1500px) 0vw, 22vw"
          style={{ objectFit: 'cover' }}
        />
      </HeroImageFrame>

      <Content>
        <Eyebrow data-hero-anim>{SITE.tagline}</Eyebrow>
        <HeroTitle data-hero-logo>
          <Medallion ref={medallionTiltRef}>
            <Image
              src="/images/logo.jpeg"
              alt="LR Bartenders"
              width={1600}
              height={1557}
              priority
              unoptimized
              style={{ width: 'auto', height: 'clamp(150px, 30vh, 300px)' }}
            />
          </Medallion>
        </HeroTitle>
        <Description data-hero-anim>
          Coquetelaria premium, cascata de chocolate, açaí, gin e muito mais
          para tornar o seu evento inesquecível.
        </Description>
        <CtaRow data-hero-anim>
          <PrimaryCta href="/orcamento">Solicitar Orçamento</PrimaryCta>
          <GhostCta href="/contato">Agende uma Degustação</GhostCta>
        </CtaRow>

        <HeroImageInline data-hero-anim>
          <Image
            src="/images/hero.jpg"
            alt="Close-up de coquetel premium servido pela LR Bartenders"
            fill
            sizes="(min-width: 1500px) 0vw, 62vw"
            style={{ objectFit: 'cover' }}
          />
        </HeroImageInline>
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

  @media (min-width: 1500px) {
    max-width: 800px;
  }
`;

const HeroImageFrame = styled.figure`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 6%;
  margin: auto 0;
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  width: clamp(240px, 22vw, 340px);
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid rgba(201, 162, 39, 0.45);
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  background: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    inset: 12px;
    z-index: 2;
    border: 1px solid rgba(201, 162, 39, 0.3);
    border-radius: ${({ theme }) => theme.radius.medium};
    pointer-events: none;
  }

  @media (max-width: 1500px) {
    display: none;
  }
`;

const HeroImageInline = styled.figure`
  position: relative;
  width: min(240px, 62vw);
  aspect-ratio: 2 / 3;
  margin: 28px auto 0;
  overflow: hidden;
  border: 1px solid rgba(201, 162, 39, 0.45);
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  background: ${({ theme }) => theme.colors.verdePetroleoEscuro};

  &::after {
    content: '';
    position: absolute;
    inset: 12px;
    z-index: 2;
    border: 1px solid rgba(201, 162, 39, 0.3);
    border-radius: ${({ theme }) => theme.radius.medium};
    pointer-events: none;
  }

  @media (min-width: 1500px) {
    display: none;
  }
`;

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.type.label};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.douradoClaro};
  margin-bottom: 18px;

  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.type.labelSm};
    letter-spacing: 0.18em;
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  line-height: 1;
  display: flex;
  justify-content: center;
`;

const Medallion = styled.figure`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0px, 1vw, 6px);
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  border: 1px solid rgba(201, 162, 39, 0.55);
  box-shadow: 0 0 50px rgba(201, 162, 39, 0.25),
    0 24px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 12px;
    border: 1px solid rgba(201, 162, 39, 0.3);
    pointer-events: none;
  }
`;

const Description = styled.p`
  margin: 22px auto 0;
  max-width: 52ch;
  font-size: ${({ theme }) => theme.type.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const CtaRow = styled.div`
  margin-top: ${({ theme }) => theme.spacing[40]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const PrimaryCta = styled(Link)`
  ${buttonBase}
  ${buttonSizes.md}
  ${buttonVariants.primary}
`;
const GhostCta = styled(Link)`
  ${buttonBase}
  ${buttonSizes.md}
  ${buttonVariants.ghost}
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
