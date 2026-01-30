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
import { useAuth } from '../auth/AuthContext';


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
  width: 70%;
  background: white;
  padding: 56px 0;
  border-radius: 0 0 16px 16px;
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
  text-decoration: none;
`;

/* ================= COMPONENT ================= */

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const auth = useAuth();

if (!auth) return null;

const { isAuthenticated, user, logout } = auth;



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

          <PublishBtn to={isAuthenticated ? '/publicar' : '/login'}>
  Publicar
</PublishBtn>

          <IconBtn><FiMenu /></IconBtn>
        </Right>
      </Inner>

      {(openMenu === 'comprar' || openMenu === 'alquilar') && (
        <MegaMenu onMouseLeave={() => setOpenMenu(null)}>
          <MegaInner>
            <Column>
              <ColumnTitle>Tipo de propiedad</ColumnTitle>
              <MenuLink to={`/${openMenu}/departamentos`}>Departamentos</MenuLink>
              <MenuLink to={`/${openMenu}/casas`}>Casas</MenuLink>
              <MenuLink to={`/${openMenu}/ph`}>PH</MenuLink>
              <MenuLink to={`/${openMenu}/terrenos`}>Terrenos</MenuLink>
              <MenuLink to={`/${openMenu}/locales-comerciales`}>Locales</MenuLink>
              <MenuLink to={`/${openMenu}/oficinas`}>Oficinas</MenuLink>
            </Column>

            <Column>
              <ColumnTitle>Zonas</ColumnTitle>
              <MenuLink to="/zonas/mendoza/ciudad">Ciudad</MenuLink>
              <MenuLink to="/zonas/mendoza/godoy-cruz">Godoy Cruz</MenuLink>
              <MenuLink to="/zonas/mendoza/guaymallen">Guaymallén</MenuLink>
              <MenuLink to="/zonas/mendoza/lujan">Luján</MenuLink>
              <MenuLink to="/zonas/mendoza/maipu">Maipú</MenuLink>
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
