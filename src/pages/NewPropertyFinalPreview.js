import { useState } from 'react';
import styled from 'styled-components';

function NewPropertyFinalPreview({ propertyData, onBack, onPublish }) {
  const photos = propertyData.photos || [];
  const description = propertyData.preview?.description || '';
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    if (activeIndex < photos.length - 1) setActiveIndex(activeIndex + 1);
  };

  const prev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  return (
    <Page>
      <Container>
        <Card>

          {/* HEADER ANUNCIO */}
          <Header>
            <Title>{propertyData.title}</Title>
            <Meta>
              <span>Venta</span>
              <Dot />
              <span>{propertyData.department}</span>
              <Dot />
              <span>{propertyData.neighborhoodId}</span>
            </Meta>
            <Price>USD {propertyData.price}</Price>
          </Header>

          {/* GALERÍA + PANEL */}
          <TopGrid>
            <Gallery>
              {photos.length > 0 && (
                <>
                  <MainImage>
                    <img src={photos[activeIndex].preview} alt="" />
                    <Nav>
                      <NavButton onClick={prev} disabled={activeIndex === 0}>
                        ‹
                      </NavButton>
                      <NavButton
                        onClick={next}
                        disabled={activeIndex === photos.length - 1}
                      >
                        ›
                      </NavButton>
                    </Nav>
                    <Counter>
                      {activeIndex + 1} / {photos.length}
                    </Counter>
                  </MainImage>

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
                </>
              )}
            </Gallery>

            {/* PANEL DERECHO */}
            <SidePanel>
              <PanelTitle>Datos del anuncio</PanelTitle>
              <DataList>
                <li><strong>Precio</strong><span>USD {propertyData.price}</span></li>
                <li><strong>Departamento</strong><span>{propertyData.department}</span></li>
                <li><strong>Barrio</strong><span>{propertyData.neighborhoodId}</span></li>
                <li><strong>Dirección</strong><span>{propertyData.address}</span></li>
              </DataList>

              <DisabledBox>
                <strong>Contactar al anunciante</strong>
                <p>Disponible una vez publicado el anuncio</p>
                <DisabledButton disabled>Contactar</DisabledButton>
              </DisabledBox>
            </SidePanel>
          </TopGrid>

          {/* DESCRIPCIÓN */}
          <DescriptionBlock>
            <SectionTitle>Descripción</SectionTitle>
            <Description>{description}</Description>
          </DescriptionBlock>

          {/* FOOTER ACTIONS */}
          <Actions>
            <Secondary onClick={onBack}>← Volver</Secondary>
            <Primary onClick={() => onPublish(propertyData)}>
              Publicar propiedad
            </Primary>
          </Actions>

        </Card>
      </Container>
    </Page>
  );
}

export default NewPropertyFinalPreview;

/* ======================= STYLES ======================= */

/* ======================= STYLES ======================= */

const Page = styled.div`
  padding-top: 90px;
  background: #f6f6f6;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1050px;
  margin-top: 90px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px 140px;
`;

const Card = styled.div`
  background: white;
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.08);
  overflow: hidden; /* ⬅️ CLAVE */
`;

const Header = styled.div`
  margin-bottom: 26px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  color: #666;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #aaa;
`;

const Price = styled.div`
  margin-top: 10px;
  font-size: 22px;
  font-weight: 600;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 32px;
  margin-bottom: 36px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Gallery = styled.div`
  min-width: 0;
`;

const MainImage = styled.div`
  position: relative;

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 18px;
    display: block;
  }
`;

const Nav = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const NavButton = styled.button`
  background: rgba(0,0,0,0.45);
  color: white;
  border: none;
  font-size: 30px;
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  background: rgba(0,0,0,0.55);
  color: white;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
`;

const Thumbs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
`;

const Thumb = styled.div`
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: ${({ active }) =>
    active ? '2px solid #F27C38' : '2px solid transparent'};

  img {
    width: 64px;
    height: 48px;
    object-fit: cover;
  }
`;

const SidePanel = styled.div`
  min-width: 0;
`;

const PanelTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
`;

const DataList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
  font-size: 13.5px;

  li {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 8px;
    margin-bottom: 8px;
    color: #555;
    word-break: break-word; /* ⬅️ CLAVE */
  }

  strong {
    font-weight: 600;
    color: #333;
  }

  span {
    overflow-wrap: anywhere;
  }
`;

const DisabledBox = styled.div`
  background: #f6f6f6;
  padding: 18px;
  border-radius: 18px;
  font-size: 13px;

  p {
    margin: 6px 0 14px;
    color: #777;
  }
`;

const DisabledButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 999px;
  border: none;
  background: #ddd;
  font-size: 14px;
  cursor: not-allowed;
`;

const DescriptionBlock = styled.div`
  margin-bottom: 32px;
  max-width: 720px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: #444;
  white-space: pre-line;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Primary = styled.button`
  background: #F27C38;
  color: white;
  padding: 12px 32px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const Secondary = styled.button`
  background: none;
  border: none;
  font-size: 13.5px;
  color: #666;
  cursor: pointer;
`;