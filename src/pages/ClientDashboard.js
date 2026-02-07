import styled from "styled-components";
import { Link } from "react-router-dom";

function ClientDashboard() {
  // MOCK – después lo conectás al AuthContext
  const profileCompleted = false;
  const role = "inmobiliaria"; // "user" | "inmobiliaria" | "gestor"

  return (
    <Container>
      <Header>
        <Title>Panel del cliente</Title>
        <Subtitle>Gestioná tu cuenta en NIDO</Subtitle>

        {!profileCompleted && (
          <Alert>
            Antes de publicar, necesitás completar tu perfil.
          </Alert>
        )}
      </Header>

      <Card>
        <CardTitle>Tu perfil</CardTitle>
        <Text>
          Completá tus datos personales para poder publicar propiedades.
        </Text>
        <PrimaryLink to="/perfil">
          Completar perfil
        </PrimaryLink>
      </Card>

      <Grid>
        <Card disabled={!profileCompleted}>
          <CardTitle>Publicar propiedad</CardTitle>
          <Text>
            Creá un nuevo aviso con fotos, precio y descripción.
          </Text>

          {profileCompleted ? (
            <PrimaryLink to="/publicar">
              Publicar
            </PrimaryLink>
          ) : (
            <Disabled>
              Perfil incompleto
            </Disabled>
          )}
        </Card>

        <Card>
          <CardTitle>Mis publicaciones</CardTitle>
          <Text>
            Administrá tus avisos activos.
          </Text>
          <SecondaryLink to="/mis-publicaciones">
            Ver publicaciones
          </SecondaryLink>
        </Card>

        <Card>
          <CardTitle>Mensajes</CardTitle>
          <Text>
            Respondé consultas de personas interesadas.
          </Text>
          <SecondaryLink to="/mensajes">
            Ver mensajes
          </SecondaryLink>
        </Card>
      </Grid>

      {role !== "user" && (
        <ProfessionalCard>
          <Avatar />
          <div>
            <CardTitle>Nombre de la empresa</CardTitle>
            <Text>
              Descripción breve de la inmobiliaria o del profesional.
            </Text>
            <SmallText>
              Zona de trabajo: Capital Federal
            </SmallText>
          </div>
        </ProfessionalCard>
      )}
    </Container>
  );
}

export default ClientDashboard;

/* ================= STYLES ================= */

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  color: #666;
`;

const Alert = styled.div`
  margin-top: 14px;
  background: #fff4e5;
  color: #8a5a00;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 32px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const CardTitle = styled.h4`
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #555;
`;

const PrimaryLink = styled(Link)`
  display: inline-block;
  margin-top: 14px;
  background: #f47c3c;
  color: white;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  text-decoration: none;
`;

const SecondaryLink = styled(Link)`
  display: inline-block;
  margin-top: 14px;
  color: #f47c3c;
  font-size: 14px;
  text-decoration: none;
`;

const Disabled = styled.div`
  margin-top: 14px;
  background: #ddd;
  color: #777;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  text-align: center;
`;

const ProfessionalCard = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #eee;
`;

const SmallText = styled.p`
  font-size: 13px;
  color: #777;
  margin-top: 6px;
`;