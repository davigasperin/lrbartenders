'use client';

import styled from 'styled-components';

import Container from '@/components/ui/Container';

const VIDEO_ID = 'W_JsUinjwAY';
const VIDEO_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&showinfo=0`;

const INTRO_TEXT =
  'Especializados em Alta Coquetelaria, proporcionamos uma experiência EXCLUSIVA com uma carta que combina drinks autorais e os clássicos mais sofisticados. Com um histórico de sucesso em eventos de diversos segmentos, somos reconhecidos como referência no serviço de bar. Entendemos que cada evento é único, por isso contamos com uma equipe de profissionais altamente qualificados para garantir um atendimento impecável e manter nosso elevado padrão de qualidade.';

export function VideoIntro() {
  return (
    <Section className="section">
      <IntroGrid>
        <VideoFrame>
          <iframe
            src={VIDEO_SRC}
            title="Vídeo de apresentação da LR Bartenders"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </VideoFrame>

        <Content>
          <Eyebrow>O que é a</Eyebrow>
          <Title>LR Bartenders</Title>
          <Divider aria-hidden="true" />
          <Text>{INTRO_TEXT}</Text>
        </Content>
      </IntroGrid>
    </Section>
  );
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
`;

const IntroGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const VideoFrame = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.large};
  border: 1px solid rgba(201, 162, 39, 0.35);
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.verdePetroleoEscuro};

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Content = styled.div`
  text-align: left;
`;

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.type.label};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.dourado};
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.texto};
`;

const Divider = styled.hr`
  width: 72px;
  height: 2px;
  border: none;
  background: ${({ theme }) => theme.colors.dourado};
  margin: 22px 0;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.type.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.textoMuted};
  max-width: 56ch;
`;