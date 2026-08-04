# Requirements — LR Bartenders Novo Site

## v1 Requirements

### Fundação (FUND)

- [ ] **FUND-01**: Usuário acessa o site em pt-BR com layout responsivo (mobile-first, breakpoints 375/768/1024/1440px)
- [ ] **FUND-02**: Usuário vê paleta de cores (verde-petróleo, dourado, vinho) e tipografia (serifa + sans) consistentes em todas as páginas
- [ ] **FUND-03**: Usuário vê o `<Logo />` placeholder dourado no Header e no Footer (arquivo real chega depois)
- [ ] **FUND-04**: styled-components configurado no Next.js (SSR via registry), sem flash de estilos no primeiro carregamento
- [ ] **FUND-05**: Site com as rotas `/`, `/sobre`, `/servicos`, `/cardapio`, `/galeria`, `/orcamento`, `/contato` acessíveis
- [ ] **FUND-06**: Dados da empresa (telefone, WhatsApp, email, redes sociais) centralizados em um módulo de dados, sem duplicação

### Header & Navegação (NAV)

- [ ] **NAV-01**: Usuário vê Header fixo no topo, transparente no início, que transiciona para fundo verde-petróleo com blur ao rolar (GSAP ScrollTrigger)
- [ ] **NAV-02**: Usuário vê menu central com links para todas as seções/páginas e botão CTA dourado "Solicitar Orçamento" com glow animado
- [ ] **NAV-03**: Em telas pequenas, usuário abre um drawer lateral animado (GSAP timeline) com os links do menu

### Hero 3D (HERO)

- [ ] **HERO-01**: Usuário vê hero fullscreen com cena Three.js de fundo (taça de coquetel low-poly + partículas douradas flutuantes)
- [ ] **HERO-02**: Usuário vê overlay com gradiente verde-petróleo→vinho sobre o canvas
- [ ] **HERO-03**: Título e subtítulo entram com animação GSAP (SplitText, fade + slide up com stagger)
- [ ] **HERO-04**: Usuário vê scroll indicator animado (loop yoyo)
- [ ] **HERO-05**: Canvas é lazy-loaded (`next/dynamic` ssr:false) e a cena é simplificada/desativada em mobile ou prefers-reduced-motion

### Seções Home (HOME)

- [ ] **HOME-01**: Seção Sobre com texto institucional (história 2012, coquetelaria premium) + elemento visual (cena 3D leve com fallback estático em mobile)
- [ ] **HOME-02**: Seção Serviços com grid de 6 cards (LR Premium, LR Choco, LR Coffee, Bar de Açaí, Bar de Gin, Festival de Caipirinhas), cada um com ícone dourado, imagem, título, descrição curta
- [ ] **HOME-03**: Cards de Serviços com hover 3D (perspective rotateX/rotateY via GSAP quickTo) e sombra dourada; entrada com ScrollTrigger stagger
- [ ] **HOME-04**: Seção Cardápios com carrossel horizontal pinado (ScrollTrigger scrub) — cada slide: foto, número do menu, nome, moldura art déco dourada
- [ ] **HOME-05**: Seção Galeria com grid masonry + lightbox (yet-another-react-lightbox) + entrada com stagger
- [ ] **HOME-06**: Seção CTA final com fundo gradiente verde-petróleo→vinho e botão dourado pulsante
- [ ] **HOME-07**: Footer escuro com logo, contatos, redes sociais e copyright

### Páginas internas (PAGE)

- [ ] **PAGE-01**: `/sobre` com história, missão e valores da empresa
- [ ] **PAGE-02**: `/servicos` detalhando os 6 serviços
- [ ] **PAGE-03**: `/cardapio` com os 6 menus interativos (Festival de Caipirinhas, Old Ideale, Clássicos Atuais, Bar de Gin, Fresh Sem Álcool, Premium Sem Álcool)
- [ ] **PAGE-04**: `/galeria` com grid de fotos de eventos + lightbox
- [ ] **PAGE-05**: `/orcamento` com formulário (dados pessoais + dados do evento) que monta mensagem e abre WhatsApp
- [ ] **PAGE-06**: `/contato` com formulário, dados de contato e redes sociais

### Performance & Qualidade (PERF)

- [ ] **PERF-01**: `npm run build` passa limpo; lint e `tsc --noEmit` sem erros
- [ ] **PERF-02**: Animações GSAP limpas com `gsap.context()` e cleanup em React (sem memory leak de ScrollTrigger)
- [ ] **PERF-03**: Imagens otimizadas (next/image quando aplicável) e fontes via next/font
- [ ] **PERF-04**: README curto explicando `npm install && npm run dev`

### Conteúdo (CONT)

- [ ] **CONT-01**: Textos institucionais, de serviços e cardápios aplicados a partir do conteúdo recolhido do site antigo (revisável pelo cliente)
- [ ] **CONT-02**: Imagens dos 4 JPEGs da pasta (logo + cardápios) incorporadas ao site quando validado

## v2 Requirements (deferidas)

- [ ] Integração de feed do Instagram na galeria
- [ ] Blog ou seção de novidades
- [ ] Multilíngue (EN)
- [ ] Reserva online com pagamento

## Out of Scope

- Backend/API de email ou banco de dados — formulários entregam via WhatsApp
- Taça 3D com modelo GLTF complexo — low-poly nativa na v1
- Migração automatizada de conteúdo WordPress
- Extração do texto do PDF "Proposta Comercial 2026" (ilegível) — valores virão da revisão do cliente

## Traceability

| REQ-ID | Fase | Status |
|--------|------|--------|
| FUND-01 a FUND-06 | Fase 1 (alguns), Fase 3/4 | — |
| NAV-01 a NAV-03 | Fase 1 | — |
| HERO-01 a HERO-05 | Fase 1 | — |
| HOME-01 a HOME-07 | Fase 2 | — |
| PAGE-01 a PAGE-06 | Fase 3 e 4 | — |
| PERF-01 a PERF-04 | Transversal (verificação a cada fase) | — |
| CONT-01 e CONT-02 | Fase 2/3 (conteúdo) | — |

---
*Last updated: 2026-08-04 after initialization*
