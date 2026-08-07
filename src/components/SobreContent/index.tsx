'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Container from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { gsap } from '@/lib/gsap';
import { ABOUT_PAGE } from '@/lib/content';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMedia';

export function SobreContent() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced || isMobile) {
        gsap.set('[data-sobre-anim]', { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from('[data-sobre-anim]', {
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

      gsap.fromTo(
        '[data-sobre-image]',
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, reduced]);

  const { history, pillars } = ABOUT_PAGE;

  return (
    <Section ref={sectionRef} className="section">
      <SobreGrid>
        <Visual data-sobre-anim>
          <Frame>
            <Image
              data-sobre-image
              src={history.image}
              alt="Bartender da LR Bartenders preparando coquetéis"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              style={{ objectFit: 'cover' }}
            />
          </Frame>
        </Visual>

        <Content>
          <SectionTitle
            align="left"
            eyebrow={history.eyebrow}
            title={
              <>
                Uma jornada de <em>sabor</em> desde 2012
              </>
            }
          />
          {history.paragraphs.map((p) => (
            <Paragraph key={p.slice(0, 24)} data-sobre-anim>
              {p}
            </Paragraph>
          ))}
          <Stats data-sobre-anim>
            {history.stats.map((stat) => (
              <Stat key={stat.label}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </Stat>
            ))}
          </Stats>
        </Content>
      </SobreGrid>

      <Pillars>
        <PillarsInner>
          <SectionTitle
            eyebrow="O que nos move"
            title={
              <>
                Nossa <em>essência</em>
              </>
            }
          />
          <PillarsGrid>
            {pillars.map((p) => (
              <PillarCard key={p.id} data-sobre-anim>
                <PillarNumber>0{pillars.indexOf(p) + 1}</PillarNumber>
                <PillarTitle>{p.title}</PillarTitle>
                <PillarText>{p.text}</PillarText>
              </PillarCard>
            ))}
          </PillarsGrid>
        </PillarsInner>
      </Pillars>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
`;

const SobreGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 64px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Visual = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  max-height: 640px;
  width: 100%;
  margin: 0 auto;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.large};
  border: 1px solid rgba(201, 162, 39, 0.35);
  box-shadow: ${({ theme }) => theme.shadows.card};

  &::after {
    content: '';
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(201, 162, 39, 0.28);
    border-radius: ${({ theme }) => theme.radius.medium};
    pointer-events: none;
  }
`;

const Content = styled.div``;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textoMuted};
  margin-bottom: 14px;
  line-height: 1.75;
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
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.dourado};
`;

const StatLabel = styled.div`
  margin-top: 4px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Pillars = styled.div`
  margin-top: ${({ theme }) => theme.spacing[96]};
  padding: ${({ theme }) => theme.spacing[48]} 0;
  background: linear-gradient(180deg, transparent, rgba(201, 162, 39, 0.04), transparent);
`;

const PillarsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[24]};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.article`
  position: relative;
  padding: 32px 28px;
  border: 1px solid rgba(201, 162, 39, 0.18);
  border-radius: ${({ theme }) => theme.radius.large};
  background: rgba(6, 35, 39, 0.32);
  transition: transform 0.35s ease, border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(201, 162, 39, 0.5);
  }
`;

const PillarNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.dourado};
  letter-spacing: 0.2em;
`;

const PillarTitle = styled.h3`
  margin: 12px 0 10px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.45rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const PillarText = styled.p`
  font-size: 0.97rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
