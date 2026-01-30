import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/* =========================
   MAP COLORS
========================= */

const MAP_COLORS = {
  mendozaBase: '#ffffff',
  otherBase: '#c3c2beff',
  border: '#cfcabf',
  hover: '#e9b86fff',
};

/* =========================
   BASE DEPARTAMENTOS
========================= */

const DEPARTAMENTOS = [
  'mendoza-gran-mendoza',
  'mendoza-capital',
  'mendoza-godoy-cruz',
  'mendoza-guaymallen',
  'mendoza-las-heras',
  'mendoza-lujan-de-cuyo',
  'mendoza-maipu',
  'mendoza-junin',
  'mendoza-rivadavia',
  'mendoza-san-martin',
  'mendoza-san-carlos',
  'mendoza-tunuyan',
  'mendoza-tupungato',
  'mendoza-san-rafael',
  'mendoza-general-alvear',
  'mendoza-malargue',
];

/* =========================
   STYLES
========================= */

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto 3rem;
  padding: 0 24px;
`;

const MapContainer = styled.div`
  background: #f3f3f1;
  border-radius: 24px;
  display: flex;
  justify-content: center;
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

/* =========================
   HELPERS
========================= */

const formatZonaName = (id) =>
  id
    .replace(/^mendoza-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

/* =========================
   COMPONENT
========================= */

export default function MendozaMap({ anunciosPorZona }) {
  const navigate = useNavigate();
  const objectRef = useRef(null);
  const tooltipRef = useRef(null);
  const anunciosRef = useRef({});

  useEffect(() => {
    anunciosRef.current = anunciosPorZona || {};
  }, [anunciosPorZona]);

 const handleNavigate = (id) => {
  if (id === 'mendoza-gran-mendoza') {
    // 👇 único camino válido desde el mapa general
    navigate('/buscar/gran-mendoza');
  }
  // cualquier otro departamento NO navega desde este mapa
};


  const handleSvgLoad = () => {
    const object = objectRef.current;
    const tooltip = tooltipRef.current;
    if (!object || !tooltip) return;

    const svg = object.contentDocument?.querySelector('svg');
    if (!svg) return;

    svg.querySelectorAll('title').forEach((t) => t.remove());

    svg.querySelectorAll('path').forEach((path) => {
      if (!path.id) return;

      const id = path.id
        .toLowerCase()
        .trim()
        .replace(/_/g, '-')
        .replace(/\s+/g, '-');

      const isMendoza = id.startsWith('mendoza');
      const baseFill = isMendoza
        ? MAP_COLORS.mendozaBase
        : MAP_COLORS.otherBase;

      const getCantidad = () => anunciosRef.current[id] ?? 0;

      path.style.cursor = 'pointer';
      path.style.fill = baseFill;
      path.style.stroke = MAP_COLORS.border;
      path.style.strokeWidth = '1.6px';
      path.style.transition =
        'fill 0.2s ease, stroke-width 0.2s ease';

      path.onmouseenter = () => {
        path.style.fill = MAP_COLORS.hover;
        path.style.strokeWidth = '2.4px';
        tooltip.style.opacity = '1';
      };

      path.onmousemove = (e) => {
        const rect = object.getBoundingClientRect();

        tooltip.innerHTML = `
          <strong>${formatZonaName(id)}</strong><br/>
          ${getCantidad()} anuncios
        `;

        tooltip.style.left = rect.left + e.offsetX + 92 + 'px';
        tooltip.style.top = rect.top + e.offsetY + 56 + 'px';
      };

      path.onmouseleave = () => {
        path.style.fill = baseFill;
        path.style.strokeWidth = '1.6px';
        tooltip.style.opacity = '0';
      };

      path.onclick = () => {
        handleNavigate(id);
      };
    });
  };

  return (
    <Wrapper>
      <MapContainer>
        <object
          ref={objectRef}
          data="/Mapa-general-2.svg"
          type="image/svg+xml"
          onLoad={handleSvgLoad}
          style={{
            width: '100%',
            maxWidth: '720px',
            height: '520px',
            display: 'block',
          }}
        />
      </MapContainer>

      {/* LISTADO POR DEPARTAMENTO */}
      <div style={{ marginTop: '2.5rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>
          Viviendas por departamento
        </h4>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px 24px',
          }}
        >
          {DEPARTAMENTOS.map((id) => {
            const cantidad = anunciosPorZona?.[id] ?? 0;

            return (
              <li
                key={id}
                onClick={() => handleNavigate(id)}
                style={{
                  cursor: 'pointer',
                  color: '#f27a1a',
                  fontSize: '14px',
                }}
              >
                {formatZonaName(id)}{' '}
                <span style={{ color: '#999' }}>
                  ({cantidad} anuncios)
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Tooltip ref={tooltipRef} />
    </Wrapper>
  );
}

