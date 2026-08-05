'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Container from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ABOUT } from '@/lib/content';
import { usePrefersReducedMotion } from '@/hooks/useMedia';

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-about-anim]', { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from('[data-about-anim]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      if (imageRef.current) {
        const floatAnim = gsap.to(imageRef.current, {
          y: 14,
          duration: 2.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onLeave: () => floatAnim.pause(),
          onEnterBack: () => floatAnim.resume(),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section ref={sectionRef} id="sobre" className="section">
      <AboutGrid>
        <Content>
          <SectionTitle
            align="left"
            eyebrow="Sobre nós"
            title={
              <>
                Coquetelaria premium, <em>do seu jeito</em>
              </>
            }
          />
          <Lead data-about-anim>{ABOUT.lead}</Lead>
          {ABOUT.paragraphs.map((p) => (
            <Paragraph key={p.slice(0, 20)} data-about-anim>
              {p}
            </Paragraph>
          ))}
          <Stats data-about-anim>
            {ABOUT.stats.map((stat) => (
              <Stat key={stat.label}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </Stat>
            ))}
          </Stats>
          <Highlight data-about-anim>
            “Se você é um bom apreciador de bebidas, adoraríamos conhecê-lo.”
          </Highlight>
        </Content>

        <Visual data-about-anim>
          <Frame ref={imageRef}>
            <Image
              src={ABOUT.image}
              alt="Bartender da LR Bartenders preparando drinks em evento"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              style={{ objectFit: 'cover' }}
            />
          </Frame>
        </Visual>
      </AboutGrid>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
  position: relative;
  overflow: hidden;
`;

const AboutGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Content = styled.div``;

const Lead = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.type.lead};
  line-height: ${({ theme }) => theme.lineHeights.lead};
  color: ${({ theme }) => theme.colors.douradoClaro};
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textoMuted};
  font-size: ${({ theme }) => theme.type.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  margin-bottom: 14px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 28px 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 18px 8px;
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: ${({ theme }) => theme.radius.medium};
  background: rgba(201, 162, 39, 0.04);
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.type.headingLg};
  color: ${({ theme }) => theme.colors.dourado};
`;

const StatLabel = styled.div`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.type.bodyXs};
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Highlight = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: ${({ theme }) => theme.type.body};
  color: ${({ theme }) => theme.colors.dourado};
`;

const Visual = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  max-height: 620px;
  margin: 0 auto;
  width: 100%;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.large};
  border: 1px solid rgba(201, 162, 39, 0.35);
  box-shadow: ${({ theme }) => theme.shadows.card};
`;
