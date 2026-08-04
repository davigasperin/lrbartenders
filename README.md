# LR Bartenders — Novo Site

Site institucional da **LR Bartenders** (open bar / coquetelaria premium para festas e eventos em Campinas e região). Substitui o antigo site WordPress.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **styled-components** v6 (SSR via `StyledComponentsRegistry`)
- **GSAP** (ScrollTrigger, SplitText) para animações
- **Three.js** (`@react-three/fiber`) para a cena 3D do Hero
- **yet-another-react-lightbox** para a galeria

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Verificações

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Formulários

Sem backend: os formulários de **Orçamento** (`/orcamento`) e **Contato** (`/contato`) montam a mensagem e abrem o **WhatsApp** (`wa.me/5519991151819`). Dados da empresa centralizados em `src/lib/site.ts`.

## Estrutura

```
src/
  app/            rotas (/, /sobre, /servicos, /cardapio, /galeria, /orcamento, /contato)
  components/     seções e componentes da Home + páginas internas
  lib/            site.ts (dados da empresa), content.ts (conteúdo), theme, gsap
  styles/         theme, GlobalStyle
```
