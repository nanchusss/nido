import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

/* ================== WRAPPER ================== */

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

/* ================== HERO ================== */

const Hero = styled.section`
  min-height: 90vh;
  padding: 8rem 2rem 6rem;
  display: flex;
  align-items: center;

  background:
    linear-gradient(
      rgba(255,255,255,0.55),
      rgba(255,255,255,0.55)
    ),
    url('/mendoza.jpeg') center / cover no-repeat;
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2.8rem;
`;

/* ================== SEARCH ================== */

const SearchWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  background: white;
  border-radius: 999px;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 1rem 1.4rem;
  font-size: 1rem;
  outline: none;
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
`;

const Filters = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1.2rem;
`;

const FilterChip = styled.button`
  border: 1px solid #ddd;
  background: white;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
`;

/* ================== SECTIONS ================== */

const Section = styled.section`
  max-width: 1200px;
  margin: 5rem auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.2rem;
`;

/* ================== ZONES ================== */

const ZonesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
`;

const ZoneCard = styled.article`
  height: 210px;
  border-radius: 18px;
  background: #ddd;
  display: flex;
  align-items: flex-end;
  padding: 1.3rem;
  color: white;
  font-size: 1.2rem;
`;

/* ================== MAP CARD ================== */

const MapCard = styled.div`
  grid-column: span 2;
  background: #e6e6e6;
  border-radius: 18px;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
`;

const MapButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
`;

/* ================== PROPERTIES ================== */

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem;
`;

const PropertyCard = styled.article`
  background: white;
  border-radius: 18px;
  overflow: hidden;
`;

const PropertyImage = styled.div`
  height: 230px;
  background: #ccc;
`;

const PropertyContent = styled.div`
  padding: 1.3rem;
`;

/* ================== COMPONENT ================== */

function Home() {
  const navigate = useNavigate();

  const goToMap = () => {
    navigate('/mapa-mendoza');
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

          <SearchWrapper>
            <SearchBar>
              <SearchInput placeholder="¿Dónde querés vivir?" />
              <SearchButton onClick={goToMap}>
                Buscar
              </SearchButton>
            </SearchBar>

            <Filters>
              <FilterChip>Comprar</FilterChip>
              <FilterChip>Alquilar</FilterChip>
              <FilterChip>Precio</FilterChip>
            </Filters>
          </SearchWrapper>
        </HeroInner>
      </Hero>

      {/* ZONAS */}
      <Section>
        <SectionHeader>
          <h2>Explorá por zona</h2>
          <Link to="/mapa-mendoza">Ver más propiedades</Link>
        </SectionHeader>

        <ZonesGrid>
          <ZoneCard>Ciudad de Mendoza</ZoneCard>
          <ZoneCard>Godoy Cruz</ZoneCard>
          <ZoneCard>Guaymallén</ZoneCard>
          <ZoneCard>Luján de Cuyo</ZoneCard>
          <ZoneCard>Maipú</ZoneCard>
          <ZoneCard>Las Heras</ZoneCard>
          <ZoneCard>San Martín</ZoneCard>
          <ZoneCard>Maipú</ZoneCard>

          <MapCard>
            <MapButton onClick={goToMap}>
              Ver propiedades en mapa
            </MapButton>
          </MapCard>
        </ZonesGrid>
      </Section>

      {/* PROPIEDADES */}
      <Section>
        <h2>Propiedades curadas</h2>

        <PropertiesGrid>
          <PropertyCard>
            <PropertyImage />
            <PropertyContent>
              <h3>Casa en Chacras de Coria</h3>
              <p>USD 180.000</p>
            </PropertyContent>
          </PropertyCard>

          <PropertyCard>
            <PropertyImage />
            <PropertyContent>
              <h3>Departamento en Ciudad</h3>
              <p>USD 95.000</p>
            </PropertyContent>
          </PropertyCard>

          <PropertyCard>
            <PropertyImage />
            <PropertyContent>
              <h3>Casa en Luján de Cuyo</h3>
              <p>USD 140.000</p>
            </PropertyContent>
          </PropertyCard>
        </PropertiesGrid>
      </Section>

    </Wrapper>
  );
}

export default Home;
