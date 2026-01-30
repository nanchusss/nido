import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/* =========================
   MAP COLORS
========================= */

const MAP_COLORS = {
  base: '#ffffff',
  border: '#cfcabf',
  hover: '#e9b86fff',
};

/* =========================
   BARRIOS CAPITAL (IDs REALES SVG)
========================= */

const BARRIOS = [
  'ciudad-centro',
  'ciudad-primera-seccion',
  'ciudad-segunda-seccion',
  'ciudad-tercera-seccion',
  'ciudad-cuarta-seccion',
  'ciudad-quinta-seccion',
  'ciudad-sexta-seccion',
  'ciudad-septima-seccion',
  'ciudad-parque-general-san-martin',
  'ciudad-octava',
  'ciudad-la-favorita',
  'ciudad-los-cerros',
  'ciudad-dalvian',
  'ciudad-piedemonte',
];

/* =========================
   STYLES
========================= */

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto 4rem;
  padding: 0 24px;
`;

const MapContainer = styled.div`
  background: #f3f3f1;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

const Tooltip = styled.div`
  position: fixed;
  background: #ffffff;
  color: #333;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.12s ease;
  z-index: 9999;
  white-space: nowrap;
`;

const ListTitle = styled.h4`
  margin-bottom: 1.25rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 24px;
`;

const ListItem = styled.li`
  cursor: pointer;
  color: #f27a1a;
  font-size: 14px;
`;

/* =========================
   HELPERS
========================= */

const formatBarrioName = (id) =>
  id
    .replace(/^ciudad-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

/* =========================
   COMPONENT
========================= */

export default function CapitalMap({ anunciosPorZona }) {
  const navigate = useNavigate();
  const objectRef = useRef(null);
  const tooltipRef = useRef(null);
  const anunciosRef = useRef({});

  useEffect(() => {
    anunciosRef.current = anunciosPorZona || {};
  }, [anunciosPorZona]);

  const handleSvgLoad = () => {
    const object = objectRef.current;
    const tooltip = tooltipRef.current;
    if (!object || !tooltip) return;

    const svg = object.contentDocument?.querySelector('svg');
    if (!svg) return;

    svg.querySelectorAll('title').forEach((t) => t.remove());

    svg.querySelectorAll('path').forEach((path) => {
      if (!path.id) return;

      const id = path.id.toLowerCase();

      if (!BARRIOS.includes(id)) return;

      const getCantidad = () => anunciosRef.current[id] ?? 0;

      path.style.cursor = 'pointer';
      path.style.fill = MAP_COLORS.base;
      path.style.stroke = MAP_COLORS.border;
      path.style.strokeWidth = '1.6px';
      path.style.transition = 'fill 0.2s ease, stroke-width 0.2s ease';

      path.addEventListener('mouseenter', () => {
        path.style.fill = MAP_COLORS.hover;
        path.style.strokeWidth = '2.4px';
        tooltip.style.opacity = '1';
      });

      path.addEventListener('mousemove', (e) => {
        const rect = object.getBoundingClientRect();

        tooltip.innerHTML = `
          <strong>${formatBarrioName(id)}</strong><br/>
          ${getCantidad()} anuncios
        `;

        tooltip.style.left = rect.left + e.offsetX + 92 + 'px';
        tooltip.style.top = rect.top + e.offsetY + 56 + 'px';
      });

      path.addEventListener('mouseleave', () => {
        path.style.fill = MAP_COLORS.base;
        path.style.strokeWidth = '1.6px';
        tooltip.style.opacity = '0';
      });

      path.addEventListener('click', () => {
        navigate(`/buscar/gran-mendoza/mendoza-capital/${id}`);
      });
    });
  };

  return (
    <Wrapper>
      <MapContainer>
        <object
          ref={objectRef}
          data="/Mapa-capital.svg"
          type="image/svg+xml"
          onLoad={handleSvgLoad}
          style={{
            width: '100%',
            maxWidth: '980px',
            height: '600px',
            display: 'block',
          }}
        />
      </MapContainer>

      <ListTitle>Viviendas por barrio</ListTitle>

      <List>
        {BARRIOS.map((id) => {
          const cantidad = anunciosPorZona?.[id] ?? 0;

          return (
            <ListItem
              key={id}
              onClick={() =>
                navigate(
                  `/buscar/gran-mendoza/mendoza-capital/${id}`
                )
              }
            >
              {formatBarrioName(id)}{' '}
              <span style={{ color: '#999' }}>
                ({cantidad} anuncios)
              </span>
            </ListItem>
          );
        })}
      </List>

      <Tooltip ref={tooltipRef} />
    </Wrapper>
  );
}
