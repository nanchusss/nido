import { useState } from 'react';
import styled from 'styled-components';

function NewPropertyPreview({ photos, onBack, onNext }) {
  const validPhotos = photos || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [description, setDescription] = useState('');
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState(null);

  const next = () => {
    if (activeIndex < validPhotos.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const improveWithAI = async () => {
    if (!description.trim()) return;

    setImproving(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5050/api/ai/improve-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: description })
      });

      if (!res.ok) {
        throw new Error('Error al mejorar la descripción');
      }

      const data = await res.json();

      if (data.result) {
        setDescription(data.result);
      }
    } catch (err) {
      setError('No se pudo mejorar el texto. Intentá de nuevo.');
    } finally {
      setImproving(false);
    }
  };

  return (
    <Page>
      <Container>
        <Header>
          <Title>Vista previa de la propiedad</Title>
          <Subtitle>Así se verá tu anuncio publicado</Subtitle>
        </Header>

        {validPhotos.length > 0 && (
          <Gallery>
            <Main>
              <img src={validPhotos[activeIndex].preview} alt="" />
              <Nav>
                <button onClick={prev} disabled={activeIndex === 0}>
                  ‹
                </button>
                <button
                  onClick={next}
                  disabled={activeIndex === validPhotos.length - 1}
                >
                  ›
                </button>
              </Nav>
            </Main>

            <Thumbs>
              {validPhotos.map((p, i) => (
                <Thumb
                  key={i}
                  active={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                >
                  <img src={p.preview} alt="" />
                </Thumb>
              ))}
            </Thumbs>
          </Gallery>
        )}

        <Block>
          <Label>Descripción</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describí la propiedad tal como es. La IA no va a inventar información."
          />

          <AIButton
            type="button"
            onClick={improveWithAI}
            disabled={improving}
          >
            {improving ? 'Mejorando…' : '✨ Mejorar con IA'}
          </AIButton>

          {error && <ErrorText>{error}</ErrorText>}
        </Block>

        <Actions>
          <Secondary type="button" onClick={onBack}>
            ← Volver
          </Secondary>

          <Primary
            type="button"
            onClick={() => {
              onNext({ description });
            }}
          >
            Continuar
          </Primary>
        </Actions>
      </Container>
    </Page>
  );
}

export default NewPropertyPreview;

/* ================= STYLES ================= */
/* 👇 Todo tu CSS queda EXACTAMENTE igual */

/* ================= STYLES ================= */

const Page = styled.div`
  padding-top: 200px;
  background: #f6f6f6;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 28px 160px;
`;

const Header = styled.div`
  margin-bottom: 44px;
`;

const Title = styled.h1`
  font-size: 38px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const Gallery = styled.div`
  margin-bottom: 60px;
`;

const Main = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 520px;
    object-fit: cover;
    border-radius: 28px;
  }
`;

const Nav = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: rgba(0,0,0,0.4);
    color: white;
    border: none;
    font-size: 42px;
    padding: 10px 22px;
    cursor: pointer;

    &:disabled {
      opacity: 0.2;
      cursor: default;
    }
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 18px;
  overflow-x: auto;
`;

const Thumb = styled.div`
  border: ${({ active }) =>
    active ? '3px solid #F27C38' : '3px solid transparent'};
  border-radius: 16px;
  cursor: pointer;

  img {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: 14px;
  }
`;

const Block = styled.div`
  background: white;
  padding: 40px;
  border-radius: 32px;
  box-shadow: 0 40px 90px rgba(0,0,0,0.08);
  margin-bottom: 40px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 12px;
  display: block;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  border-radius: 18px;
  border: 1px solid #ddd;
  padding: 18px;
  font-size: 15px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #F27C38;
    box-shadow: 0 0 0 3px rgba(242,124,56,0.15);
  }
`;

const AIButton = styled.button`
  margin-top: 14px;
  background: none;
  border: none;
  color: #F27C38;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ErrorText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #c0392b;
`;

const ProBox = styled.div`
  padding: 36px;
  border-radius: 28px;
  background: #fff7f2;
  margin-bottom: 60px;
`;

const ProButton = styled.button`
  margin-top: 16px;
  background: #F27C38;
  color: white;
  border: none;
  padding: 14px 26px;
  border-radius: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Primary = styled.button`
  background: #F27C38;
  color: white;
  padding: 18px 42px;
  border-radius: 22px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Secondary = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  color: #666;
  cursor: pointer;
`;