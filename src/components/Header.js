import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FiMail,
  FiBell,
  FiSearch,
  FiHeart,
  FiMenu
} from 'react-icons/fi';

import logo from '../IMAGES/nidologo.png';

/* ================= WRAPPER ================= */

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

/* ================= INNER ================= */

const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 21px 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* ================= LOGO ================= */

const Logo = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 140px;
`;

/* ================= NAV ================= */

const Nav = styled.nav`
  display: flex;
  gap: 40px;
`;

const NavItem = styled.div`
  position: relative;
  padding: 8px 0;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 70%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

/* ================= MEGA MENU ================= */

const MegaMenu = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0px 0px 16px 16px;
  width: 70%;

  background: white;
  padding: 56px 0;
  box-shadow: 0 24px 48px rgba(0,0,0,0.08);
`;


const MegaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 56px;
`;

const Column = styled.div``;

const ColumnTitle = styled.h4`
  margin-bottom: 16px;
  font-weight: 600;
`;

const MenuLink = styled(Link)`
  display: block;
  margin-bottom: 10px;
  color: #1e1e1e;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/* ================= ACTIONS ================= */

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBtn = styled.button`
  background: transparent;
  border: none;
  padding: 8px;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.06);
    border-radius: 8px;
  }
`;

const PublishBtn = styled(Link)`
  margin-left: 16px;
  background: #F27C38;
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 500;
`;

/* ================= COMPONENT ================= */

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <HeaderWrapper>

      <Inner>
        <Logo to="/">
          <LogoImg src={logo} alt="NIDO" />
        </Logo>

        <Nav>
          <NavItem onMouseEnter={() => setOpenMenu('comprar')}>
            Comprar
          </NavItem>

          <NavItem onMouseEnter={() => setOpenMenu('alquilar')}>
            Alquilar
          </NavItem>

          <NavItem>Servicios</NavItem>
        </Nav>

        <Right>
          <IconBtn><FiMail /></IconBtn>
          <IconBtn><FiBell /></IconBtn>
          <IconBtn><FiHeart /></IconBtn>
          <IconBtn><FiSearch /></IconBtn>

          <PublishBtn to="/publicar">Publicar</PublishBtn>
          <IconBtn><FiMenu /></IconBtn>
        </Right>
      </Inner>

      {openMenu === 'comprar' && (
        <MegaMenu onMouseLeave={() => setOpenMenu(null)}>
          <MegaInner>
            <Column>
              <ColumnTitle>Tipo de propiedad</ColumnTitle>
              <MenuLink to="/comprar/departamentos">Departamentos</MenuLink>
              <MenuLink to="/comprar/casas">Casas</MenuLink>
              <MenuLink to="/comprar/ph">PH</MenuLink>
              <MenuLink to="/comprar/terrenos">Terrenos</MenuLink>
              <MenuLink to="/comprar/quinchos">Quinchos</MenuLink>
              <MenuLink to="/comprar/locales-comerciales">Locales Comerciales</MenuLink>
              <MenuLink to="/comprar/oficinas">Oficinas</MenuLink>  
            </Column>

            <Column>
              <ColumnTitle>Zonas</ColumnTitle>
              <MenuLink to="/zonas/mendoza/ciudad">Ciudad</MenuLink>
              <MenuLink to="/zonas/mendoza/godoy-cruz">Godoy Cruz</MenuLink>
              <MenuLink to="/zonas/mendoza/guaymallen">Guaymallén</MenuLink>
              <MenuLink to="/zonas/mendoza/lujan">Luján</MenuLink>
              <MenuLink to="/zonas/mendoza/maipu">Maipú</MenuLink>
              <MenuLink to="/zonas/mendoza/las-heras">Las Heras</MenuLink>
              <MenuLink to="/zonas/mendoza/san-martin">San Martín</MenuLink>
              <MenuLink to="/zonas/mendoza/san-rafael">San Rafael</MenuLink>
              <MenuLink to="/zonas/mendoza/otros">Otros</MenuLink>
            </Column>

            <Column>
              <ColumnTitle>Explorar</ColumnTitle>
              <MenuLink to="/mapa-mendoza">Ver en mapa</MenuLink>
            </Column>

            <Column>
              <ColumnTitle>Acciones</ColumnTitle>
              <MenuLink to="/publicar">Publicar propiedad</MenuLink>
              <MenuLink to="/favoritos">Mis favoritos</MenuLink>
            </Column>
          </MegaInner>
        </MegaMenu>
      )}

       {openMenu === 'alquilar' && (
        <MegaMenu onMouseLeave={() => setOpenMenu(null)}>
          <MegaInner>
            <Column>
              <ColumnTitle>Tipo de propiedad</ColumnTitle>
              <MenuLink to="/alquilar/departamentos">Departamentos</MenuLink>
              <MenuLink to="/alquilar/casas">Casas</MenuLink>
              <MenuLink to="/alquilar/ph">PH</MenuLink>
              <MenuLink to="/alquilar/terrenos">Terrenos</MenuLink>
              <MenuLink to="/alquilar/quinchos">Quinchos</MenuLink>
              <MenuLink to="/alquilar/locales-comerciales">Locales Comerciales</MenuLink>
              <MenuLink to="/alquilar/oficinas">Oficinas</MenuLink>  
            </Column>

            <Column>
              <ColumnTitle>Zonas</ColumnTitle>
              <MenuLink to="/zonas/mendoza/ciudad">Ciudad</MenuLink>
              <MenuLink to="/zonas/mendoza/godoy-cruz">Godoy Cruz</MenuLink>
              <MenuLink to="/zonas/mendoza/guaymallen">Guaymallén</MenuLink>
              <MenuLink to="/zonas/mendoza/lujan">Luján</MenuLink>
              <MenuLink to="/zonas/mendoza/maipu">Maipú</MenuLink>
              <MenuLink to="/zonas/mendoza/las-heras">Las Heras</MenuLink>
              <MenuLink to="/zonas/mendoza/san-martin">San Martín</MenuLink>
              <MenuLink to="/zonas/mendoza/san-rafael">San Rafael</MenuLink>
              <MenuLink to="/zonas/mendoza/otros">Otros</MenuLink>
            </Column>

            <Column>
              <ColumnTitle>Explorar</ColumnTitle>
              <MenuLink to="/mapa-mendoza">Ver en mapa</MenuLink>
            </Column>

            <Column>
              <ColumnTitle>Acciones</ColumnTitle>
              <MenuLink to="/publicar">Publicar propiedad</MenuLink>
              <MenuLink to="/favoritos">Mis favoritos</MenuLink>
            </Column>
          </MegaInner>
        </MegaMenu>
      )}


    </HeaderWrapper>
  );
}
