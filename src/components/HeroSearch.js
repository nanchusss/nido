import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Wrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr auto;
  gap: 12px;
  max-width: 960px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
`;

const Select = styled.select`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  font-size: 0.95rem;
`;

const Button = styled.button`
  background: #F27C38;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0 24px;
  font-weight: 500;
  cursor: pointer;
`;

export default function HeroSearch() {
  const navigate = useNavigate();
  const [operacion, setOperacion] = useState('comprar');
  const [tipo, setTipo] = useState('departamento');
  const [departamento, setDepartamento] = useState('capital');

  const handleSearch = () => {
    navigate(`/buscar/${departamento}`);
  };

  return (
    <Wrapper>
      <Select value={operacion} onChange={e => setOperacion(e.target.value)}>
        <option value="comprar">Comprar</option>
        <option value="alquilar">Alquilar</option>
      </Select>

      <Select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="departamento">Departamento</option>
        <option value="casa">Casa</option>
        <option value="ph">PH</option>
        <option value="terreno">Terreno</option>
      </Select>

      <Select
        value={departamento}
        onChange={e => setDepartamento(e.target.value)}
      >
        <option value="capital">Capital</option>
        <option value="godoy_cruz">Godoy Cruz</option>
        <option value="guaymallen">Guaymallén</option>
        <option value="lujan_de_cuyo">Luján de Cuyo</option>
      </Select>

      <Button onClick={handleSearch}>Buscar</Button>
    </Wrapper>
  );
}
