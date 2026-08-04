'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { gsap } from '@/lib/gsap';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  background?: string;
  crumb?: string;
};

const Section = styled.section`
  position: relative;
  min-height: 56vh;
  display: flex;
  align-items: flex-end;
  padding: 11rem 1.5rem 4rem;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 48vh;
    padding-top: 9rem;
  }
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(7, 14, 16, 0.55) 0%,
    rgba(7, 14, 16, 0.72) 55%,
    var(--bg) 100%
  );
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font: 600 0.78rem var(--font-sans);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);

  &::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: var(--gold);
  }
`;

const Title = styled.h1`
  margin: 1rem 0 0;
  font: 700 clamp(2.4rem, 6vw, 4.2rem) var(--font-serif);
  line-height: 1.04;
  color: var(--white);
`;

const Subtitle = styled.p`
  max-width: 52ch;
  margin: 1.1rem 0 0;
  font: 400 1.08rem/1.7 var(--font-sans);
  color: rgba(246, 242, 231, 0.82);
`;

const Crumb = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font: 400 0.82rem var(--font-sans);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(246, 242, 231, 0.55);

  a {
    color: rgba(246, 242, 231, 0.55);
    transition: color 0.25s ease;

    &:hover {
      color: var(--gold);
    }
  }

  span {
    color: var(--gold);
  }
`;

export function PageHero({
  eyebrow,
  title,
  subtitle,
  background = '/images/topo-site-01.jpg',
  crumb = 'Home',
}: PageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ph-el]',
        { y: 42, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={rootRef}>
      <Bg>
        <Image
          src={background}
          alt={title}
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
      </Bg>
      <Overlay />
      <Inner>
        <Eyebrow data-ph-el>{eyebrow}</Eyebrow>
        <Title ref={titleRef} data-ph-el>
          {title}
        </Title>
        {subtitle ? <Subtitle data-ph-el>{subtitle}</Subtitle> : null}
        <Crumb data-ph-el>
          <Link href="/">{crumb}</Link>
          <span>·</span>
          <span>{eyebrow}</span>
        </Crumb>
      </Inner>
    </Section>
  );
}
