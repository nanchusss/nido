import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("profile"));
    if (stored) {
      setProfile(stored);
    } else {
      // perfil mock inicial
      const initial = {
        nombre: "Inmobiliaria Nido",
        email: "contacto@nido.com",
        telefono: "",
        direccion: "Mendoza, Argentina",
        descripcion: "Inmobiliaria especializada en propiedades en Mendoza.",
        logo: null,
      };
      localStorage.setItem("profile", JSON.stringify(initial));
      setProfile(initial);
    }
  }, []);

  if (!profile) return null;

  return (
    <Page>
      <Card>
        <Header>
          <Logo>
            {profile.logo ? (
              <img src={profile.logo} alt="Logo" />
            ) : (
              <Placeholder>Logo</Placeholder>
            )}
          </Logo>

          <Info>
            <h1>{profile.nombre}</h1>
            <p>{profile.descripcion}</p>
          </Info>

          <EditBtn to="/perfil/editar">Editar perfil</EditBtn>
        </Header>

        <Section>
          <h3>Datos de contacto</h3>
          <ul>
            <li><strong>Email:</strong> {profile.email}</li>
            <li><strong>Teléfono:</strong> {profile.telefono || "—"}</li>
            <li><strong>Dirección:</strong> {profile.direccion}</li>
          </ul>
        </Section>

        <Section muted>
          <h3>Opiniones</h3>
          <p>(Próximamente)</p>
        </Section>
      </Card>
    </Page>
  );
};

export default Profile;

/* ===== STYLES ===== */

const Page = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const Placeholder = styled.div`
  color: #999;
  font-size: 14px;
`;

const Info = styled.div`
  flex: 1;

  h1 {
    margin-bottom: 8px;
  }

  p {
    color: #6b7280;
  }
`;

const EditBtn = styled(Link)`
  background: #ff7a00;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
`;

const Section = styled.section`
  margin-top: 32px;

  h3 {
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 6px;
    }
  }

  ${({ muted }) =>
    muted &&
    `
    color: #9ca3af;
  `}
`;
