import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const MiPerfilLayout = () => {
  return (
    <Page>
      <Sidebar>
        <Title>Mi perfil</Title>

        <Menu>
          <Item to="/mi-perfil" end>
            Perfil
          </Item>
          <Item to="/mi-perfil/propiedades">
            Propiedades
          </Item>
          <Item to="/mi-perfil/opiniones">
            Opiniones
          </Item>
          <Item to="/mi-perfil/ajustes">
            Ajustes
          </Item>
        </Menu>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Page>
  );
};

export default MiPerfilLayout;

/* ===== styles ===== */

const Page = styled.div`
  display: flex;
  min-height: calc(100vh - 120px);
`;

const Sidebar = styled.aside`
  width: 260px;
  background: #fafafa;
  border-right: 1px solid #eee;
  padding: 32px 20px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 20px;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled(NavLink)`
  padding: 12px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: #1e1e1e;
  font-weight: 500;

  &.active {
    background: #ff7a00;
    color: white;
  }

  &:hover {
    background: #ffe8d8;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 40px;
`;
