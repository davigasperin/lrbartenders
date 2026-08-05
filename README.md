# 🍸 LR Bartenders — Site Institucional Premium

> **Open bar e coquetelaria premium para festas e eventos em Campinas e região.**

Site institucional de alto impacto visual para a **LR Bartenders**, reconstruído do zero em
**Next.js** como substituto do antigo site em WordPress. O foco é converter visitantes em
pedidos de orçamento, transmitindo sofisticação por meio de cena 3D, animações refinadas e
uma paleta verde-petróleo, dourado e vinho.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![styled-components](https://img.shields.io/badge/styled--components-v6-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-00cfc8)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?logo=threedotjs&logoColor=white)](https://threejs.org)

---

## ✨ Destaques

- **Herói 3D imersivo** — cena com **Three.js** (`@react-three/fiber` + `@react-three/drei`)
  carregada via `next/dynamic` (`ssr: false`) apenas quando necessário.
- **Animações GSAP** — ScrollTrigger e SplitText movendo cada seção ao longo do scroll,
  com respeito a `prefers-reduced-motion`.
- **Performance consciente** — cena reduzida em mobile (`matchMedia`) com fallback
  estático; canvas e assets em *lazy-load*.
- **Design system próprio** — tokens tipográficos, de espaçamento e paleta centralizados
  em `theme.ts` (verde-petróleo / dourado / vinho, tipografia Playfair Display + Inter).
- **Formulários sem backend** — Orçamento e Contato montam a mensagem e abrem direto no
  **WhatsApp** do cliente.
- **100% pt-BR** e com SEO técnico (sitemap, robots, Open Graph, favicon e manifest).

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Linguagem | TypeScript 5 + ESLint |
| Estilização | styled-components v6 (SSR via `StyledComponentsRegistry`) |
| Animação | GSAP (ScrollTrigger, SplitText) |
| 3D | Three.js + `@react-three/fiber` v9 + `@react-three/drei` v10 |
| Galeria | yet-another-react-lightbox |

## 📄 Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero 3D, Sobre, Serviços, Cardápio, Galeria, CTA, Rodapé |
| `/sobre` | História e pilares da empresa |
| `/servicos` | Tipos de evento e serviços |
| `/cardapio` | Catálogo de cardápios |
| `/galeria` | Galeria com lightbox |
| `/orcamento` | Formulário de orçamento via WhatsApp |
| `/contato` | Formulário de contato via WhatsApp |

## 🚀 Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## ✅ Verificações

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # next build
```

## 🔒 Formulários via WhatsApp

Sem backend. O formulário monta a mensagem e abre:

```
https://wa.me/5519991151819?text=<mensagem>
```

Os dados da empresa (telefone, WhatsApp, e-mail, redes sociais) ficam centralizados em
`src/lib/site.ts`; o conteúdo de serviços, cardápios e galeria em `src/lib/content.ts`.

## 📁 Estrutura

```
src/
├── app/              rotas (App Router) + metadata/SEO
│   ├── page.tsx      Home
│   ├── sobre/        servicos/  cardapio/  galeria/  orcamento/  contato/
│   └── icon.png      favicon
├── components/
│   ├── Hero/         cena 3D + imagem de destaque
│   ├── Header/       nav fixa com scroll e drawer
│   ├── Footer/
│   ├── About/ SobreContent/ Services/ MenuShowcase/ MenuCatalog/
│   ├── Gallery/ EventTypes/ CTASection/ PageHero/
│   ├── OrcamentoForm/ ContactForm/ FormLayout/ ContactInfo/
│   ├── ui/           primitivos (Button, Container, Form, SectionTitle)
│   └── Logo/         logo com medalhão dourado
├── lib/              site.ts, content.ts, gsap.ts
├── styles/           theme.ts (design tokens), GlobalStyle.ts
└── hooks/            useMedia e utilitários
```

## ☁️ Implantação

Projeto pronto para **Vercel** (rode `vercel` na raiz) ou qualquer host Node.js:

```bash
npm run build && npm run start
```

> A variável de ambiente `NEXT_PUBLIC_SITE_URL` não é obrigatória — a URL canônica está em
> `src/lib/site.ts`.

---

Desenvolvido como entrega de site institucional — do layout ao SEO, com foco em
performance, identidade visual premium e conversão.