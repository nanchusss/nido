import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto 3rem;
  padding: 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 24px 40px rgba(0,0,0,0.08);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 16px;
`;

const Select = styled.select`
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
`;

const Button = styled.button`
  background: #F27C38;
  color: white;
  border: none;
  padding: 0 28px;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
`;

export default function AdvancedSearch() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Grid>

        <Select>
          <option>Comprar</option>
          <option>Alquilar</option>
          <option>Alquiler Temporal</option>
        </Select>

        <Select>
          <option>Tipo de propiedad</option>
          <option>Departamento</option>
          <option>Casa</option>
          <option>PH</option>
          <option>Terreno</option>
        </Select>

        <Select>
          <option>Ciudad de Mendoza</option>
          <option>Godoy Cruz</option>
          <option>Guaymallén</option>
          <option>Luján de Cuyo</option>
          <option>Maipú</option>
          <option>Las Heras</option>
        <option>San Martín</option>
        <option>Rivadavia</option>
        <option>Junín</option>
        <option>San Rafael</option>
        <option>Malargüe</option>
        <option>Las Catitas</option>
        
        </Select>

        <Button onClick={() => navigate('/buscar/mendoza')}>
          Buscar
        </Button>

      </Grid>
    </Wrapper>
  );
}
