import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BarrioMapFake from '../components/BarrioMapFake';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 32px;
`;

const Filters = styled.div`
  background: #f6f4ef;
  padding: 24px;
  border-radius: 16px;
`;

const FilterTitle = styled.h3`
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  background: #F27C38;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
`;

const Results = styled.div``;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 16px;
`;

const Empty = styled.div`
  background: #fafafa;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  color: #6a6a6a;
`;

export default function Barrio() {
  const { departamento, barrio } = useParams();

  return (
    <Layout>

      {/* FILTROS */}
      <Filters>
        <FilterTitle>Filtrar</FilterTitle>

        <Select>
          <option>Precio máximo</option>
          <option>$100.000</option>
          <option>$200.000</option>
        </Select>

        <Select>
          <option>Superficie mínima</option>
          <option>50 m²</option>
          <option>80 m²</option>
        </Select>

        <Select>
          <option>Habitaciones</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
        </Select>

        <Select>
          <option>Tipo de propiedad</option>
          <option>Departamento</option>
          <option>Casa</option>
          <option>PH</option>
        </Select>

        <Button>Ver anuncios</Button>
      </Filters>

      {/* RESULTADOS */}
      <Results>
        <Title>
          Viviendas en {barrio} — {departamento}
        </Title>

        <BarrioMapFake />

        <Empty>
          0 viviendas encontradas
        </Empty>
      </Results>

    </Layout>
  );
}
