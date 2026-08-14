'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

import { Logo } from '@/components/Logo';
import { NAV_LINKS, SITE } from '@/lib/site';
import { useIsMobile } from '@/hooks/useMedia';

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile('(max-width: 1024px)');
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <MobileBar>
        <MobileBrand href="/" aria-label={`${SITE.name} — home`}>
          <Logo size={50} framed={false} />
        </MobileBrand>
        <HamburgerButton
          ref={toggleRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          aria-controls="sidebar"
        >
          <span />
          <span />
          <span />
        </HamburgerButton>
      </MobileBar>

      <MobileOverlay $isOpen={isOpen} onClick={closeSidebar} aria-hidden={!isOpen} />

      <SidebarContainer
        id="sidebar"
        $isOpen={isOpen}
        inert={isMobile && !isOpen ? true : undefined}
      >
        <SidebarHeader>
          <BrandLink href="/" aria-label={`${SITE.name} — home`} onClick={closeSidebar}>
            <Logo size={88} framed={false} />
          </BrandLink>
        </SidebarHeader>

        <SidebarNav>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              $active={pathname === link.href}
              onClick={closeSidebar}
            >
              {link.label}
            </NavLink>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <ContactInfo>
            <ContactTitle>Contato</ContactTitle>
            <ContactList>
              <ContactItem>
                <ContactLabel>Telefone:</ContactLabel>
                <ContactValue as="a" href="tel:+551933677990">
                  (19) 3367-7990
                </ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>WhatsApp:</ContactLabel>
                <ContactValue as="a" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsappDisplay}
                </ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Email:</ContactLabel>
                <ContactValue as="a" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </ContactValue>
              </ContactItem>
            </ContactList>
          </ContactInfo>

          <SocialLinks>
            <SocialLink
              href="https://www.facebook.com/lrbartenders/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/lrbartenders/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0116 11.37z" />
                <line x1="12" y1="17" x2="12" y2="17" />
              </svg>
            </SocialLink>
          </SocialLinks>

          <SidebarCta href="/orcamento" onClick={closeSidebar}>
            Solicitar Orçamento
          </SidebarCta>
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
}

const MobileBar = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #000000;
  z-index: 99;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(201, 162, 39, 0.2);

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const MobileBrand = styled(Link)`
  display: inline-flex;
  align-items: center;
`;

const HamburgerButton = styled.button`
  position: absolute;
  right: 20px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.dourado}66;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;

  span {
    display: block;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.colors.douradoClaro};
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  z-index: 101;
  background: #000000;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  overflow-y: auto;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 1024px) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    width: min(300px, 85vw);
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.8);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    justify-content: flex-start;
    margin-bottom: 32px;
  }
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.douradoClaro};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: auto;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.douradoClaro};
    background: rgba(255, 255, 255, 0.05);
  }

  ${({ theme, $active }) =>
    $active &&
    `
    color: ${theme.colors.douradoClaro};
    font-weight: 600;
    background: rgba(201, 162, 39, 0.16);
    box-shadow: inset 0 0 0 1px rgba(201, 162, 39, 0.3);
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.douradoClaro};
    outline-offset: 2px;
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 24px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.douradoClaro};
  margin: 0;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactLabel = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ContactValue = styled.span`
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.douradoClaro};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`;

const SocialLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.douradoClaro};
    color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.douradoClaro};
    outline-offset: 2px;
  }
`;

const SidebarCta = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.douradoClaro} 0%,
    ${({ theme }) => theme.colors.dourado} 60%,
    ${({ theme }) => theme.colors.douradoEscuro} 100%
  );
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.douradoClaro};
    outline-offset: 4px;
  }
`;