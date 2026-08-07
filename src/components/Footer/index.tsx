'use client';

import Link from 'next/link';
import styled from 'styled-components';

import Container from '@/components/ui/Container';
import { Logo } from '@/components/Logo';
import { NAV_LINKS, SITE } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterTag>
      <TopGrid>
        <Brand>
          <Link href="/" aria-label={`${SITE.name} — home`}>
            <Logo size={64} />
          </Link>
          <Tagline>{SITE.tagline}.</Tagline>
        </Brand>

        <Column>
          <Heading>Navegação</Heading>
          {NAV_LINKS.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </Column>

        <Column>
          <Heading>Contato</Heading>
          <FooterLink href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')}`} target="_blank" rel="noopener noreferrer" aria-label={`Falar com ${SITE.name} via WhatsApp`}>WhatsApp: {SITE.whatsappDisplay}</FooterLink>
          <FooterLink href={`mailto:${SITE.email}`} aria-label={`Enviar e-mail para ${SITE.name}`}>{SITE.email}</FooterLink>
          <FooterLink href={SITE.instagramUrl} aria-label={`Instagram do ${SITE.name}`}>Instagram: {SITE.instagram}</FooterLink>
        </Column>

        <Column>
          <Heading>Redes sociais</Heading>
          <SocialRow>
            <Social href={SITE.instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </Social>
            <Social href={SITE.facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </Social>
          </SocialRow>
          <SmallText>{SITE.city}</SmallText>
        </Column>
      </TopGrid>

      <Bottom>
        <Container>
          <Copy>
            © {year} {SITE.name}. Todos os direitos reservados. {SITE.slogan}
          </Copy>
        </Container>
      </Bottom>
    </FooterTag>
  );
}

const FooterTag = styled.footer`
  background: ${({ theme }) => theme.colors.fundo};
  border-top: 1px solid rgba(201, 162, 39, 0.18);
`;

const TopGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr 1fr;
  gap: 40px;
  padding-top: 64px;
  padding-bottom: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div``;

const Tagline = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.textoMuted};
  font-size: ${({ theme }) => theme.type.bodySm};
  max-width: 260px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled.h4`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.type.label};
  letter-spacing: ${({ theme }) => theme.tracking.labelTight};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.dourado};
  margin-bottom: 6px;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textoMuted};
  font-size: ${({ theme }) => theme.type.bodySm};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.base};
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.colors.douradoClaro};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.dourado};
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
`;

const Social = styled(Link)`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(201, 162, 39, 0.45);
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.colors.dourado};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    background: rgba(201, 162, 39, 0.12);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.dourado};
    outline-offset: 2px;
  }
`;

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 8.5V7c0-.8.7-1.5 1.5-1.5H17V3h-2.5A3.5 3.5 0 0011 6.5v2H9v3h2v9h3v-9h2.5l.5-3H14z" />
  </svg>
);

const SmallText = styled.p`
  color: ${({ theme }) => theme.colors.textoMuted};
  font-size: ${({ theme }) => theme.type.bodyXs};
  margin-top: 8px;
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(201, 162, 39, 0.18);
  padding: 20px 0;
`;

const Copy = styled.p`
  color: ${({ theme }) => theme.colors.textoMuted};
  font-size: ${({ theme }) => theme.type.bodyXs};
  text-align: center;
`;
