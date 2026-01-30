import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/* ================== CONSTANTES ================== */

const GRAN_MENDOZA = [
  'capital',
  'godoy_cruz',
  'guaymallen',
  'lujan_de_cuyo',
  'maipu',
  'las_heras',
];

/* ================== STYLES ================== */

const Wrapper = styled.div`
  background: #fafafa;
`;

/* ================== HERO ================== */

const Hero = styled.section`
  position: relative;
  min-height: 36vh;
  padding: 180px 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.75)),
    url('/mendoza.jpeg') center / cover no-repeat;

  clip-path: ellipse(120% 100% at 50% 0%);
`;

const HeroInner = styled.div`
  max-width: 720px;
  text-align: center;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  margin-bottom: 0.75rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  margin-bottom: 2rem;
  color: rgba(0,0,0,0.75);
`;

/* ================== HERO SEARCH ================== */

const HeroSearch = styled.div`
  background: white;
  border-radius: 999px;
  padding: 0.6rem;
  display: flex;
  gap: 0.6rem;
  max-width: 640px;
  margin: 0 auto;
`;

const HeroInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  outline: none;
`;

const HeroButton = styled.button`
  background: #f47c2c;
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
`;

/* ================== ADVANCED SEARCH ================== */

const AdvancedSearch = styled.section`
  max-width: 1000px;
  margin: 40px auto 3rem;
  padding: 2rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
`;

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const SearchCTA = styled.button`
  background: #f47c2c;
  color: white;
  border: none;
  padding: 0 1.6rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
`;

/* ================== COMPONENT ================== */

export default function Home() {
  const navigate = useNavigate();

  const [operacion, setOperacion] = useState('comprar');
  const [tipo, setTipo] = useState('departamento');
  const [zona, setZona] = useState('capital');

  const handleAdvancedSearch = () => {
    const zonaNormalizada = `mendoza-${zona.replace(/_/g, '-')}`;

    const query = new URLSearchParams({
      operacion,
      tipo,
    }).toString();

    if (GRAN_MENDOZA.includes(zona)) {
      navigate(`/buscar/gran-mendoza/${zonaNormalizada}?${query}`);
    } else {
      navigate(`/buscar/mendoza?departamento=${zonaNormalizada}&${query}`);
    }
  };

  return (
    <Wrapper>

      {/* HERO */}
      <Hero>
        <HeroInner>
          <Title>Por fin, alguien lo hizo bien.</Title>
          <Subtitle>
            Un portal claro, fácil y pensado para ayudarte a encontrar tu casa.
          </Subtitle>

          <HeroSearch>
            <HeroInput placeholder="¿Dónde querés vivir?" />
            <HeroButton onClick={() => navigate('/buscar')}>
              Buscar
            </HeroButton>
          </HeroSearch>
        </HeroInner>
      </Hero>

      {/* BUSCADOR AVANZADO */}
      <AdvancedSearch>
        <SearchGrid>
          <Select value={operacion} onChange={e => setOperacion(e.target.value)}>
            <option value="comprar">Comprar</option>
            <option value="alquilar">Alquilar</option>
            <option value="alquiler_temporal">Alquiler temporal</option>
          </Select>

          <Select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="ph">PH</option>
            <option value="terreno">Terreno</option>
            <option value="oficina">Oficina</option>
            <option value="local_comercial">Local comercial</option>
          </Select>

          <Select value={zona} onChange={e => setZona(e.target.value)}>
            <option value="capital">Capital</option>
            <option value="godoy_cruz">Godoy Cruz</option>
            <option value="guaymallen">Guaymallén</option>
            <option value="lujan_de_cuyo">Luján de Cuyo</option>
            <option value="maipu">Maipú</option>
            <option value="las_heras">Las Heras</option>
            <option value="san_rafael">San Rafael</option>
            <option value="malargue">Malargüe</option>
          </Select>

          <SearchCTA onClick={handleAdvancedSearch}>
            Buscar
          </SearchCTA>
        </SearchGrid>
      </AdvancedSearch>

    </Wrapper>
  );
}
