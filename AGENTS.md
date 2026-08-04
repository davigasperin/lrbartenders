<!-- GSD:project-start source:PROJECT.md -->
## Project

**LR Bartenders — Novo Site**

Site institucional novo para a **LR Bartenders**, empresa de open bar / coquetelaria premium para festas e eventos em Campinas e região. Um site de alto impacto visual (Next.js 15 + TypeScript + styled-components + GSAP + Three.js), moderno, com Home em seções animadas (Hero 3D, Sobre, Serviços, Cardápios, Galeria, CTA, Footer) e páginas internas de Sobre, Serviços, Cardápio, Galeria, Orçamento e Contato. Formulários entregam dados via WhatsApp. Substitui o site antigo em WordPress (lrbartenders.com.br).

**Core Value:** Converter visitantes em pedidos de orçamento, transmitindo sofisticação e premium — "Sua festa merece o melhor!" — com um site que impressiona visualmente (Hero 3D, animações GSAP, paleta verde-petróleo/ouro/vinho).

### Constraints

- **Tech stack**: Next.js 15 (App Router) + TypeScript + styled-components v6 (`compiler.styledComponents`) + GSAP (ScrollTrigger/SplitText) + Three.js (`@react-three/fiber` v9 / `@react-three/drei`) — decidido com o cliente
- **Compatibility**: React 19 exige `@react-three/fiber@9`/`@react-three/drei@10`
- **Formulários**: sem backend; montar mensagem → abrir `https://wa.me/5519991151819?text=...`
- **Performance**: lazy-load do canvas (`next/dynamic` ssr:false); cena 3D reduzida em mobile (matchMedia / prefers-reduced-motion) com fallback estático
- **Idioma**: site 100% pt-BR
- **Build**: critério de "limpo" = `tsc --noEmit` + lint + `npm run build` sem erros
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
