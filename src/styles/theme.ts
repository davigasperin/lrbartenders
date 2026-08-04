export const theme = {
  colors: {
    verdePetroleo: "#0B3A3F",
    verdePetroleoEscuro: "#072529",
    verdePetroleoClaro: "#15585F",
    vinho: "#5A1F2E",
    vinhoEscuro: "#3A0F1B",
    dourado: "#C9A227",
    douradoClaro: "#F0D77B",
    douradoEscuro: "#9A7A1F",
    fundo: "#0A1113",
    fundoAlt: "#0F191C",
    texto: "#F7F3EA",
    textoMuted: "#AAB6B9",
    branco: "#FFFFFF",
  },
  fonts: {
    serif: "var(--font-serif), Georgia, 'Times New Roman', serif",
    sans: "var(--font-sans), system-ui, -apple-system, sans-serif",
  },
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },
  shadows: {
    gold: "0 0 24px rgba(201, 162, 39, 0.45)",
    goldStrong: "0 0 48px rgba(240, 215, 123, 0.55)",
    card: "0 20px 60px rgba(0, 0, 0, 0.5)",
  },
  gradients: {
    hero: "linear-gradient(160deg, rgba(7, 37, 41, 0.94) 0%, rgba(11, 58, 63, 0.8) 42%, rgba(90, 31, 46, 0.86) 100%)",
    cta: "linear-gradient(135deg, #0B3A3F 0%, #5A1F2E 100%)",
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
