'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Field, Input, Select, Textarea } from '@/components/ui/Form';
import { MENUS } from '@/lib/content';
import { SITE, buildWhatsAppLink } from '@/lib/site';

const EVENT_TYPES = ['Casamento', '15 Anos', 'Formatura', 'Corporativo', 'Aniversário', 'Festa Privada', 'Outro'];

const FIELD_LABELS: Record<string, string> = {
  nome: 'Nome completo',
  telefone: 'Telefone',
  email: 'E-mail',
  tipo: 'Tipo de evento',
  data: 'Data do evento',
  convidados: 'Número de convidados',
  local: 'Local do evento',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function todayISO(): string {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

type BudgetData = {
  nome: string;
  telefone: string;
  email: string;
  tipo: string;
  data: string;
  convidados: string;
  local: string;
  mensagem: string;
};

const initial: BudgetData = {
  nome: '',
  telefone: '',
  email: '',
  tipo: '',
  data: '',
  convidados: '',
  local: '',
  mensagem: '',
};

export function OrcamentoForm() {
  const [form, setForm] = useState<BudgetData>(initial);
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const update = (key: keyof BudgetData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleService = (title: string) => {
    setServices((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && toastVisible) {
      setToastVisible(false);
    }
  }, [errors, toastVisible]);

  if (sent) {
    return (
      <Success role="status">
        <CheckIcon aria-hidden="true">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckIcon>
        <SuccessTitle>Pedido de orçamento encaminhado!</SuccessTitle>
        <SuccessText>
          Abrimos o WhatsApp com sua mensagem pronta. Caso não tenha aberto, clique abaixo:
        </SuccessText>
        <a href={buildWhatsAppLink('Olá! Vim pelo site e quero um orçamento.')} target="_blank" rel="noopener noreferrer">
          Reabrir WhatsApp
        </a>
      </Success>
    );
  }

  return (
    <>
      {toastVisible && (
        <Toast role="alert" aria-live="assertive">
          <ToastIcon aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </ToastIcon>
          <ToastContent>
            <ToastTitle>Campos obrigatórios pendentes</ToastTitle>
            <ToastMessage>{toastMessage}</ToastMessage>
          </ToastContent>
          <ToastClose type="button" aria-label="Fechar aviso" onClick={() => setToastVisible(false)}>
            ×
          </ToastClose>
        </Toast>
      )}

      <Form
        onSubmit={(e) => {
          e.preventDefault();

          const nextErrors: Record<string, boolean> = {};
          if (!form.nome.trim()) nextErrors.nome = true;
          if (!form.telefone.trim()) nextErrors.telefone = true;
          if (!form.tipo) nextErrors.tipo = true;
          if (!form.data) {
            nextErrors.data = true;
          } else if (form.data < todayISO()) {
            nextErrors.data = true;
          }
          if (!form.convidados.trim() || !Number.isFinite(Number(form.convidados)) || Number(form.convidados) <= 0) nextErrors.convidados = true;
          if (form.convidados.trim() && Number(form.convidados) > 5000) nextErrors.convidados = true;
          if (!form.local.trim()) nextErrors.local = true;
          if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) nextErrors.email = true;

          if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            const missing = Object.keys(nextErrors).map((k) => FIELD_LABELS[k] || k).join(', ');
            setToastMessage(`Preencha: ${missing}.`);
            setToastVisible(true);

            requestAnimationFrame(() => {
              const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
              if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus({ preventScroll: true });
              }
            });
            return;
          }

          setToastVisible(false);

          const lines = [
            '*Novo pedido de orçamento — LR Bartenders*',
            '',
            `*Nome:* ${form.nome.trim()}`,
            `*Telefone/WhatsApp:* ${form.telefone.trim()}`,
          ];

          if (form.email.trim()) lines.push(`*E-mail:* ${form.email.trim()}`);
          lines.push(
            '',
            `*Tipo de evento:* ${form.tipo}`,
            `*Data do evento:* ${form.data}`,
            `*Convidados:* ${form.convidados.trim()}`,
            `*Local:* ${form.local.trim()}`,
          );

          if (services.length > 0) {
            lines.push('', `*Serviços de interesse:* ${services.join(', ')}`);
          }

          if (form.mensagem.trim()) {
            lines.push('', `*Mensagem:* ${form.mensagem.trim()}`);
          }

          lines.push('', `Enviado pelo site ${SITE.name}.`);
          const whatsappUrl = buildWhatsAppLink(lines.join('\n'));
          window.location.href = whatsappUrl;
          setSent(true);
        }}
        noValidate
      >
        <SectionTitle>Dados pessoais</SectionTitle>
        <Grid>
          <Field label="Nome completo" required error={errors.nome ? 'Informe seu nome.' : undefined}>
            <Input
              value={form.nome}
              onChange={(e) => update('nome', e.target.value)}
              placeholder="Seu nome"
              $invalid={errors.nome}
              aria-invalid={!!errors.nome}
            />
          </Field>
          <Field label="Telefone / WhatsApp" required error={errors.telefone ? 'Informe um telefone para contato.' : undefined}>
            <Input
              value={form.telefone}
              onChange={(e) => update('telefone', e.target.value)}
              placeholder="(19) 9 0000-0000"
              $invalid={errors.telefone}
              aria-invalid={!!errors.telefone}
            />
          </Field>
          <Field label="E-mail" error={errors.email ? 'Informe um e-mail válido.' : undefined}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="voce@email.com"
              $invalid={errors.email}
              aria-invalid={!!errors.email}
            />
          </Field>
        </Grid>

        <SectionTitle>Dados do evento</SectionTitle>
        <Grid>
          <Field label="Tipo de evento" required error={errors.tipo ? 'Escolha o tipo de evento.' : undefined}>
            <Select
              value={form.tipo}
              onChange={(e) => update('tipo', e.target.value)}
              $invalid={errors.tipo}
              aria-invalid={!!errors.tipo}
            >
              <option value="">Selecione…</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Data do evento" required error={errors.data ? 'Informe uma data válida (hoje ou futura).' : undefined}>
            <Input
              type="date"
              min={todayISO()}
              value={form.data}
              onChange={(e) => update('data', e.target.value)}
              $invalid={errors.data}
              aria-invalid={!!errors.data}
            />
          </Field>
          <Field label="Número de convidados" required error={errors.convidados ? 'Informe a quantidade de convidados (até 5.000).' : undefined}>
            <Input
              type="number"
              min={1}
              max={5000}
              inputMode="numeric"
              value={form.convidados}
              onChange={(e) => update('convidados', e.target.value)}
              placeholder="Ex.: 150"
              $invalid={errors.convidados}
              aria-invalid={!!errors.convidados}
            />
          </Field>
          <Field label="Local do evento" required error={errors.local ? 'Informe o local do evento.' : undefined}>
            <Input
              value={form.local}
              onChange={(e) => update('local', e.target.value)}
              placeholder="Cidade / local"
              $invalid={errors.local}
              aria-invalid={!!errors.local}
            />
          </Field>
        </Grid>

        <SectionTitle>Serviços de interesse</SectionTitle>
        <Chips>
          {MENUS.map((menu) => {
            const active = services.includes(menu.title);
            return (
              <Chip key={menu.id} type="button" $active={active} aria-pressed={active} onClick={() => toggleService(menu.title)}>
                {menu.title}
              </Chip>
            );
          })}
        </Chips>

        <SectionTitle>Detalhes</SectionTitle>
        <Field label="Conte mais sobre o evento">
          <Textarea
            value={form.mensagem}
            onChange={(e) => update('mensagem', e.target.value)}
            placeholder="Conte um pouco sobre a ocasião, preferências de drinks, horários…"
          />
        </Field>

        <Submit type="submit">Enviar via WhatsApp</Submit>
        <Assurance>
          <span>Orçamento sem compromisso</span>
          <span aria-hidden="true">·</span>
          <span>Resposta em até 24h úteis</span>
        </Assurance>
        <Privacy>Seus dados são usados apenas para atender seu pedido de orçamento.</Privacy>
      </Form>
    </>
  );
}

const slideIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -20px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const Toast = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;

  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 320px;
  max-width: calc(100vw - 32px);
  padding: 14px 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(140, 30, 30, 0.96), rgba(110, 20, 20, 0.96));
  border: 1px solid rgba(255, 120, 120, 0.6);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.2);
  color: #fff5f5;
  font-family: ${({ theme }) => theme.fonts.sans};

  animation: ${slideIn} 0.28s ease-out;
`;

const ToastIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffb3b3;
  flex-shrink: 0;
  padding-top: 2px;
`;

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const ToastTitle = styled.strong`
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const ToastMessage = styled.span`
  font-size: 0.88rem;
  line-height: 1.35;
  color: #ffd9d9;
`;

const ToastClose = styled.button`
  background: transparent;
  border: none;
  color: #ffd9d9;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
  flex-shrink: 0;
  align-self: flex-start;

  &:hover {
    color: #ffffff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.douradoClaro};
  margin: 6px 0 2px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.18);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.button<{ $active: boolean }>`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.dourado : 'rgba(201, 162, 39, 0.3)')};
  background: ${({ $active }) => ($active ? 'rgba(201, 162, 39, 0.16)' : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.douradoClaro : theme.colors.textoMuted)};
  font: 500 0.9rem ${({ theme }) => theme.fonts.sans};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.dourado};
    color: ${({ theme }) => theme.colors.douradoClaro};
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

const Assurance = styled.p`
  margin: -6px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Privacy = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textoMuted};
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
