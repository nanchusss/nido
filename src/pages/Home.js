import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';


/* ================== WRAPPER ================== */

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

/* ================== HERO SEARCH (SIMPLE) ================== */

const HeroSearch = styled.div`
  background: white;
  border-radius: 999px;
  padding: 0.6rem;
  display: flex;
  align-items: center;
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
  font-size: 0.95rem;
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

/* ================== SECTIONS ================== */

const Section = styled.section`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

/* ================== SLIDER ================== */

const Slider = styled.div`
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const ZoneCard = styled.div`
  min-width: 260px;
  height: 200px;
  background: #d9d9d9;
  border-radius: 20px;
  display: flex;
  align-items: flex-end;
  padding: 1.2rem;
  font-size: 1.1rem;
  color: white;
  flex-shrink: 0;
`;

/* ================== MAP CTA ================== */

const SectionMap = styled.section`
  max-width: 700px;
  margin: 4rem auto;
  padding: 0 2rem 6rem;
`;

const MapCTA = styled.div`
  height: 200px;
  border-radius: 20px;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapButton = styled.button`
  background: #f47c2c;
  color: white;
  border: none;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
`;

/* ================== COMPONENT ================== */

export default function Home() {
  const navigate = useNavigate();

  const [operacion, setOperacion] = useState('comprar');
  const [tipo, setTipo] = useState('departamento');
  const [zona, setZona] = useState('capital');

  return (
    <Wrapper>

      {/* ===== HERO ===== */}
      <Hero>
        <HeroInner>
          <Title>Por fin, alguien lo hizo bien.</Title>
          <Subtitle>
            Un portal claro, fácil y pensado para ayudarte a encontrar tu casa.
          </Subtitle>

          <HeroSearch>
            <HeroInput placeholder="¿Dónde querés vivir?" />
            <HeroButton onClick={() => navigate('/buscar/capital')}>
              Buscar
            </HeroButton>
          </HeroSearch>
        </HeroInner>
      </Hero>

      {/* ===== BUSCADOR AVANZADO ===== */}
      <AdvancedSearch>
        <SearchGrid>
          <Select value={operacion} onChange={e => setOperacion(e.target.value)}>
            <option value="comprar">Comprar</option>
            <option value="alquilar">Alquilar</option>
          </Select>

          <Select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="ph">PH</option>
            <option value="terreno">Terreno</option>
            <option value="oficina">Oficina</option>
            <option value="local_comercial">Local Comercial</option>
          </Select>

          <Select value={zona} onChange={e => setZona(e.target.value)}>
            <option value="capital">Capital</option>
            <option value="godoy_cruz">Godoy Cruz</option>
            <option value="guaymallen">Guaymallén</option>
            <option value="lujan_de_cuyo">Luján de Cuyo</option>
            <option value="maipu">Maipú</option>
            <option value="las_heras">Las Heras</option>
            <option value="san_martin">San Martín</option>
            <option value="rivadavia">Rivadavia</option>
            <option value="junin">Junín</option>
            <option value="san_rafael">San Rafael</option>
            <option value="malargue">Malargüe</option>
            <option value="las_catitas">Las Catitas</option>
          </Select>

          <SearchCTA onClick={() => navigate(`/buscar/${zona}`)}>
            Buscar
          </SearchCTA>
        </SearchGrid>
      </AdvancedSearch>

      {/* ===== EXPLORAR ===== */}
      <Section>
        <SectionHeader>
          <h2>Explorá por zona</h2>
          <Link to="/buscar/capital">Ver más propiedades</Link>
        </SectionHeader>

        <Slider>
          <ZoneCard>Ciudad de Mendoza</ZoneCard>
          <ZoneCard>Godoy Cruz</ZoneCard>
          <ZoneCard>Guaymallén</ZoneCard>
          <ZoneCard>Luján de Cuyo</ZoneCard>
          <ZoneCard>Maipú</ZoneCard>
          <ZoneCard>Las Heras</ZoneCard>
        </Slider>
      </Section>

      {/* ===== MAP CTA ===== */}
      <SectionMap>
        <MapCTA>
          <MapButton onClick={() => navigate('/buscar/capital')}>
            Ver propiedades en mapa
          </MapButton>
        </MapCTA>
      </SectionMap>

    </Wrapper>
  );
}
