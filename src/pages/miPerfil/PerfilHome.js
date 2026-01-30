import { useEffect, useState } from "react";
import styled from "styled-components";

const PerfilHome = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("profile"));

    if (stored) {
      setProfile(stored);
    } else {
      const initialProfile = {
        nombre: "Inmobiliaria Nido",
        descripcion:
          "Inmobiliaria especializada en propiedades residenciales y comerciales en Mendoza.",
        email: "contacto@nido.com",
        telefono: "",
        web: "",
        direccion: "Mendoza, Argentina",
        logo: null,
      };

      localStorage.setItem("profile", JSON.stringify(initialProfile));
      setProfile(initialProfile);
    }
  }, []);

  if (!profile) return null;

  return (
    <Page>
      <Header>
        <LogoBox>
          {profile.logo ? (
            <img src={profile.logo} alt="Logo" />
          ) : (
            <LogoPlaceholder>Logo</LogoPlaceholder>
          )}
        </LogoBox>

        <MainInfo>
          <h1>{profile.nombre}</h1>
          <p>{profile.descripcion}</p>
        </MainInfo>
      </Header>

      <Section>
        <SectionTitle>Información de contacto</SectionTitle>
        <Grid>
          <Item>
            <strong>Email</strong>
            <span>{profile.email}</span>
          </Item>

          <Item>
            <strong>Teléfono</strong>
            <span>{profile.telefono || "—"}</span>
          </Item>

          <Item>
            <strong>Dirección</strong>
            <span>{profile.direccion}</span>
          </Item>

          <Item>
            <strong>Sitio web</strong>
            <span>{profile.web || "—"}</span>
          </Item>
        </Grid>
      </Section>

      <MutedSection>
        <h3>Opiniones</h3>
        <p>Las opiniones de los usuarios aparecerán aquí próximamente.</p>
      </MutedSection>
    </Page>
  );
};

export default PerfilHome;

/* ===== styles ===== */

const Page = styled.div`
  max-width: 1000px;
`;

const Header = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoBox = styled.div`
  width: 140px;
  height: 140px;
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

const LogoPlaceholder = styled.div`
  color: #9ca3af;
  font-size: 14px;
`;

const MainInfo = styled.div`
  flex: 1;

  h1 {
    margin-bottom: 8px;
  }

  p {
    color: #6b7280;
    max-width: 600px;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const Item = styled.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 12px;

  strong {
    display: block;
    margin-bottom: 4px;
  }

  span {
    color: #4b5563;
  }
`;

const MutedSection = styled.section`
  padding: 32px;
  border-radius: 16px;
  background: #f9fafb;
  color: #6b7280;
`;
