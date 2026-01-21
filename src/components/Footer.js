// src/components/Footer.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background: #ffffff;
  border-top: 1px solid #eee;
  margin-top: 6rem;
`;

const FooterInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2.5rem;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  margin-bottom: 4rem;
`;

const Column = styled.div``;

const Title = styled.h4`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  padding-top: 3rem;
  border-top: 1px solid #eee;
`;

const Socials = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const SocialIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #000;
`;

const Copyright = styled.div`
  margin-top: 3rem;
  font-size: 0.8rem;
  color: #666;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>

        {/* TOP */}
        <TopGrid>
          <Column>
            <Title>Búsquedas populares</Title>
            <List>
              <Item>Departamentos en alquiler en Mendoza</Item>
              <Item>Casas en venta en Luján de Cuyo</Item>
              <Item>Departamentos en Godoy Cruz</Item>
              <Item>Casas en Maipú</Item>
              <Item>Ver más</Item>
            </List>
          </Column>

          <Column>
            <Title>También se busca</Title>
            <List>
              <Item>Casas en Chacras de Coria</Item>
              <Item>Departamentos en Ciudad</Item>
              <Item>Propiedades en alquiler en Mendoza</Item>
              <Item>Terrenos en venta</Item>
              <Item>Ver más</Item>
            </List>
          </Column>

          <Column>
            <Title>Consultas frecuentes</Title>
            <List>
              <Item>Departamentos monoambiente en Mendoza</Item>
              <Item>Casas con patio</Item>
              <Item>Alquiler directo dueño</Item>
              <Item>Casas con cochera</Item>
              <Item>Ver más</Item>
            </List>
          </Column>
        </TopGrid>

        {/* BOTTOM */}
        <BottomGrid>
          <Column>
            <Title>Más NIDO</Title>
            <List>
              <Item>Inmuebles en Mendoza</Item>
              <Item>Publicar propiedad</Item>
              <Item>Ayuda</Item>
              <Item>Mapa del sitio</Item>
              <Item>Noticias</Item>
              <Item>Contacto</Item>
            </List>
          </Column>

          <Column>
            <Title>Anunciantes</Title>
            <List>
              <Item>Inmobiliarias</Item>
              <Item>Corredores</Item>
              <Item>Desarrolladores</Item>
            </List>
          </Column>

          <Column>
            <Title>Región</Title>
            <List>
              <Item>Mendoza</Item>
              <Item>San Juan</Item>
              <Item>San Luis</Item>
            </List>
          </Column>

          <Column>
            <Title>Seguinos</Title>
            <Socials>
              <SocialIcon />
              <SocialIcon />
              <SocialIcon />
              <SocialIcon />
            </Socials>
          </Column>
        </BottomGrid>

        <Copyright>
          © {new Date().getFullYear()} NIDO · Términos y Condiciones · Política de Privacidad
        </Copyright>

      </FooterInner>
    </FooterWrapper>
  );
}

export default Footer;
