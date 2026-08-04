'use client';

import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </SCThemeProvider>
  );
}
