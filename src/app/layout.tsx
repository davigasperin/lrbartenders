import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/lib/theme-provider';

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
