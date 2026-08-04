# LR Bartenders — Novo Site

## What This Is

Site institucional novo para a **LR Bartenders**, empresa de open bar / coquetelaria premium para festas e eventos em Campinas e região. Um site de alto impacto visual (Next.js 15 + TypeScript + styled-components + GSAP + Three.js), moderno, com Home em seções animadas (Hero 3D, Sobre, Serviços, Cardápios, Galeria, CTA, Footer) e páginas internas de Sobre, Serviços, Cardápio, Galeria, Orçamento e Contato. Formulários entregam dados via WhatsApp. Substitui o site antigo em WordPress (lrbartenders.com.br).

## Core Value

Converter visitantes em pedidos de orçamento, transmitindo sofisticação e premium — "Sua festa merece o melhor!" — com um site que impressiona visualmente (Hero 3D, animações GSAP, paleta verde-petróleo/ouro/vinho).

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Site com 7 rotas: `/`, `/sobre`, `/servicos`, `/cardapio`, `/galeria`, `/orcamento`, `/contato`
- [ ] Home com Hero 3D (cena Three.js: taça low-poly + partículas douradas), overlay gradiente verde-petróleo→vinho e entrada de texto animada (GSAP + SplitText)
- [ ] Header fixo transparente→verdePetróleo com blur ao rolar, CTA dourado com glow, drawer mobile animado (GSAP timeline)
- [ ] Seções da Home: Sobre (institucional + cena 3D leve com fallback mobile), Serviços (6 cards com hover 3D), Cardápios (carrossel horizontal pinado), Galeria (masonry + lightbox), CTA final, Footer
- [ ] Formulários de Orçamento e Contato que montam mensagem e abrem WhatsApp
- [ ] Componente `<Logo />` placeholder dourado (arquivo real chega depois)
- [ ] Paleta/tipografia centralizadas (theme.ts) + GlobalStyle + styled-components configurado no Next.js
- [ ] Performance: lazy-load do canvas Three.js, 3D reduzido em mobile/reduced-motion, `gsap.context()` com cleanup
- [ ] `npm run build` limpo, lint e typecheck sem erros, README de execução local

### Out of Scope

- Backend/banco de dados — formulários usam WhatsApp (wa.me), sem API route de email
- Modelo GLTF complexo para a taça — usa geometria low-poly nativa (fase 1)
- Loja/e-commerce, reserva online com pagamento — não faz parte do escopo do site institucional
- Migração de conteúdo WordPress automatizada — conteúdo reescrito/curado manualmente
- Leitura do PDF "Proposta Comercial 2026" (texto ilegível por fontes customizadas) — conteúdo/valores virão da revisão do cliente

## Context

- **Cliente**: LR Bartenders. Nome: LR Bartenders. Slogan: "Sua festa merece o melhor!". Cidade: Campinas e região.
- **Contatos**: Telefone (19) 3367-7990 · WhatsApp (19) 99115-1819 (secundário 98433-4662) · Email contato@lrbartenders.com.br · Instagram/Facebook @lrbartenders
- **Site antigo (WordPress)** recolhido: páginas Home, Sobre, Serviços, Cardápio, Galeria, Orçamento, Contato. Conteúdo histórico:
  - Home: sliders "LR BARTENDERS / Drinks e Coquetéis / Cascata de Chocolate (LR Choco) / LR Coffee / Açaí para eventos"; texto "O que é a LR Bartenders" (coquetelaria premium, clássica ou interativa, mixologia molecular); paralaxe "Nossos bartenders são altamente capacitados..."; CTAs "Solicite um Orçamento" e "Agende uma Degustação".
  - Sobre: criada em 2012 por um Mixólogo; ícone em Campinas e interior paulista; missão (coquetelaria requintada e criativa, insumos de alta qualidade) e sucesso (confiança, ética, reconhecimento de mercado).
  - Serviços (antigos por tipo de evento): Casamentos, 15 Anos, Corporativos, Formaturas, Aniversários, E mais.
  - Cardápio antigo: LR Premium, Caip Gourmet, Sem álcool, Mixologia Molecular, Internacionais, LR Coffee, Cascata de chocolate, Wellcome Drink (águas aromatizadas), Açaí.
- **Novos serviços/cardápios definidos pelo cliente** (usar estes):
  - Serviços: LR Premium, LR Choco, LR Coffee, Bar de Açaí, Bar de Gin, Festival de Caipirinhas.
  - Cardápios: Festival de Caipirinhas, Old Ideale, Clássicos Atuais, Bar de Gin, Fresh Sem Álcool, Premium Sem Álcool.
- **Logo** (descrição do cliente): taça de vinho estilizada dourada dentro de coroa circular com folhas de trigo e estrela no topo, texto "LR BARTENDERS" em serifa + slogan "Sua festa merece o melhor!" em itálico dourado. Arquivo será anexado; usar placeholder `<Logo />`.
- **Pasta do projeto**: `C:\Users\davig\OneDrive\Desktop\LBBARTENDERS` contém 4 JPEGs (logo + cardápios) e a proposta comercial em PDF. Imagens a mover para `public/images/` quando usadas.
- **Ambiente**: Windows + PowerShell, Node v24.13.0, npm 11.19.0, git inicializado. Roda opencode.

## Constraints

- **Tech stack**: Next.js 15 (App Router) + TypeScript + styled-components v6 (`compiler.styledComponents`) + GSAP (ScrollTrigger/SplitText) + Three.js (`@react-three/fiber` v9 / `@react-three/drei`) — decidido com o cliente
- **Compatibility**: React 19 exige `@react-three/fiber@9`/`@react-three/drei@10`
- **Formulários**: sem backend; montar mensagem → abrir `https://wa.me/5519991151819?text=...`
- **Performance**: lazy-load do canvas (`next/dynamic` ssr:false); cena 3D reduzida em mobile (matchMedia / prefers-reduced-motion) com fallback estático
- **Idioma**: site 100% pt-BR
- **Build**: critério de "limpo" = `tsc --noEmit` + lint + `npm run build` sem erros

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 + App Router | Padrão atual da Next.js, Server Components, next/font | — Pending |
| styled-components com registry SSR | Config via `compiler.styledComponents` no next.config.ts + `lib/registry.tsx` | — Pending |
| Formulários → WhatsApp | Zero backend, prático para o cliente | — Pending |
| gsap.context() + cleanup | Evita memory leak de ScrollTrigger em React/Next | — Pending |
| Coarse granularity, sequencial, interativo (GSD) | Site institucional, revisão entre fases | — Pending |
| Taça 3D low-poly nativa | Sem modelo GLTF na v1 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-04 after initialization*
