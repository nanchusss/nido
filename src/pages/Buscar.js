import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MendozaMap from '../components/MendozaMap';

/* =========================
   STYLES
========================= */

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 140px 32px 64px; /* ⬅️ CLAVE: empuja todo debajo del header */
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
   PAGE
========================= */

export default function Buscar() {
  const location = useLocation();
  const { operacion, tipo } = location.state || {};

  return (
    <Wrapper>
      <Title>Viviendas en Mendoza</Title>

      {(operacion || tipo) && (
        <Subtitle>
          {operacion} · {tipo}
        </Subtitle>
      )}

      <MendozaMap />

      <Subtitle>Viviendas por departamento</Subtitle>
    </Wrapper>
  );
}


