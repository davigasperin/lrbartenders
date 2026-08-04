# Roadmap: LR Bartenders — Novo Site

## Overview

Substituir o site WordPress da LR Bartenders por um site institucional Next.js 15 de alto impacto: fundação técnica + Hero 3D primeiro, depois as seções da Home, as páginas internas e, por fim, formulários via WhatsApp + entrega final. Cada fase é revisada pelo cliente antes de seguir (modo interativo, execução sequencial).

## Phases

- [ ] **Phase 1: Fundação + Hero 3D** - Base Next.js (theme, GlobalStyle, registry, styled-components), Logo placeholder, Header animado e Hero com cena Three.js
- [ ] **Phase 2: Seções da Home** - Sobre, Serviços (6 cards), Cardápios (carrossel), Galeria (masonry+lightbox), CTA final, Footer
- [ ] **Phase 3: Páginas internas** - /sobre, /servicos, /cardapio, /galeria reusando componentes
- [ ] **Phase 4: Formulários + Entrega** - /orcamento e /contato (WhatsApp), SEO, README, build final

## Phase Details

### Phase 1: Fundação + Hero 3D
**Goal**: Estrutura de pastas Next.js completa e funcional com Header e Hero de alto impacto, pronta para receber as demais seções.
**Depends on**: Nothing (first phase)
**Requirements**: FUND-01, FUND-02, FUND-03, FUND-04, FUND-06, NAV-01, NAV-02, NAV-03, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, PERF-01
**Success Criteria** (what must be TRUE):
  1. Usuário abre o site local e vê a Home com Header fixo transparente e Hero fullscreen
  2. Usuário rola a página e o Header transiciona para fundo verde-petróleo com blur; CTA dourado com glow permanece visível
  3. Usuário em tela mobile abre o drawer lateral animado com os links do menu
  4. Usuário vê o Hero com cena 3D (taça low-poly + partículas douradas), overlay gradiente e título animado; em mobile/reduced-motion a cena fica simplificada
  5. `npm run build` passa limpo; lint e `tsc --noEmit` sem erros
**Plans**: 2 plans

Plans:
- [ ] 01-01: Scaffold Next.js + theme/GlobalStyle/registry + Logo + Header
- [ ] 01-02: Hero 3D (canvas Three.js lazy + overlay + animação GSAP + scroll indicator)

### Phase 2: Seções da Home
**Goal**: Home completa com todas as seções institucionais animadas.
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, CONT-01, CONT-02, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. Usuário rola a Home e vê Sobre com texto institucional e elemento visual (fallback estático em mobile)
  2. Usuário vê grid de 6 cards de Serviços com hover 3D e entrada com stagger
  3. Usuário vê carrossel horizontal de Cardápios controlado pelo scroll (pinned section)
  4. Usuário vê galeria masonry com lightbox e CTA final com botão dourado pulsante
  5. Usuário vê Footer com logo, contatos e redes sociais
**Plans**: TBD

Plans:
- [ ] 02-01: Sobre + Serviços
- [ ] 02-02: Cardápios (carrossel) + Galeria
- [ ] 02-03: CTA final + Footer

### Phase 3: Páginas internas
**Goal**: Páginas /sobre, /servicos, /cardapio, /galeria completas e funcionais.
**Depends on**: Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, FUND-05, CONT-01
**Success Criteria** (what must be TRUE):
  1. Usuário navega para /sobre e vê história, missão e valores
  2. Usuário navega para /servicos e vê os 6 serviços detalhados
  3. Usuário navega para /cardapio e vê os 6 menus interativos
  4. Usuário navega para /galeria e vê grid de fotos com lightbox
**Plans**: TBD

Plans:
- [ ] 03-01: Páginas /sobre + /servicos
- [ ] 03-02: Páginas /cardapio + /galeria

### Phase 4: Formulários + Entrega
**Goal**: Formulários de Orçamento e Contato funcionais via WhatsApp e projeto pronto para produção.
**Depends on**: Phase 3
**Requirements**: PAGE-05, PAGE-06, PERF-01, PERF-02, PERF-03, PERF-04, FUND-05
**Success Criteria** (what must be TRUE):
  1. Usuário preenche o formulário de Orçamento e é direcionado ao WhatsApp com mensagem montada
  2. Usuário preenche o formulário de Contato e é direcionado ao WhatsApp
  3. Projeto tem SEO básico (metadata) e README curto de execução local
  4. `npm run build` final passa limpo
**Plans**: TBD

Plans:
- [ ] 04-01: Página /orcamento (formulário → WhatsApp)
- [ ] 04-02: Página /contato + SEO + README + build final

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundação + Hero 3D | 2/2 | Complete | 2026-08-04 |
| 2. Seções da Home | 3/3 | Complete | 2026-08-04 |
| 3. Páginas internas | 2/2 | Complete | 2026-08-04 |
| 4. Formulários + Entrega | 2/2 | Complete | 2026-08-04 |
