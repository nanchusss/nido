import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { barriosPorDepartamento } from '../../data/barriosMendoza';
import GranMendozaMap from '../../components/map/GranMendozaMap';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 24px;
`;

const List = styled.ul`
  columns: 2;
  gap: 32px;
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const CTA = styled.button`
  margin-top: 32px;
  background: #F27C38;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
`;

export default function Departamento() {
  const { departamento } = useParams();
  const navigate = useNavigate();

  const barrios = barriosPorDepartamento[departamento] || [];

  return (
    <Wrapper>
      <Title>Viviendas en {departamento}</Title>

      {/* MAPA gran mendoza INTERACTIVO */}
      <GranMendozaMap departamento={departamento} />

      <h3>Viviendas por barrio</h3>

      <List>
        {barrios.map(barrio => (
          <Item
            key={barrio}
            onClick={() =>
              navigate(`/buscar/${departamento}/${barrio}`)
            }
          >
            {barrio}
          </Item>
        ))}
      </List>

      <CTA>Ver todos los anuncios</CTA>
    </Wrapper>
  );
}
