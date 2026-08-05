'use client';

import Image from 'next/image';
import styled from 'styled-components';

type LogoProps = {
  size?: number;
};

export function Logo({ size = 40 }: LogoProps) {
  return (
    <Mark
      src="/images/logo.png"
      alt=""
      width={506}
      height={493}
      priority
      $size={size}
    />
  );
}

const Mark = styled(Image)<{ $size: number }>`
  width: auto;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
`;
