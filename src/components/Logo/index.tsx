'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { SITE } from '@/lib/site';

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
};

export function Logo({ size = 40, showWordmark = true }: LogoProps) {
  return (
    <Wrapper>
      <Mark
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F7E4A8" />
            <stop offset="55%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#9A7A1F" />
          </linearGradient>
        </defs>

        <circle
          cx="32"
          cy="32"
          r="26"
          stroke="url(#logoGold)"
          strokeWidth="2"
          opacity="0.9"
        />

        <path
          d="M30.4 5.2c.4-1 2.8-1 3.2 0l1.9 4.9 5.2.1c1 .1 1.4 1.4.6 2l-4.1 3.3 1.4 5c.3.9-.8 1.7-1.6 1.1l-4.4-3-4.4 3c-.8.6-1.9-.2-1.6-1.1l1.4-5-4.1-3.3c-.8-.6-.4-1.9.6-2l5.2-.1 1.9-4.9z"
          fill="url(#logoGold)"
        />

        <path
          d="M11.5 15.5c-1.6-2.4-3.4-5.8-3.4-5.8s3.4.2 5.8 1.6"
          stroke="url(#logoGold)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M52.5 15.5c1.6-2.4 3.4-5.8 3.4-5.8s-3.4.2-5.8 1.6"
          stroke="url(#logoGold)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />

        <path
          d="M17.5 20.5h29l-4 21.5h-21z"
          stroke="url(#logoGold)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M28 42v5.5h8V42"
          stroke="url(#logoGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M25.5 50.5h13"
          stroke="url(#logoGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20 27.5c3.5-1.5 6.5 3 9 0 2.5 3 5.5-1.5 9 0"
          stroke="url(#logoGold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
      </Mark>
      {showWordmark && (
        <Wordmark>
          <Name>{SITE.name}</Name>
          <Slogan>{SITE.slogan}</Slogan>
        </Wordmark>
      )}
    </Wrapper>
  );
}

export function LogoHeader({ href }: { href: string }) {
  return (
    <Link href={href} aria-label={SITE.name}>
      <Logo />
    </Link>
  );
}

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.dourado};
`;

const Mark = styled.svg`
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(201, 162, 39, 0.35));
`;

const Wordmark = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const Name = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.texto};
  white-space: nowrap;
`;

const Slogan = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.dourado};
  white-space: nowrap;
`;
