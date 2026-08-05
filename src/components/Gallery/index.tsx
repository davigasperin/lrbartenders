'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styled from 'styled-components';

import Container from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { gsap } from '@/lib/gsap';
import { GALLERY } from '@/lib/content';
import { usePrefersReducedMotion } from '@/hooks/useMedia';

const slides = GALLERY.map((src) => ({ src }));

const ratios = [
  '4 / 5',
  '1 / 1',
  '3 / 4',
  '4 / 3',
  '1 / 1',
  '3 / 4',
  '4 / 5',
  '1 / 1',
  '4 / 3',
];

export function Gallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(-1);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-gallery-item]', { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from('[data-gallery-item]', {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section ref={sectionRef} id="galeria" className="section">
      <Container>
        <SectionTitle
          eyebrow="Galeria"
          title={
            <>
              Momentos <em>inesquecíveis</em>
            </>
          }
          subtitle="Um pouco do que já fizemos acontecer em casamentos, formaturas, corporativos e festas."
        />

        <Masonry>
          {GALLERY.map((src, i) => (
            <Item key={src} data-gallery-item>
              <Tile onClick={() => setIndex(i)} $ratio={ratios[i % ratios.length]} aria-label={`Abrir imagem ${i + 1} — Evento LR Bartenders`}>
                <Image
                  src={src}
                  alt={`Evento LR Bartenders ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <Overlay>
                  <ExpandIcon aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </ExpandIcon>
                </Overlay>
              </Tile>
            </Item>
          ))}
        </Masonry>
      </Container>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundoAlt};
`;

const Masonry = styled.div`
  columns: 3;
  column-gap: 28px;

  @media (max-width: 1024px) {
    columns: 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    columns: 1;
  }
`;

const Item = styled.figure`
  break-inside: avoid;
  margin: 0 0 28px;
`;

const Tile = styled.button<{ $ratio: string }>`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border: none;
  padding: 0;
  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;
  cursor: zoom-in;
  transition: transform 0.45s cubic-bezier(0.2, 0.6, 0.2, 1);
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(900px) scale(1.03) rotateX(1.5deg);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.dourado};
    outline-offset: 4px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 10, 12, 0.55);
  opacity: 0;
  transition: opacity 0.35s ease;

  ${Tile}:hover & {
    opacity: 1;
  }
`;

const ExpandIcon = styled.span`
  position: relative;
  width: 40px;
  height: 40px;

  span {
    position: absolute;
    width: 14px;
    height: 14px;
    border-color: ${({ theme }) => theme.colors.dourado};
    border-style: solid;
  }

  span:nth-child(1) {
    top: 0;
    left: 0;
    border-width: 2px 0 0 2px;
  }

  span:nth-child(2) {
    top: 0;
    right: 0;
    border-width: 2px 2px 0 0;
  }

  span:nth-child(3) {
    bottom: 0;
    left: 0;
    border-width: 0 0 2px 2px;
  }

  span:nth-child(4) {
    bottom: 0;
    right: 0;
    border-width: 0 2px 2px 0;
  }
`;
