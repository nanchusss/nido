import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/nidologo.png';
import mark from '../../assets/images/mark.png';


/* ================= WRAPPER ================= */

const FooterWrapper = styled.footer`
  margin-top: 120px;
`;

/* ================= TOP VISUAL ================= */

const TopVisual = styled.div`
  position: relative;
  background: url(${mark}) center / cover no-repeat;
  min-height: 540px;
  color: white;
`;


const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(242,124,56,0.96) 0%,
    rgba(242,124,56,0.85) 45%,
    rgba(242,124,56,0.35) 70%,
    rgba(242,124,56,0.05) 100%
  );
`;

const TopInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 90px 60px;

  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 80px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 64px 24px;
    gap: 40px;
  }
`;

/* ================= BRAND ================= */

const Logo = styled(Link)`
  display: inline-block;
`;

const LogoImg = styled.img`
  height: 130px;
  margin-bottom: 20px;
`;

const BrandText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  max-width: 420px;
  opacity: 0.95;
`;

/* ================= COLUMNS ================= */

const Column = styled.div``;

const ColumnTitle = styled.h4`
  font-size: 0.95rem;
  margin-bottom: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const FooterLink = styled(Link)`
  display: block;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: white;
  opacity: 0.9;
  text-decoration: none;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

/* ================= BOTTOM ================= */

const Bottom = styled.div`
  background: #2b2b2b;
  color: #bdbdbd;
  font-size: 0.8rem;
`;

const BottomInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 28px 40px;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

/* ================= COMPONENT ================= */

export default function Footer() {
  return (
    <FooterWrapper>
      <TopVisual>
        <Overlay />

        <TopInner>
          {/* Brand */}
          <div>
            <Logo to="/">
              <LogoImg src={logo} alt="NIDO" />
            </Logo>
            <BrandText>
              Un portal inmobiliario claro, humano y pensado para ayudarte a
              encontrar tu lugar en Mendoza.
            </BrandText>
          </div>

          {/* Column 1 */}
          <Column>
            <ColumnTitle>Explorar</ColumnTitle>
            <FooterLink to="/comprar">Comprar</FooterLink>
            <FooterLink to="/alquilar">Alquilar</FooterLink>
            <FooterLink to="/mapa-mendoza">Ver en mapa</FooterLink>
            <FooterLink to="/destacados">Propiedades destacadas</FooterLink>
          </Column>

          {/* Column 2 */}
          <Column>
            <ColumnTitle>Sobre NIDO</ColumnTitle>
            <FooterLink to="/quienes-somos">Quiénes somos</FooterLink>
            <FooterLink to="/faq">Preguntas frecuentes</FooterLink>
            <FooterLink to="/contacto">Contacto</FooterLink>
            <FooterLink to="/publicar">Publicar propiedad</FooterLink>
          </Column>
        </TopInner>
      </TopVisual>

      <Bottom>
        <BottomInner>
          <div>
            © {new Date().getFullYear()} NIDO — Mendoza, Argentina
          </div>
          <div>
            Términos · Privacidad · Cookies
          </div>
        </BottomInner>
      </Bottom>
    </FooterWrapper>
  );
}
