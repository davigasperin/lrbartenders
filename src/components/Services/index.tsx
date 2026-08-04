'use client';

import { useLayoutEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { gsap } from '@/lib/gsap';
import { SERVICES } from '@/lib/content';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { usePrefersReducedMotion } from '@/hooks/useMedia';

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-service-card]', { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from('[data-service-card]', {
        y: 60,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = gsap.utils.mapRange(0, rect.width, 8, -8, x);
    const rotateX = gsap.utils.mapRange(0, rect.height, -8, 8, y);

    gsap.to(card, {
      rotateY,
      rotateX,
      transformPerspective: 700,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 700,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <Section ref={sectionRef} id="servicos" className="section">
      <Container>
        <SectionTitle
          eyebrow="O que oferecemos"
          title={
            <>
              Serviços para <em>todos os momentos</em>
            </>
          }
          subtitle="Do welcome drink ao bar de autor: estruturas premium para casamentos, formaturas, corporativos e qualquer celebração."
        />

        <Grid>
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              data-service-card
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <ImageWrap>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <IconBadge>
                  <ServiceIcon name={service.icon} size={26} />
                </IconBadge>
              </ImageWrap>
              <CardBody>
                <CardTitle>{service.title}</CardTitle>
                <CardText>{service.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundoAlt};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  perspective: 1200px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.large};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.fundo};
  border: 1px solid rgba(201, 162, 39, 0.18);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  transform-style: preserve-3d;
  will-change: transform;

  &:hover {
    border-color: ${({ theme }) => theme.colors.dourado};
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
`;

const IconBadge = styled.div`
  position: absolute;
  bottom: -22px;
  left: 24px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  border: 1px solid ${({ theme }) => theme.colors.dourado};
  box-shadow: 0 0 20px rgba(201, 162, 39, 0.35);
`;

const CardBody = styled.div`
  padding: 34px 24px 26px;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.texto};
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
