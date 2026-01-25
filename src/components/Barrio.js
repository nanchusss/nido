import { useParams } from 'react-router-dom';
import CapitalResultsMap from '../components/map/CapitalResultsMap';
import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 32px 64px;
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;


export default function Barrio() {
  const { barrio } = useParams();

  return (
    <Wrapper>

      <Title>Encuentra tu hogar en {barrio}</Title>

      <CapitalResultsMap barrio={barrio} />
    </Wrapper>
  );
}



/* =========================
   STYLES
========================= */




