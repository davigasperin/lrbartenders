# PLAN — Phase 2: Seções da Home

## Goal

Home completa com todas as seções institucionais animadas: Sobre, Serviços (6 cards), Cardápios (carrossel horizontal pinado), Galeria (masonry + lightbox), CTA final e Footer — com conteúdo real recolhido do site antigo.

## Requirements covered

HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, CONT-01, CONT-02, PERF-02, PERF-03

## Plan 02-01: Sobre + Serviços

1. Baixar imagens reais do site antigo (lrbartenders.com.br/wp-content/uploads/...) para `public/images/` — serviços, cardápios, galeria, sobre (conteúdo próprio do cliente)
2. `src/lib/content.ts` — dados: SOBRE (texto institucional), SERVICES (6), MENUS (6), GALLERY
3. `src/components/About/index.tsx` — texto institucional (história 2012, coquetelaria premium) + imagem flutuante com GSAP (`yoyo`), fallback estático em mobile/reduced-motion
4. `src/components/Services/index.tsx` — grid 3 colunas (1 mobile), 6 cards (LR Premium, LR Choco, LR Coffee, Bar de Açaí, Bar de Gin, Festival de Caipirinhas), ícone dourado + imagem + título + descrição; hover 3D com `gsap.quickTo` (rotateX/rotateY + sombra dourada); entrada com ScrollTrigger stagger
5. Instalar `yet-another-react-lightbox` (para a Galeria)

## Plan 02-02: Cardápios + Galeria

1. `src/components/MenuShowcase/index.tsx` — carrossel horizontal pinado (ScrollTrigger `pin` + `scrub`), cada slide: imagem, número, nome, moldura art déco dourada (SVG em styled-component)
2. `src/components/Gallery/index.tsx` — grid masonry responsivo (CSS Grid), hover zoom + perspectiva 3D + overlay com ícone expandir, lightbox (`yet-another-react-lightbox`), entrada com ScrollTrigger stagger

## Plan 02-03: CTA + Footer

1. `src/components/CTASection/index.tsx` — fundo gradiente verde-petróleo→vinho, botão dourado pulsante (GSAP yoyo)
2. `src/components/Footer/index.tsx` — fundo escuro, logo, contatos (tel/whatsapp/email), redes sociais (Instagram/Facebook), copyright
3. `src/app/page.tsx` — montar Home completa na ordem: Hero → Sobre → Serviços → MenuShowcase → Galeria → CTA → Footer

## Verification (Per phase)

- `npx tsc --noEmit` sem erros
- `npm run lint` sem erros
- `npm run build` passando limpo
- Review visual: todas as seções renderizam; carrossel pinado funciona no scroll; lightbox abre; hover 3D nos cards

## Decisions

- Sobre: usar **imagem flutuante GSAP** (não segunda cena Three.js) para performance mobile — conforme opção do cliente
- Imagens: baixadas do site antigo (conteúdo do próprio cliente); revisáveis para substituição pelos novos JPEGs

## Risks

- ScrollTrigger `pin` + scrub com styled-components (medir com `ScrollTrigger.refresh()` após fonts/imagens)
- Lightbox bundle size (lazy-load o componente do lightbox quando abrir, se necessário)
- Imagens grandes no grid (next/image com fill + sizes)
- Mobile: reduzir efeitos (pin pode ser desativado em <1024px, fallback em scroll vertical normal)
