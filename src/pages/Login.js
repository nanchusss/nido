import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../services/api';

function Login() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [info, setInfo] = useState(null);

  const from = location.state?.from?.pathname || '/publicar';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setNeedsVerification(false);

    if (!email || !password) {
      setError('Completá email y contraseña');
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      if (err.message === 'Cuenta no verificada') {
        setNeedsVerification(true);
        setError('Tu cuenta todavía no está verificada');
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    }
  };

  const handleResendVerification = async () => {
    setError(null);
    setInfo(null);

    try {
      await apiRequest('/auth/resend-verification', {
        method: 'POST',
        body: { email },
      });

      setInfo('Te enviamos un nuevo correo de verificación');
      setNeedsVerification(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Page>
      <Card>
        <Title>Ingresar</Title>
        <Subtitle>
          Accedé para publicar y gestionar tus propiedades
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PrimaryButton type="submit">
            Entrar
          </PrimaryButton>
        </form>

        {error && <Error>{error}</Error>}
        {info && <Info>{info}</Info>}

        {needsVerification && (
          <ResendButton onClick={handleResendVerification}>
            Reenviar correo de verificación
          </ResendButton>
        )}

        <Divider />

        <RegisterText>
          ¿No tenés cuenta?
          <RegisterLink to="/register">
            Crear cuenta
          </RegisterLink>
        </RegisterText>
      </Card>
    </Page>
  );
}

export default Login;

/* ================= STYLES ================= */

const Page = styled.div`
  min-height: 100vh;
  padding-top: 220px;
  display: flex;
  justify-content: center;
  background: #f6f6f6;
`;

const Card = styled.div`
  background: white;
  padding: 48px;
  width: 50%;
  height: 50%;
  max-width: 420px;
  border-radius: 20px;
  box-shadow: 0 24px 48px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 32px;
  line-height: 1.4;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ResendButton = styled.button`
  width: 100%;
  margin-top: 16px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 32px 0 20px;
`;

const RegisterText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #555;
`;

const RegisterLink = styled(Link)`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled.p`
  color: #d32f2f;
  margin-top: 16px;
  text-align: center;
`;

const Info = styled.p`
  color: #2e7d32;
  margin-top: 16px;
  text-align: center;
`;
