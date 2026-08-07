'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { gsap } from '@/lib/gsap';
import { EVENT_TYPES } from '@/lib/content';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMedia';

export function EventTypes() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced || isMobile) {
        gsap.set('[data-event-anim]', { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from('[data-event-anim]', {
        y: 44,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, reduced]);

  return (
    <Section ref={sectionRef} className="section">
      <Inner>
        <SectionTitle
          eyebrow="Onde atuamos"
          title={
            <>
              Eventos para <em>toda celebração</em>
            </>
          }
          subtitle="Das festas mais íntimas às grandes celebrações, a LR Bartenders está presente nos momentos que merecem o melhor."
        />
        <Grid>
          {EVENT_TYPES.map((event) => (
            <Card key={event.id} data-event-anim>
              <ImageWrap>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </ImageWrap>
              <CardBody>
                <CardTitle>{event.title}</CardTitle>
                <CardText>{event.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.large};
  border: 1px solid rgba(201, 162, 39, 0.18);
  background: rgba(6, 35, 39, 0.28);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(201, 162, 39, 0.45);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    transition: transform 0.6s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const CardBody = styled.div`
  padding: 22px 24px 26px;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.texto};
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
