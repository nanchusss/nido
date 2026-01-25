import styled from 'styled-components';
import CapitalMap from './CapitalMap';

/* =========================
   STYLES
========================= */

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 32px 64px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  color: #6a6a6a;
  margin-bottom: 48px;
`;

/* =========================
   COMPONENT
========================= */

export default function Capital() {
  return (
    <Wrapper>
      <Title>Ciudad de Mendoza</Title>
      <Subtitle>
        Explorá barrios y encontrá propiedades en Capital
      </Subtitle>

      <CapitalMap />
    </Wrapper>
  );
}
