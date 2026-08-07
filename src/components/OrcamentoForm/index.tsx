'use client';

import { useState, type FormEvent } from 'react';
import styled from 'styled-components';

import { Field, Input, Select, Textarea } from '@/components/ui/Form';
import { SERVICES } from '@/lib/content';
import { SITE, buildWhatsAppLink } from '@/lib/site';

const EVENT_TYPES = ['Casamento', '15 Anos', 'Formatura', 'Corporativo', 'Aniversário', 'Festa Privada', 'Outro'];
const GUEST_RANGES = ['Até 50', '51 a 100', '101 a 200', '201 a 300', 'Mais de 300'];
const BUDGET_RANGES = ['Até R$ 3.000', 'R$ 3.000 a R$ 6.000', 'R$ 6.000 a R$ 12.000', 'Acima de R$ 12.000', 'Ainda não sei'];

type BudgetData = {
  nome: string;
  telefone: string;
  email: string;
  tipo: string;
  data: string;
  convidados: string;
  local: string;
  orcamento: string;
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
  orcamento: '',
  mensagem: '',
};

export function OrcamentoForm() {
  const [form, setForm] = useState<BudgetData>(initial);
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof BudgetData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const toggleService = (title: string) => {
    setServices((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, boolean> = {};
    if (!form.nome.trim()) nextErrors.nome = true;
    if (!form.telefone.trim()) nextErrors.telefone = true;
    if (!form.tipo) nextErrors.tipo = true;
    if (!form.data) nextErrors.data = true;
    if (!form.convidados) nextErrors.convidados = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

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
      `*Convidados:* ${form.convidados}`,
      `*Local:* ${form.local.trim() || 'A definir'}`,
      `*Orçamento estimado:* ${form.orcamento || 'A definir'}`,
    );

    if (services.length > 0) {
      lines.push('', `*Serviços de interesse:* ${services.join(', ')}`);
    }

    if (form.mensagem.trim()) {
      lines.push('', `*Mensagem:* ${form.mensagem.trim()}`);
    }

    lines.push('', `Enviado pelo site ${SITE.name}.`);
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
    <Form onSubmit={handleSubmit} noValidate>
      <SectionTitle>Dados pessoais</SectionTitle>
      <Grid>
        <Field label="Nome completo" required error={errors.nome ? 'Informe seu nome.' : undefined}>
          <Input
            value={form.nome}
            onChange={(e) => update('nome', e.target.value)}
            placeholder="Seu nome"
            $invalid={errors.nome}
          />
        </Field>
        <Field label="Telefone / WhatsApp" required error={errors.telefone ? 'Informe um telefone para contato.' : undefined}>
          <Input
            value={form.telefone}
            onChange={(e) => update('telefone', e.target.value)}
            placeholder="(19) 9 0000-0000"
            $invalid={errors.telefone}
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
      </Grid>

      <SectionTitle>Dados do evento</SectionTitle>
      <Grid>
        <Field label="Tipo de evento" required error={errors.tipo ? 'Escolha o tipo de evento.' : undefined}>
          <Select value={form.tipo} onChange={(e) => update('tipo', e.target.value)} $invalid={errors.tipo}>
            <option value="">Selecione…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Data do evento" required error={errors.data ? 'Informe a data do evento.' : undefined}>
          <Input type="date" value={form.data} onChange={(e) => update('data', e.target.value)} $invalid={errors.data} />
        </Field>
        <Field label="Número de convidados" required error={errors.convidados ? 'Informe o número de convidados.' : undefined}>
          <Select value={form.convidados} onChange={(e) => update('convidados', e.target.value)} $invalid={errors.convidados}>
            <option value="">Selecione…</option>
            {GUEST_RANGES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Local do evento">
          <Input
            value={form.local}
            onChange={(e) => update('local', e.target.value)}
            placeholder="Cidade / local"
          />
        </Field>
        <Field label="Orçamento estimado">
          <Select value={form.orcamento} onChange={(e) => update('orcamento', e.target.value)}>
            <option value="">Selecione…</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
      </Grid>

      <SectionTitle>Serviços de interesse</SectionTitle>
      <Chips>
        {SERVICES.map((service) => {
          const active = services.includes(service.title);
          return (
            <Chip key={service.id} type="button" $active={active} aria-pressed={active} onClick={() => toggleService(service.title)}>
              {service.title}
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
      <Privacy>Seus dados são usados apenas para atender seu pedido de orçamento.</Privacy>
    </Form>
  );
}

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

const Privacy = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Success = styled.div`
  text-align: center;
  padding: 56px 24px;
  border: 1px solid rgba(201, 162, 39, 0.3);
  border-radius: ${({ theme }) => theme.radius.large};
  background: rgba(11, 58, 63, 0.3);

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
