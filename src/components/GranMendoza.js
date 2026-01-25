import styled from 'styled-components';
import GranMendozaMap from './GranMendozaMap';

/* =========================
   STYLES
========================= */

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 32px 64px; /* ⬅️ CLAVE: empuja todo debajo del header */
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 48px;
`;

const Subtitle = styled.p`
  color: #6a6a6a;
  margin-bottom: 48px;
`;

/* =========================
   COMPONENT
========================= */

export default function GranMendoza() {
  return (
    <Wrapper>
      <Title>Gran Mendoza</Title>
      <GranMendozaMap />
    </Wrapper>
  );
}

