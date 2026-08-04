# PLAN — Phase 1: Fundação + Hero 3D

## Goal

Estrutura de pastas Next.js 15 (App Router) completa e funcional com `theme.ts`, `GlobalStyle`, styled-components configurado, `<Logo />` placeholder, Header animado e Hero 3D de alto impacto — pronta para receber as demais seções da Home (Phase 2).

## Requirements covered

FUND-01, FUND-02, FUND-03, FUND-04, FUND-06, NAV-01, NAV-02, NAV-03, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, PERF-01

## Plan 01-01: Scaffold + Base + Header

1. `package.json` com deps: next@15, react@19, styled-components@6, gsap@3, three, @react-three/fiber@9, @react-three/drei@10; devDeps: typescript, @types, eslint-config-next
2. `tsconfig.json`, `next.config.ts` (compiler.styledComponents, reactStrictMode), `eslint.config.mjs`
3. `src/styles/theme.ts` — paleta (verdePetroleo, dourado, vinho, fundos), tipografia (Playfair Display serif / Inter sans via next/font), breakpoints, sombras, transições
4. `src/styles/GlobalStyle.ts` — reset, fundo escuro, scrollbar, seleção, `.section`, container
5. `src/lib/registry.tsx` — SSR do styled-components (useServerInsertedHTML)
6. `src/lib/gsap.ts` — registro client-only de ScrollTrigger/SplitText
7. `src/lib/site.ts` — dados da empresa (telefone, whatsapp, email, redes)
8. `src/components/Logo/index.tsx` — placeholder SVG dourado
9. `src/components/Header/index.tsx` — fixo transparente→verdePetroleo+blur ao rolar (ScrollTrigger), logo esquerda, menu central, CTA dourado com glow, drawer mobile (GSAP timeline)
10. `src/app/layout.tsx` (registry + fonts + metadata) e `src/app/page.tsx` (Home montando Header + Hero)

## Plan 01-02: Hero 3D

1. `src/components/Hero/HeroCanvas.tsx` — client, cena Three.js: taça low-poly (bowl cilindro + haste + base em material dourado/metalness), `<Sparkles />` douradas, luz ambiente + point light dourada; rotação suave via useFrame
2. `src/components/Hero/index.tsx` — `next/dynamic` ssr:false para o canvas, overlay gradiente verdePetroleo→vinho (styled), título/subtítulo com entrada GSAP + SplitText (fade/slide-up stagger), scroll indicator animado (yoyo repeat -1)
3. Simplificação mobile/reduced-motion via `useIsMobile` (matchMedia) — menos partículas, canvas desativado em prefers-reduced-motion

## Verification (Per phase)

- `npx tsc --noEmit` sem erros
- `npm run lint` sem erros
- `npm run build` passando limpo
- Review visual: Header + Hero no browser (desktop com 3D, mobile sem 3D)

## Risks

- Compatibilidade React 19 ↔ fiber@9/drei@10 (pinado no package.json)
- styled-components + SSR (registry obrigatório)
- Memory leak de ScrollTrigger (gsap.context() com cleanup)
- Hero alto em mobile (altura dinâmica, canvas reduzido)
