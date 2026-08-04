'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import { Logo } from '@/components/Logo';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { NAV_LINKS, SITE } from '@/lib/site';

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 'max',
        toggleClass: { targets: header, className: 'is-scrolled' },
      });
    }, header);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    const links = drawer.querySelectorAll<HTMLElement>('a');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.set(drawer, { xPercent: 100 })
        .set(overlay, { autoAlpha: 0 })
        .add('open')
        .to(overlay, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 'open')
        .to(
          drawer,
          { xPercent: 0, duration: 0.55, ease: 'power3.out' },
          'open'
        )
        .fromTo(
          links,
          { x: 48, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 },
          'open+=0.18'
        );
      timelineRef.current = tl;
    }, drawer);

    return () => ctx.revert();
  }, []);

  const toggleMenu = (open?: boolean) => {
    const tl = timelineRef.current;
    if (!tl) return;

    const shouldOpen = open ?? !menuOpen;
    setMenuOpen(shouldOpen);

    if (shouldOpen) {
      document.body.style.overflow = 'hidden';
      tl.play();
    } else {
      document.body.style.overflow = '';
      tl.reverse();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <HeaderBar ref={headerRef}>
        <Container>
          <Brand href="/" aria-label={`${SITE.name} — home`}>
            <Logo />
          </Brand>

          <Nav aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                $active={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </Nav>

          <Actions>
            <Cta href="/orcamento">Solicitar Orçamento</Cta>
            <Burger
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              $open={menuOpen}
              onClick={() => toggleMenu()}
            >
              <span />
              <span />
              <span />
            </Burger>
          </Actions>
        </Container>
      </HeaderBar>

      <DrawerOverlay ref={overlayRef} onClick={() => toggleMenu(false)} />

      <Drawer ref={drawerRef} role="dialog" aria-modal="true" aria-label="Menu">
        <DrawerTop>
          <Link href="/" onClick={() => toggleMenu(false)} aria-label="LR Bartenders">
            <Logo size={34} showWordmark={false} />
          </Link>
          <CloseButton onClick={() => toggleMenu(false)} aria-label="Fechar menu">
            <span />
            <span />
          </CloseButton>
        </DrawerTop>

        <DrawerNav>
          {NAV_LINKS.map((link) => (
            <DrawerLink
              key={link.href}
              href={link.href}
              $active={pathname === link.href}
              onClick={() => toggleMenu(false)}
            >
              <Number>0{NAV_LINKS.findIndex((l) => l.href === link.href) + 1}</Number>
              {link.label}
            </DrawerLink>
          ))}
        </DrawerNav>

        <DrawerCta href="/orcamento" onClick={() => toggleMenu(false)}>
          Solicitar Orçamento
        </DrawerCta>
      </Drawer>
    </>
  );
}

const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: transparent;
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease,
    box-shadow 0.4s ease;

  &.is-scrolled {
    background-color: rgba(7, 37, 41, 0.86);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  font-size: 0.92rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.douradoClaro : theme.colors.texto};
  transition: color ${({ theme }) => theme.transitions.base};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.dourado};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.douradoClaro};

    &::after {
      width: 100%;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 22px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.douradoClaro} 0%,
    ${({ theme }) => theme.colors.dourado} 60%,
    ${({ theme }) => theme.colors.douradoEscuro} 100%
  );
  animation: ctaGlow 2.4s ease-in-out infinite;
  white-space: nowrap;
  transition: transform ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
  }

  @keyframes ctaGlow {
    0%,
    100% {
      box-shadow: 0 0 12px rgba(201, 162, 39, 0.35);
    }
    50% {
      box-shadow: 0 0 28px rgba(240, 215, 123, 0.65);
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const Burger = styled.button<{ $open: boolean }>`
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(201, 162, 39, 0.5);
  border-radius: ${({ theme }) => theme.radius.medium};
  background: rgba(7, 37, 41, 0.5);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  span {
    display: block;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.colors.douradoClaro};
    transition: transform ${({ theme }) => theme.transitions.base},
      opacity ${({ theme }) => theme.transitions.base};
  }

  ${({ $open }) =>
    $open &&
    `
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `}

  @media (max-width: 1024px) {
    display: inline-flex;
  }
`;

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer - 1};
  background: rgba(4, 10, 12, 0.72);
  backdrop-filter: blur(4px);
  visibility: hidden;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  width: min(360px, 86vw);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.verdePetroleoEscuro} 0%,
    ${({ theme }) => theme.colors.vinhoEscuro} 100%
  );
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
`;

const DrawerTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.25);
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  border: 1px solid rgba(201, 162, 39, 0.5);
  border-radius: ${({ theme }) => theme.radius.medium};
  background: transparent;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    background: ${({ theme }) => theme.colors.douradoClaro};
  }

  span:nth-child(1) {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  span:nth-child(2) {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const DrawerNav = styled.nav`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DrawerLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 10px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.25rem;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.douradoClaro : theme.colors.texto};
  border-radius: ${({ theme }) => theme.radius.medium};
  transition: background-color ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base};

  &:hover {
    background: rgba(201, 162, 39, 0.08);
    color: ${({ theme }) => theme.colors.douradoClaro};
  }
`;

const Number = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.dourado};
`;

const DrawerCta = styled(Link)`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.douradoClaro} 0%,
    ${({ theme }) => theme.colors.dourado} 60%,
    ${({ theme }) => theme.colors.douradoEscuro} 100%
  );
`;
