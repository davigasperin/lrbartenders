import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    background-color: ${({ theme }) => theme.colors.fundo};
    color: ${({ theme }) => theme.colors.texto};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 700;
    line-height: 1.15;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  body.no-scroll {
    overflow: hidden;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 16px;
    z-index: 9999;
    padding: 12px 24px;
    background: ${({ theme }) => theme.colors.dourado};
    color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
    font-weight: 600;
    border-radius: ${({ theme }) => theme.radius.medium};
    text-decoration: none;
    transition: top 0.2s ease;

    &:focus {
      top: 16px;
    }
  }

  .visually-hidden {
    position: absolute !important;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  img,
  svg,
  canvas {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.dourado};
    color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.fundo};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.verdePetroleoClaro};
    border-radius: ${({ theme }) => theme.radius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.dourado};
  }

  .section {
    padding: 96px 0;
  }

  @media (max-width: 768px) {
    .section {
      padding: 64px 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`;
