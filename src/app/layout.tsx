import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import styled from 'styled-components';

import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/lib/theme-provider';
import { SITE } from '@/lib/site';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { Sidebar } from '@/components/Sidebar';

const serif = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'LR Bartenders | Premium Open Bar para Festas e Eventos',
  description:
    'Sua festa merece o melhor! Bartenders profissionais, coquetelaria premium, cascata de chocolate, açaí e muito mais para eventos em Campinas e região.',
  keywords: [
    'bartender',
    'open bar',
    'coquetelaria',
    'drinks',
    'eventos',
    'casamento',
    'Campinas',
  ],
  openGraph: {
    title: 'LR Bartenders',
    description: 'Sua festa merece o melhor! Premium open bar para festas e eventos.',
    locale: 'pt_BR',
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1600,
        height: 1557,
        alt: 'LR Bartenders',
      },
    ],
  },
};

const AppWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  position: relative;
  width: 100%;

  @media (min-width: 1025px) {
    margin-left: 280px;
    width: auto;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <AppWrapper>
              <Sidebar />
              <MainContent id="main-content">{children}</MainContent>
            </AppWrapper>
            <WhatsAppFloat />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}