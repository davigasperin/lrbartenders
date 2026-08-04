'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { SITE } from '@/lib/site';

export function ContactInfo() {
  return (
    <Wrap>
      <Title>Fale com a gente</Title>
      <Text>Atendemos Campinas e região. Preferimos WhatsApp, mas é só escolher o canal.</Text>

      <List>
        <Item>
          <Icon aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </Icon>
          <div>
            <strong>Telefone</strong>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
        </Item>

        <Item>
          <Icon aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Icon>
          <div>
            <strong>WhatsApp</strong>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              {SITE.whatsappDisplay}
            </a>
          </div>
        </Item>

        <Item>
          <Icon aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </Icon>
          <div>
            <strong>E-mail</strong>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </Item>

        <Item>
          <Icon aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </Icon>
          <div>
            <strong>Instagram</strong>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              {SITE.instagram}
            </a>
          </div>
        </Item>
      </List>

      <CtaCard>
        <CtaTitle>Prefere um atendimento direto?</CtaTitle>
        <CtaText>Chame no WhatsApp e agende uma degustação.</CtaText>
        <Link href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar uma degustação.')}`} target="_blank" rel="noopener noreferrer">
          Chamar no WhatsApp
        </Link>
      </CtaCard>
    </Wrap>
  );
}

const Wrap = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textoMuted};
  line-height: 1.7;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 14px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 1px solid rgba(201, 162, 39, 0.16);
  background: rgba(11, 58, 63, 0.24);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(201, 162, 39, 0.45);
  }

  strong {
    display: block;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.douradoClaro};
  }

  a {
    color: ${({ theme }) => theme.colors.texto};
    font-size: 0.97rem;
    transition: color 0.25s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.douradoClaro};
    }
  }
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.dourado};
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.08);
`;

const CtaCard = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.large};
  background: linear-gradient(
    135deg,
    rgba(11, 58, 63, 0.85),
    rgba(90, 31, 46, 0.9)
  );
  border: 1px solid rgba(201, 162, 39, 0.3);

  a {
    display: inline-block;
    margin-top: 14px;
    padding: 12px 22px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.92rem;
    color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.douradoClaro} 0%,
      ${({ theme }) => theme.colors.dourado} 60%,
      ${({ theme }) => theme.colors.douradoEscuro} 100%
    );
    box-shadow: ${({ theme }) => theme.shadows.gold};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.shadows.goldStrong};
    }
  }
`;

const CtaTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const CtaText = styled.p`
  margin-top: 6px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
