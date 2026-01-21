import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
`;

const MapContainer = styled.div`
  background: #f2f2f2;
  border-radius: 24px;
  padding: 2rem;
`;

const Zone = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: ${({ active }) => (active ? '#ddd' : '#eee')};
  cursor: pointer;
`;

const Sidebar = styled.div``;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: 0.6rem;
`;

const zones = {
  guaymallen: [
    'Villa Nueva',
    'San José',
    'Dorrego',
    'Las Cañas',
    'Pedro Molina'
  ],
  capital: ['Centro', 'Quinta Sección', 'Sexta Sección'],
};

function MendozaMap() {
  const [activeZone, setActiveZone] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper>
      <Layout>

        {/* MAPA (SVG SIMPLIFICADO) */}
        <MapContainer>
          <svg viewBox="0 0 400 300" width="100%" height="100%">
            <path
              d="M50 100 L180 80 L200 140 L120 180 Z"
              fill={activeZone === 'guaymallen' ? '#bbb' : '#ccc'}
              onMouseEnter={() => setActiveZone('guaymallen')}
              onClick={() => setExpanded(true)}
            />
            <text x="90" y="130">Guaymallén</text>

            <path
              d="M200 60 L300 80 L280 150 L210 120 Z"
              fill={activeZone === 'capital' ? '#bbb' : '#ccc'}
              onMouseEnter={() => setActiveZone('capital')}
              onClick={() => setExpanded(true)}
            />
            <text x="230" y="110">Capital</text>
          </svg>
        </MapContainer>

        {/* SIDEBAR */}
        <Sidebar>
          {activeZone && (
            <>
              <h2>{activeZone.toUpperCase()}</h2>

              <button onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Ver todo' : 'Ver barrios'}
              </button>

              {expanded && (
                <List>
                  {zones[activeZone].map((barrio) => (
                    <Item key={barrio}>{barrio}</Item>
                  ))}
                </List>
              )}
            </>
          )}
        </Sidebar>

      </Layout>
    </Wrapper>
  );
}

export default MendozaMap;
