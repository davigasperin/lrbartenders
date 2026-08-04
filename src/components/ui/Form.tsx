'use client';

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

export function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <FieldWrap>
      <Label>
        {label} {required && <span aria-hidden="true">*</span>}
      </Label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldWrap>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { $invalid?: boolean };
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { $invalid?: boolean };
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { $invalid?: boolean };

const control = `
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 12px;
  background: rgba(10, 26, 29, 0.55);
  color: #f7f3ea;
  font: 400 0.97rem var(--font-sans), system-ui, sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: rgba(246, 242, 231, 0.35);
  }

  &:focus {
    outline: none;
    border-color: #c9a227;
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.14);
  }
`;

export const Input = styled.input<InputProps>`
  ${control}
  border-color: ${({ $invalid }) => ($invalid ? '#d9534f' : 'rgba(201, 162, 39, 0.22)')};
`;

export const Select = styled.select<SelectProps>`
  ${control}
  appearance: none;
  cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, #c9a227 50%),
    linear-gradient(135deg, #c9a227 50%, transparent 50%);
  background-position: calc(100% - 20px) 50%, calc(100% - 15px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  border-color: ${({ $invalid }) => ($invalid ? '#d9534f' : 'rgba(201, 162, 39, 0.22)')};

  option {
    background: #072529;
    color: #f7f3ea;
  }
`;

export const Textarea = styled.textarea<TextareaProps>`
  ${control}
  resize: vertical;
  min-height: 130px;
  border-color: ${({ $invalid }) => ($invalid ? '#d9534f' : 'rgba(201, 162, 39, 0.22)')};
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
    color: #d9534f;
  }
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: #e26d6a;
`;
