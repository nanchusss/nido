import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

function ImageAIModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [aiPreview, setAiPreview] = useState(null);
  const [style, setStyle] = useState('mediterranean');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setOriginalPreview(URL.createObjectURL(selected));
    setAiPreview(null);
    setError(null);
  };

 const generatePreview = async () => {
  if (!file) return;

  setLoading(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append('image', file);      // 👈 CLAVE
    formData.append('style', style);

    const res = await fetch(
      'http://localhost:5050/api/ai-image/virtual-staging/preview',
      {
        method: 'POST',
        body: formData,                  // 👈 SIN headers
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al generar la imagen');
    }

    const data = await res.json();
    setAiPreview(data.previewImageUrl);
  } catch (err) {
    console.error(err);
    setError(
      'La vista previa es ilustrativa y está en fase experimental.'
    );
  } finally {
    setLoading(false);
  }
};

  return createPortal(
    <Overlay>
      <Modal>
        <Header>
          <h3>Decoración virtual con IA</h3>
          <p>
            Vista ilustrativa del potencial del ambiente.
            No modifica la propiedad real.
          </p>
        </Header>

        <Controls>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <Select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="mediterranean">Mediterráneo</option>
            <option value="modern">Moderno</option>
            <option value="nordic">Nórdico</option>
            <option value="industrial">Industrial</option>
          </Select>

          <Primary
            onClick={generatePreview}
            disabled={!file || loading}
          >
            {loading ? 'Generando…' : 'Generar vista previa'}
          </Primary>
        </Controls>

        {(originalPreview || aiPreview) && (
          <Compare>
            {originalPreview && (
              <ImageBox>
                <Label>Imagen original</Label>
                <img src={originalPreview} alt="Original" />
              </ImageBox>
            )}

            <ImageBox>
              <Label>Vista ilustrativa IA</Label>

              {loading && (
                <Placeholder>Generando imagen…</Placeholder>
              )}

              {aiPreview && (
                <ResultWrapper>
                  <img src={aiPreview} alt="IA" />
                  <Watermark>Preview Premium</Watermark>
                </ResultWrapper>
              )}
            </ImageBox>
          </Compare>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <Footer>
          <Secondary onClick={onClose}>Cerrar</Secondary>
          {aiPreview && <Primary>Activar Premium</Primary>}
        </Footer>
      </Modal>
    </Overlay>,
    document.body
  );
}

export default ImageAIModal;

/* ===================== */
/* STYLES */
/* ===================== */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const Select = styled.select`
  padding: 8px;
`;

const Compare = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled.div`
  text-align: center;

  img {
    width: 100%;
    border-radius: 12px;
    user-select: none;
    pointer-events: none;
  }
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Placeholder = styled.div`
  height: 100%;
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  border-radius: 12px;
`;

const ResultWrapper = styled.div`
  position: relative;
`;

const Watermark = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: rgba(255,255,255,0.7);
  background: rgba(0,0,0,0.3);
`;

const ErrorText = styled.p`
  margin-top: 16px;
  color: #b00020;
`;

const Footer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
`;

const Primary = styled.button`
  background: #ff8a3d;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Secondary = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
`;