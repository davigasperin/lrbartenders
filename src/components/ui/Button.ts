import { css } from 'styled-components';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'ghost';

const buttonSizes: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 11px 22px;
    font-size: 0.88rem;
  `,
  md: css`
    padding: 14px 30px;
    font-size: 0.95rem;
  `,
  lg: css`
    padding: 16px 34px;
    font-size: 0.98rem;
  `,
};

const buttonVariants: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.douradoClaro} 0%,
      ${({ theme }) => theme.colors.dourado} 60%,
      ${({ theme }) => theme.colors.douradoEscuro} 100%
    );
  `,
  ghost: css`
    color: ${({ theme }) => theme.colors.texto};
    border: 1px solid rgba(201, 162, 39, 0.6);
    background: rgba(7, 37, 41, 0.3);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  `,
};

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.dourado};
    outline-offset: 4px;
  }
`;

export { buttonBase, buttonSizes, buttonVariants, type ButtonSize, type ButtonVariant };
