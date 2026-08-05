'use client';

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FieldWrap>
      <Label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </Label>
      {error && <ErrorText id={errorId} role="alert">{error}</ErrorText>}
      {children}
    </FieldWrap>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { $invalid?: boolean };
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { $invalid?: boolean };
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { $invalid?: boolean };

const control = css`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.texto};
  font: 400 0.97rem var(--font-sans), system-ui, sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textoMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.dourado};
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.14);
  }
`;

export const Input = styled.input<InputProps>`
  ${control}
  border-color: ${({ $invalid, theme }) => ($invalid ? theme.colors.error : 'rgba(201, 162, 39, 0.22)')};
`;

export const Select = styled.select<SelectProps>`
  ${control}
  appearance: none;
  cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, ${({ theme }) => theme.colors.dourado} 50%),
    linear-gradient(135deg, ${({ theme }) => theme.colors.dourado} 50%, transparent 50%);
  background-position: calc(100% - 20px) 50%, calc(100% - 15px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  border-color: ${({ $invalid, theme }) => ($invalid ? theme.colors.error : 'rgba(201, 162, 39, 0.22)')};

  option {
    background: ${({ theme }) => theme.colors.verdePetroleoEscuro};
    color: ${({ theme }) => theme.colors.texto};
  }
`;

export const Textarea = styled.textarea<TextareaProps>`
  ${control}
  resize: vertical;
  min-height: 130px;
  border-color: ${({ $invalid, theme }) => ($invalid ? theme.colors.error : 'rgba(201, 162, 39, 0.22)')};
`;

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.douradoClaro};

  span {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.errorLight};
`;
