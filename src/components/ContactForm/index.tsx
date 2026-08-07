'use client';

import { useState, type FormEvent } from 'react';
import styled from 'styled-components';

import { Field, Input, Select, Textarea } from '@/components/ui/Form';
import { buildWhatsAppLink } from '@/lib/site';

const SUBJECTS = ['Orçamento', 'Agendar degustação', 'Dúvidas sobre serviços', 'Parcerias', 'Outros'];

type ContactData = {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
};

const initial: ContactData = {
  nome: '',
  email: '',
  telefone: '',
  assunto: '',
  mensagem: '',
};

export function ContactForm() {
  const [form, setForm] = useState<ContactData>(initial);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof ContactData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, boolean> = {};
    if (!form.nome.trim()) nextErrors.nome = true;
    if (!form.telefone.trim()) nextErrors.telefone = true;
    if (!form.mensagem.trim()) nextErrors.mensagem = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const lines = [
      '*Contato — LR Bartenders*',
      '',
      `*Nome:* ${form.nome.trim()}`,
      `*E-mail:* ${form.email.trim() || 'Não informado'}`,
      `*Telefone/WhatsApp:* ${form.telefone.trim()}`,
      `*Assunto:* ${form.assunto || 'Geral'}`,
      '',
      `*Mensagem:* ${form.mensagem.trim()}`,
    ];

    window.open(buildWhatsAppLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  if (sent) {
    return (
      <Success role="status">
        <CheckIcon aria-hidden="true">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckIcon>
        <SuccessTitle>Mensagem encaminhada!</SuccessTitle>
        <SuccessText>
          Abrimos o WhatsApp com sua mensagem pronta. Caso não tenha aberto, clique abaixo:
        </SuccessText>
        <a href={buildWhatsAppLink('Olá! Vim pelo site e quero falar com vocês.')} target="_blank" rel="noopener noreferrer">
          Reabrir WhatsApp
        </a>
      </Success>
    );
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Grid>
        <Field label="Nome completo" required error={errors.nome ? 'Informe seu nome.' : undefined}>
          <Input
            value={form.nome}
            onChange={(e) => update('nome', e.target.value)}
            placeholder="Seu nome"
            $invalid={errors.nome}
          />
        </Field>
        <Field label="E-mail">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="voce@email.com"
          />
        </Field>
        <Field label="Telefone / WhatsApp" required error={errors.telefone ? 'Informe um telefone.' : undefined}>
          <Input
            value={form.telefone}
            onChange={(e) => update('telefone', e.target.value)}
            placeholder="(19) 9 0000-0000"
            $invalid={errors.telefone}
          />
        </Field>
        <Field label="Assunto">
          <Select value={form.assunto} onChange={(e) => update('assunto', e.target.value)}>
            <option value="">Selecione…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </Grid>
      <Field label="Mensagem" required error={errors.mensagem ? 'Escreva sua mensagem.' : undefined}>
        <Textarea
          value={form.mensagem}
          onChange={(e) => update('mensagem', e.target.value)}
          placeholder="Como podemos ajudar?"
          $invalid={errors.mensagem}
        />
      </Field>

      <Submit type="submit">Enviar via WhatsApp</Submit>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Submit = styled.button`
  align-self: flex-start;
  padding: 16px 36px;
  border: none;
  border-radius: 999px;
  font: 600 1rem ${({ theme }) => theme.fonts.sans};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.douradoClaro} 0%,
    ${({ theme }) => theme.colors.dourado} 60%,
    ${({ theme }) => theme.colors.douradoEscuro} 100%
  );
  box-shadow: ${({ theme }) => theme.shadows.gold};
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.goldStrong};
  }
`;

const Success = styled.div`
  text-align: center;
  padding: 56px 24px;
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: ${({ theme }) => theme.radius.large};
  background: rgba(6, 35, 39, 0.3);

  a {
    display: inline-block;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.douradoClaro};
    font-weight: 600;
    text-decoration: underline;
  }
`;

const CheckIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.douradoClaro}, ${({ theme }) => theme.colors.dourado});
  box-shadow: ${({ theme }) => theme.shadows.gold};
`;

const SuccessTitle = styled.h3`
  margin: 22px 0 8px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.texto};
`;

const SuccessText = styled.p`
  color: ${({ theme }) => theme.colors.textoMuted};
`;
