import { useState } from 'react';
import styled from 'styled-components';

export default function PropertyGalleryStep({ photos, onNext }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    if (activeIndex < photos.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <Wrapper>
      <Gallery>
        <Main>
          <img src={photos[activeIndex].preview} alt="" />
          <Nav>
            <button onClick={prev} disabled={activeIndex === 0}>‹</button>
            <button onClick={next} disabled={activeIndex === photos.length - 1}>›</button>
          </Nav>
        </Main>

        <Thumbs>
          {photos.map((p, i) => (
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

      <Description>
        <h3>Descripción</h3>
        <textarea placeholder="Describí la propiedad..." />
        <AIButton>✨ Mejorar con IA</AIButton>
      </Description>

      <ProBlock />
      <Primary onClick={onNext}>Continuar</Primary>
    </Wrapper>
  );
}