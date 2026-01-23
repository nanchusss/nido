import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const Area = styled.div`
  background: #f4efe8;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;

  &:hover {
    background: #f0e2d4;
  }
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
`;

const Count = styled.div`
  font-size: 0.85rem;
  color: #6a6a6a;
`;

export default function MendozaMapFake({ departamento }) {
  const navigate = useNavigate();

  return (
    <MapGrid>
      <Area onClick={() => navigate(`/buscar/${departamento}/centro`)}>
        <Name>Centro</Name>
        <Count>0 viviendas</Count>
      </Area>

      <Area onClick={() => navigate(`/buscar/${departamento}/quinta-seccion`)}>
        <Name>Quinta Sección</Name>
        <Count>0 viviendas</Count>
      </Area>

      <Area onClick={() => navigate(`/buscar/${departamento}/sexta-seccion`)}>
        <Name>Sexta Sección</Name>
        <Count>0 viviendas</Count>
      </Area>

      <Area onClick={() => navigate(`/buscar/${departamento}/cuarta-seccion`)}>
        <Name>Cuarta Sección</Name>
        <Count>0 viviendas</Count>
      </Area>
    </MapGrid>
  );
}
