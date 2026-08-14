'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { usePointerTilt } from '@/hooks/usePointerTilt';

type LogoProps = {
  size?: number;
  framed?: boolean;
};

export function Logo({ size = 52, framed = true }: LogoProps) {
  const tiltRef = usePointerTilt<HTMLSpanElement>();

  return (
    <Tile ref={tiltRef} $framed={framed}>
      <Mark
        src="/images/logo.jpeg"
        alt=""
        width={1600}
        height={1557}
        priority
        $size={size}
      />
    </Tile>
  );
}

const Tile = styled.span<{ $framed: boolean }>`
  display: inline-flex;
  padding: ${({ $framed }) => ($framed ? '5px' : '0')};
  background: ${({ $framed, theme }) =>
    $framed ? theme.colors.verdePetroleoEscuro : 'transparent'};
  border: ${({ $framed }) =>
    $framed ? '1px solid rgba(201, 162, 39, 0.5)' : 'none'};
  border-radius: ${({ $framed }) => ($framed ? '12px' : '0')};
  box-shadow: ${({ $framed }) =>
    $framed
      ? '0 0 0 1px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 18px rgba(201, 162, 39, 0.12)'
      : 'none'};
`;

const Mark = styled(Image)<{ $size: number }>`
  width: auto;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
`;
