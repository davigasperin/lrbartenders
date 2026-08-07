export const theme = {
  colors: {
    verdePetroleo: "#062327",
    verdePetroleoEscuro: "#031A1D",
    verdePetroleoClaro: "#0E4048",
    vinho: "#471828",
    vinhoEscuro: "#2D0C15",
    dourado: "#C9A227",
    douradoClaro: "#F0D77B",
    douradoEscuro: "#9A7A1F",
    fundo: "#05080B",
    fundoAlt: "#0A1216",
    texto: "#F7F3EA",
    textoMuted: "#AAB6B9",
    error: "#D9534F",
    errorLight: "#E26D6A",
    inputBg: "rgba(10, 26, 29, 0.55)",
    branco: "#FFFFFF",
  },
  fonts: {
    serif: "var(--font-serif), Georgia, 'Times New Roman', serif",
    sans: "var(--font-sans), system-ui, -apple-system, sans-serif",
  },
  type: {
    displayXl: "clamp(3rem, 9vw, 6.5rem)",
    displayLg: "clamp(2.4rem, 6vw, 4.2rem)",
    displayMd: "clamp(2rem, 5vw, 3rem)",
    headingLg: "1.75rem",
    headingMd: "1.375rem",
    headingSm: "1.125rem",
    lead: "1.3125rem",
    body: "1rem",
    bodySm: "0.9375rem",
    bodyXs: "0.875rem",
    label: "0.75rem",
    labelSm: "0.6875rem",
    nav: "0.8125rem",
    button: "0.9375rem",
    micro: "0.75rem",
  },
  lineHeights: {
    display: "1.05",
    heading: "1.15",
    body: "1.7",
    bodyTight: "1.5",
    lead: "1.4",
  },
  tracking: {
    tight: "-0.01em",
    label: "0.3em",
    labelTight: "0.18em",
    nav: "0.1em",
  },
  breakpoints: {
    mobile: "375px",
    small: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },
  spacing: {
    4: "4px",
    8: "8px",
    12: "12px",
    16: "16px",
    24: "24px",
    32: "32px",
    40: "40px",
    48: "48px",
    64: "64px",
    80: "80px",
    96: "96px",
    128: "128px",
  },
  shadows: {
    gold: "0 0 24px rgba(201, 162, 39, 0.45)",
    goldStrong: "0 0 48px rgba(240, 215, 123, 0.55)",
    card: "0 20px 60px rgba(0, 0, 0, 0.5)",
  },
  gradients: {
    hero: "linear-gradient(160deg, rgba(3, 26, 29, 0.94) 0%, rgba(6, 35, 39, 0.82) 42%, rgba(71, 24, 40, 0.88) 100%)",
    cta: "linear-gradient(135deg, #062327 0%, #471828 100%)",
    goldText:
      "linear-gradient(135deg, #F7E4A8 0%, #C9A227 55%, #9A7A1F 100%)",
  },
  transitions: {
    base: "0.3s ease",
    slow: "0.6s ease",
  },
  radius: {
    small: "6px",
    medium: "12px",
    large: "20px",
    full: "999px",
  },
  zIndex: {
    base: 1,
    overlay: 900,
    header: 1000,
    drawer: 1100,
  },
} as const;

export type Theme = typeof theme;

export const media = {
  down: (bp: keyof Theme["breakpoints"]) =>
    `@media (max-width: ${theme.breakpoints[bp]})`,
  up: (bp: keyof Theme["breakpoints"]) =>
    `@media (min-width: ${theme.breakpoints[bp]})`,
};

export const containerMaxWidth = "1200px";
