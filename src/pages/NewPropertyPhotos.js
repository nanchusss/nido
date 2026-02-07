import { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const SLOTS = [
  'Fachada',
  'Entrada',
  'Living',
  'Cocina',
  'Baño',
  'Habitación',
  'Habitación secundaria',
  'Cochera',
  'Patio / Jardín',
  'Balcón / Terraza',
  'Vista',
  'Detalle'
];

export default function NewPropertyPhotos({ onBack, onSubmit }) {
  const [photos, setPhotos] = useState(Array(SLOTS.length).fill(null));
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const inputRefs = useRef([]);

  const addFiles = (files, forcedIndex = null) => {
    const next = [...photos];
    let slotIndex =
      forcedIndex !== null ? forcedIndex : next.findIndex(p => p === null);

    Array.from(files).forEach(file => {
      if (slotIndex === -1) return;
      next[slotIndex] = {
        file,
        preview: URL.createObjectURL(file)
      };
      slotIndex = next.findIndex(p => p === null);
    });

    setPhotos(next);
  };

  const removePhoto = (index) => {
    const next = [...photos];
    next[index] = null;
    setPhotos(next);
    if (selectedIndex === index) setSelectedIndex(null);
  };

  

  const onDragStart = (_, index) => {
    setDragIndex(index);
    setSelectedIndex(index);
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    setOverIndex(index);
  };

  const onDropReorder = (index) => {
    if (dragIndex === null || dragIndex === index) return;

    const next = [...photos];
    [next[dragIndex], next[index]] =
      [next[index], next[dragIndex]];

    setPhotos(next);
    setDragIndex(null);
    setOverIndex(null);
  };

 const filled = photos.filter(p => p?.file).length;
const canContinue = filled >= 10;

  return (
    <Page>
      <Container>
        <Header>
          <Title>Fotos de la propiedad</Title>
          <Subtitle>
            Subí al menos 10 fotos. Podés cargarlas todas juntas y luego ordenarlas.
          </Subtitle>
        </Header>

        <BulkUpload>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
          />
          <span>Seleccionar varias fotos</span>
        </BulkUpload>

        <Grid>
          {SLOTS.map((label, index) => {
            const photo = photos[index];

            return (
              <Slot
                key={label}
                draggable={!!photo}
                cover={index === 0 && photo}
                dragging={dragIndex === index}
                over={overIndex === index}
                selected={selectedIndex === index}
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDrop={() => onDropReorder(index)}
                onClick={() => {
                  if (photo) setSelectedIndex(index);
                  else inputRefs.current[index].click();
                }}
              >
                {!photo ? (
                  <Empty>
                    <span>{label}</span>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="file"
                      accept="image/*"
                      onChange={(e) => addFiles(e.target.files, index)}
                    />
                  </Empty>
                ) : (
                  <Image>
                    <img src={photo.preview} alt={label} />
                    <Hover>{label}</Hover>
                    {index === 0 && <Cover>Portada</Cover>}
                    <Remove
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                      }}
                    >
                      ✕
                    </Remove>
                  </Image>
                )}
              </Slot>
            );
          })}
        </Grid>

        <Actions>
          <Secondary onClick={onBack}>← Volver</Secondary>
          <Primary
  type="button"
  disabled={!canContinue}
  onClick={() => {
    onSubmit(photos.filter(p => p?.file));
  }}
>
  Continuar
</Primary>
        </Actions>
      </Container>
    </Page>
  );
}

/* ======================= STYLES ======================= */

const glow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(242,124,56,0.9); }
  70% { box-shadow: 0 0 0 14px rgba(242,124,56,0); }
  100% { box-shadow: 0 0 0 0 rgba(242,124,56,0); }
`;

const Page = styled.div`
  padding-top: 200px;
  background: #f6f6f6;
  min-height: 100vh;
`;



const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 160px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const BulkUpload = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 14px 22px;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  cursor: pointer;
  margin-bottom: 36px;
  font-weight: 500;

  input {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 22px;
`;

const Slot = styled.div`
  background: white;
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  border: ${({ cover, selected }) =>
    selected
      ? '3px solid #111'
      : cover
      ? '2px solid #F27C38'
      : '2px solid transparent'};

  box-shadow: ${({ selected }) =>
    selected
      ? '0 0 0 3px rgba(0,0,0,0.15)'
      : '0 14px 40px rgba(0,0,0,0.08)'};

  transform: ${({ dragging }) =>
    dragging ? 'scale(0.95)' : 'scale(1)'};

  opacity: ${({ dragging }) => (dragging ? 0.9 : 1)};
  transition: all 0.15s ease;

  ${({ dragging }) =>
    dragging &&
    css`
      animation: ${glow} 1.1s ease-out infinite;
    `}

  ${({ over }) =>
    over &&
    css`
      outline: 3px dashed #F27C38;
      outline-offset: -6px;
      background: #fff7f2;
    `}
`;

const Empty = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 14px;
  border: 2px dashed #ddd;
  cursor: pointer;

  input {
    display: none;
  }
`;

const Image = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    pointer-events: none;
  }

  &:hover div {
    opacity: 1;
  }
`;

const Hover = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const Remove = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
`;

const Cover = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #F27C38;
  color: white;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 56px;
  position: relative;
  z-index: 10;
`;

const Primary = styled.button`
  position: relative;
  z-index: 11;

  background: #F27C38;
  color: white;
  padding: 18px 40px;
  border-radius: 18px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Secondary = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  color: #666;
  cursor: pointer;
`;