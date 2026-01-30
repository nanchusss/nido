import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/* =========================
   MAP COLORS
========================= */

const MAP_COLORS = {
  mendozaBase: '#ffffff',
  border: '#cfcabf',
  hover: '#e9b86fff',
};

/* =========================
   DEPARTAMENTOS GRAN MENDOZA
========================= */

const DEPARTAMENTOS = [
  'mendoza-guaymallen',
  'mendoza-las-heras',
  'mendoza-godoy-cruz',
  'mendoza-capital',
  'mendoza-maipu',
  'mendoza-lujan-de-cuyo',
];

/* =========================
   STYLES
========================= */

const Wrapper = styled.div`
  max-width: 1100px;
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

export default function GranMendozaMap({ anunciosPorZona }) {
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
      const rawId = path.id;
      if (!rawId || !rawId.startsWith('departamento-')) return;

      const zona = rawId.replace('departamento-', '');

      const id = `mendoza-${zona
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/_/g, '-')}`;

      if (!DEPARTAMENTOS.includes(id)) return;

      const getCantidad = () => anunciosRef.current[id] ?? 0;

      path.style.cursor = 'pointer';
      path.style.fill = MAP_COLORS.mendozaBase;
      path.style.stroke = MAP_COLORS.border;
      path.style.strokeWidth = '1.6px';
      path.style.transition =
        'fill 0.2s ease, stroke-width 0.2s ease';
      path.style.pointerEvents = 'all';

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
        path.style.fill = MAP_COLORS.mendozaBase;
        path.style.strokeWidth = '1.6px';
        tooltip.style.opacity = '0';
      };

      path.onclick = () => {
        navigate(`/buscar/gran-mendoza/${id}`);
      };
    });
  };

  return (
    <Wrapper>
      <MapContainer>
        <object
          ref={objectRef}
          data="/Mapa-gran-mendoza.svg"
          type="image/svg+xml"
          onLoad={handleSvgLoad}
           aria-label="Mapa de la ciudad de Mendoza"
          style={{
            width: '100%',
            maxWidth: '980px',
            height: '600px',
            display: 'block',
          }}
        />
      </MapContainer>

      <Tooltip ref={tooltipRef} />
    </Wrapper>
  );
}
