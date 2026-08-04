'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { gsap } from '@/lib/gsap';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { MENUS, MENU_ALCOHOL, MENU_ITEMS } from '@/lib/content';
import { usePrefersReducedMotion } from '@/hooks/useMedia';

export function MenuCatalog() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [openId, setOpenId] = useState<string | null>(MENUS[0]?.id ?? null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const reduced = usePrefersReducedMotion();

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      MENUS.forEach((menu) => {
        const panel = contentRefs.current[menu.id];
        if (!panel) return;
        const isOpen = openId === menu.id;

        if (isOpen) {
          gsap.fromTo(
            panel,
            { height: 0, autoAlpha: 0 },
            {
              height: 'auto',
              autoAlpha: 1,
              duration: reduced ? 0 : 0.55,
              ease: 'power3.inOut',
            },
          );
        } else {
          gsap.to(panel, {
            height: 0,
            autoAlpha: 0,
            duration: reduced ? 0 : 0.4,
            ease: 'power3.inOut',
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [openId, reduced]);

  return (
    <Section ref={rootRef} className="section">
      <Inner>
        <SectionTitle
          eyebrow="Nossos cardápios"
          title={
            <>
              Escolha o <em>roteiro</em> da sua festa
            </>
          }
          subtitle="Cada cardápio é elaborado pela nossa coquetelaria e pode ser personalizado para o seu evento."
        />

        <List>
          {MENUS.map((menu) => {
            const isOpen = openId === menu.id;
            const hasAlcohol = MENU_ALCOHOL[menu.id];
            const items = MENU_ITEMS[menu.id] ?? [];

            return (
              <Item key={menu.id} $open={isOpen}>
                <Header type="button" onClick={() => toggle(menu.id)} aria-expanded={isOpen}>
                  <Number>{menu.number}</Number>
                  <HeadText>
                    <HeadTitle>{menu.title}</HeadTitle>
                    <HeadDesc>{menu.description}</HeadDesc>
                  </HeadText>
                  <Badge $alcohol={hasAlcohol}>{hasAlcohol ? 'Com álcool' : 'Sem álcool'}</Badge>
                  <Chevron $open={isOpen} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Chevron>
                </Header>

                <Panel ref={(el) => { contentRefs.current[menu.id] = el; }} $open={isOpen}>
                  <PanelInner>
                    <ImageWrap>
                      <Image
                        src={menu.image}
                        alt={menu.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        style={{ objectFit: 'cover' }}
                      />
                    </ImageWrap>
                    <Items>
                      <ItemsTitle>{hasAlcohol ? 'Coquetéis do cardápio' : 'Opções do cardápio'}</ItemsTitle>
                      {items.map((item) => (
                        <Drink key={item}>
                          <DrinkName>{item}</DrinkName>
                          <DrinkLine />
                          <DrinkDot aria-hidden="true" />
                        </Drink>
                      ))}
                      <Note>Cardápio ilustrativo — montamos o roteiro ideal junto com você.</Note>
                    </Items>
                  </PanelInner>
                </Panel>
              </Item>
            );
          })}
        </List>
      </Inner>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Item = styled.article<{ $open: boolean }>`
  border: 1px solid
    ${({ $open }) =>
      $open ? 'rgba(201, 162, 39, 0.55)' : 'rgba(201, 162, 39, 0.18)'};
  border-radius: ${({ theme }) => theme.radius.large};
  background: rgba(11, 58, 63, 0.28);
  overflow: hidden;
  transition: border-color 0.3s ease;
`;

const Header = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 22px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;

  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: 10px 14px;
  }
`;

const Number = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.dourado};
  flex-shrink: 0;
`;

const HeadText = styled.span`
  flex: 1;
  min-width: 0;
`;

const HeadTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const HeadDesc = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Badge = styled.span<{ $alcohol: boolean }>`
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme, $alcohol }) =>
    $alcohol ? theme.colors.douradoClaro : theme.colors.verdePetroleoEscuro};
  background: ${({ $alcohol }) =>
    $alcohol ? 'rgba(201, 162, 39, 0.14)' : 'rgba(140, 200, 170, 0.85)'};
`;

const Chevron = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  color: ${({ theme }) => theme.colors.dourado};
  transform: rotate(${({ $open }) => ($open ? 180 : 0)}deg);
  transition: transform 0.35s ease;
`;

const Panel = styled.div<{ $open: boolean }>`
  height: 0;
  overflow: hidden;
  visibility: hidden;
`;

const PanelInner = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  padding: 4px 24px 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;
  border: 1px solid rgba(201, 162, 39, 0.25);
`;

const Items = styled.div`
  align-self: center;
`;

const ItemsTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.douradoClaro};
  margin-bottom: 16px;
`;

const Drink = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 7px 0;
`;

const DrinkName = styled.span`
  font-size: 0.97rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const DrinkLine = styled.span`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(201, 162, 39, 0.4), rgba(201, 162, 39, 0.06));
`;

const DrinkDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.dourado};
`;

const Note = styled.p`
  margin-top: 18px;
  font-size: 0.85rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
