




import { useState } from 'react';
import styled from 'styled-components';
import ImageAIModal from '../components/ImageAIModal';

function ProImagePreview({ photos = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProBox>
        <h4>✨ Mostrá el potencial de tu propiedad</h4>
        <p>
          Probá una decoración virtual con IA usando una imagen de tu anuncio.
        </p>

        <ProButton type="button" onClick={() => setOpen(true)}>
          Ver ejemplo (Pro)
        </ProButton>
      </ProBox>

      {open && (
        <ImageAIModal
          images={photos}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default ProImagePreview;

/* STYLES */

const ProBox = styled.div`
  background: #fff4ec;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 32px;
`;

const ProButton = styled.button`
  margin-top: 12px;
  background: #ff8a3d;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
`;