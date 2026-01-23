import { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const Tooltip = styled.div`
  position: fixed;
  background: #ffffff;
  color: #333;
  border-radius: 8px;
  padding: 26px 10px;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.12s ease;
  z-index: 9999;
  white-space: nowrap;
`;

/* =========================
   COMPONENT
========================= */

export default function MendozaMap() {
  const navigate = useNavigate();
  const objectRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleSvgLoad = () => {
    const object = objectRef.current;
    const tooltip = tooltipRef.current;
    if (!object || !tooltip) return;

    const svg = object.contentDocument?.querySelector('svg');
    if (!svg) return;

    // Eliminar tooltips nativos del SVG
    svg.querySelectorAll('title').forEach((t) => t.remove());

    const anunciosPorZona = {
      mendoza: 124,
      'san-juan': 32,
      'san-luis': 18,
      cordoba: 23,
      'la-rioja': 12,
    };

    svg.querySelectorAll('path').forEach((path) => {
      const id = path.id;
      if (!id || !anunciosPorZona[id]) return;

      path.style.cursor = 'pointer';
      path.style.fill = '#e6e4de';
      path.style.transition = 'fill 0.2s ease';

      path.onmouseenter = () => {
        path.style.fill = '#c9a96a';
        tooltip.style.opacity = '1';
      };

      path.onmousemove = (e) => {
        const rect = object.getBoundingClientRect();

        tooltip.innerHTML = `${anunciosPorZona[id]} anuncios`;

        tooltip.style.left =
          rect.left + e.offsetX + 16 + 'px';

        tooltip.style.top =
          rect.top + e.offsetY + 6 + 'px';
      };

      path.onmouseleave = () => {
        path.style.fill = '#e6e4de';
        tooltip.style.opacity = '0';
      };

      path.onclick = () => {
        if (id === 'mendoza') {
          navigate('/mendoza');
        }
      };
    });
  };

  return (
    <Wrapper>
      <MapContainer>
        <object
          ref={objectRef}
          data="/Mapa-general.svg"
          type="image/svg+xml"
          onLoad={handleSvgLoad}
          style={{
            width: '600px',
            maxWidth: '100%',
            height: '420px',
            maxHeight: '420px',
            display: 'block',
          }}
        />
      </MapContainer>

      <Tooltip ref={tooltipRef} />
    </Wrapper>
  );
}
