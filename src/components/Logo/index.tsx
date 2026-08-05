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

const Tile = styled.span`
  display: inline-flex;
  padding: 5px;
  background: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  border: 1px solid rgba(201, 162, 39, 0.5);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.45), 0 0 18px rgba(201, 162, 39, 0.12);
`;

const Mark = styled(Image)<{ $size: number }>`
  width: auto;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
`;
