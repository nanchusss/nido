import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { loadGoogleMaps } from '../../utils/loadGoogleMaps';

/* =========================
   BARRIOS → GOOGLE LABELS
========================= */

const BARRIO_LABELS = {
  'ciudad-centro': 'Centro, Mendoza, Argentina',
  'ciudad-primera-seccion': 'Primera Sección, Mendoza, Argentina',
  'ciudad-segunda-seccion': 'Segunda Sección, Mendoza, Argentina',
  'ciudad-tercera-seccion': 'Tercera Sección, Mendoza, Argentina',
  'ciudad-cuarta-seccion': 'Cuarta Sección, Mendoza, Argentina',
  'ciudad-quinta-seccion': 'Quinta Sección, Mendoza, Argentina',
  'ciudad-sexta-seccion': 'Sexta Sección, Mendoza, Argentina',
  'ciudad-septima-seccion': 'Séptima Sección, Mendoza, Argentina',
  'ciudad-parque-general-san-martin':
    'Parque General San Martín, Mendoza, Argentina',
  'ciudad-la-favorita': 'La Favorita, Mendoza, Argentina',
  'ciudad-los-cerros': 'Los Cerros, Mendoza, Argentina',
  'ciudad-dalvian': 'Barrio Dalvian, Mendoza, Argentina',
  'ciudad-piedemonte': 'Piedemonte, Mendoza, Argentina',
};

/* =========================
   STYLES
========================= */

const Wrapper = styled.div`
  width: 100%;
  margin: 2.5rem 0 3rem;
  padding: 0 24px;
`;

const SelectedBarrio = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f27a1a;
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  margin-bottom: 12px;

  button {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    line-height: 1;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 420px;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

const MapContainer = styled.div`
  width: 100%;
  background: #f3f3f1;
  border-radius: 24px;
  overflow: hidden;
`;

const MapInner = styled.div`
  width: 100%;
  height: 520px;
`;

/* =========================
   MOCK PROPERTIES
========================= */

const MOCK_PROPERTIES = [
  { id: 1, lat: -32.8832, lng: -68.8475, price: 120000 },
  { id: 2, lat: -32.8814, lng: -68.8452, price: 98000 },
  { id: 3, lat: -32.8845, lng: -68.8488, price: 135000 },
];

/* =========================
   COMPONENT
========================= */

export default function CapitalResultsMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const searchRef = useRef(null);

  const { barrio } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadGoogleMaps().then((google) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: -32.8895, lng: -68.8458 },
        zoom: 13,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
      });

      mapInstanceRef.current = map;

      /* ===== CENTRAR POR BARRIO (REAL, GOOGLE) ===== */
      if (barrio && BARRIO_LABELS[barrio]) {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { address: BARRIO_LABELS[barrio] },
          (results, status) => {
            if (status === 'OK' && results[0]?.geometry?.viewport) {
              map.fitBounds(results[0].geometry.viewport);
            }
          }
        );
      }

      /* ===== MARKERS ===== */
      MOCK_PROPERTIES.forEach((prop) => {
        const marker = new google.maps.Marker({
          position: { lat: prop.lat, lng: prop.lng },
          map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#f27a1a',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
          label: {
            text: `$${(prop.price / 1000).toFixed(0)}k`,
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '600',
          },
        });

        const info = new google.maps.InfoWindow({
          content: `<strong>USD ${prop.price.toLocaleString()}</strong>`,
        });

        marker.addListener('click', () => info.open(map, marker));
      });

      /* ===== BUSCADOR ===== */
      const autocomplete = new google.maps.places.Autocomplete(searchRef.current, {
        componentRestrictions: { country: 'ar' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      });

      // Enter → seleccionar primer resultado
      searchRef.current.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const firstItem = document.querySelector('.pac-item');
          if (firstItem) firstItem.click();
        }
      });

      setTimeout(() => {
        google.maps.event.trigger(map, 'resize');
      }, 0);
    });
  }, [barrio]);

  const clearBarrio = () => {
    navigate('/buscar/mendoza-capital/:barrio');
  };

  return (
    <Wrapper>
      {barrio && BARRIO_LABELS[barrio] && (
        <SelectedBarrio>
          {BARRIO_LABELS[barrio]}
          <button onClick={clearBarrio}>×</button>
        </SelectedBarrio>
      )}

      <SearchInput
        ref={searchRef}
        placeholder="Buscar barrio, dirección o zona"
      />

      <MapContainer>
        <MapInner ref={mapRef} />
      </MapContainer>
    </Wrapper>
  );
}

