import { createGlobalStyle } from "styled-components";

import { containerMaxWidth } from "./theme";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
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

  .container {
    width: 100%;
    max-width: ${containerMaxWidth};
    margin: 0 auto;
    padding: 0 24px;
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
