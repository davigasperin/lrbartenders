'use client';

import styled from 'styled-components';

const paths: Record<string, string> = {
  crown:
    'M12 2l2.8 4.4 5-.8-2.6 4.6 4.6 2.6-4.6 2.6 2.6 4.6-5-.8L12 22l-2.8-4.4-5 .8 2.6-4.6L2.2 11l4.6-2.6-2.6-4.6 5 .8L12 2z',
  chocolate:
    'M4 8h16v4a6 6 0 01-6 6h-4a6 6 0 01-6-6V8zm8 6a3 3 0 100 6 3 3 0 000-6zM6 4h12v4H6V4zM12 17a1 1 0 100 2 1 1 0 000-2z',
  coffee:
    'M4 8h14v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zm2 3v3a3 3 0 003 3h4a3 3 0 003-3v-3H6zm14 0h1a2 2 0 012 2v1a2 2 0 01-2 2h-1v-5zM7 21h10v2H7v-2z',
  acai:
    'M12 3c2.5 0 4.5 2 4.5 4.5 0 1.5-.7 2.8-1.8 3.7l2 3.8h-9.4l2-3.8c-1.1-.9-1.8-2.2-1.8-3.7C7.5 5 9.5 3 12 3zm-1.5 11h3l-1.5 3-1.5-3zm1.5 4l2 3h-4l2-3z',
  gin:
    'M7 3h10l-1 6h-8L7 3zm2 8h6l-1 10h-4L9 11zm3 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 3l-2 4h4l-2-4z',
  caipirinha:
    'M12 2v2m0 0l-1 6h2l-1-6zM5 12h14l-1 8a2 2 0 01-2 2H8a2 2 0 01-2-2l-1-8zm4 2v4m6-4v4',
};

type ServiceIconProps = {
  name: string;
  size?: number;
};

export function ServiceIcon({ name, size = 24 }: ServiceIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.crown} fill="currentColor" fillOpacity="0.18" />
      <path d={paths[name] ?? paths.crown} />
    </Svg>
  );
}

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.dourado};
`;
