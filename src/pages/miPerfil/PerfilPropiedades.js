import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PerfilPropiedades = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(data);
  }, []);

  return (
    <Page>
      <Header>
        <h1>Propiedades publicadas</h1>
        <PublishBtn to="/publicar">Publicar nueva</PublishBtn>
      </Header>

      {properties.length === 0 ? (
        <Empty>
          <p>Aún no publicaste ninguna propiedad.</p>
          <PublishBtn to="/publicar">
            Publicar mi primera propiedad
          </PublishBtn>
        </Empty>
      ) : (
        <Grid>
          {properties.map((p) => (
            <Card key={p.id}>
              {p.imagenes?.[0] && (
                <Thumb>
                  <img src={p.imagenes[0]} alt={p.titulo} />
                </Thumb>
              )}

              <Body>
                <h3>{p.titulo}</h3>
                <Price>${p.precio}</Price>
                <Location>
                  {p.ciudad}, {p.provincia}
                </Location>

                <Actions>
                  <Action to={`/properties/${p.id}`}>Ver</Action>
                  <Action to={`/client/properties/${p.id}/edit`}>
                    Editar
                  </Action>
                </Actions>
              </Body>
            </Card>
          ))}
        </Grid>
      )}
    </Page>
  );
};

export default PerfilPropiedades;

/* ===== styles ===== */

const Page = styled.div`
  max-width: 1200px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PublishBtn = styled(Link)`
  background: #ff7a00;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
`;

const Empty = styled.div`
  background: #fafafa;
  padding: 60px;
  border-radius: 16px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eee;
`;

const Thumb = styled.div`
  height: 180px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Body = styled.div`
  padding: 16px;
`;

const Price = styled.div`
  font-weight: 700;
  margin-top: 4px;
`;

const Location = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Action = styled(Link)`
  color: #ff7a00;
  font-weight: 500;
  text-decoration: none;
`;
