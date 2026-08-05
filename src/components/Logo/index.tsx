'use client';

import Image from 'next/image';
import styled from 'styled-components';

type LogoProps = {
  size?: number;
};

export function Logo({ size = 52 }: LogoProps) {
  return (
    <Tile>
      <Mark
        src="/images/logo.png"
        alt=""
        width={370}
        height={392}
        priority
        $size={size}
      />
    </Tile>
  );
}

const Tile = styled.span`
  display: inline-flex;
  padding: 8px;
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.verdePetroleoClaro} 0%,
    ${({ theme }) => theme.colors.verdePetroleoEscuro} 100%
  );
  border: 1px solid rgba(201, 162, 39, 0.55);
  border-radius: 14px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.45), 0 0 18px rgba(201, 162, 39, 0.14);
`;

const Mark = styled(Image)<{ $size: number }>`
  width: auto;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.55));
`;
