import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { login } = useAuth(); // reutilizamos login como mock
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password || !form.confirmPassword) {
      setError('Completá todos los campos');
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // 🔹 REGISTRO MOCK (frontend)
    await login({
      email: form.email,
      password: form.password,
      role: 'CLIENT'
    });

    navigate('/publicar');
  };

  return (
    <Page>
      <Card>
        <Title>Crear cuenta</Title>
        <Subtitle>
          Registrate para publicar y administrar tus propiedades
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Repetir contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <PrimaryButton type="submit">
            Crear cuenta
          </PrimaryButton>
        </form>

        {error && <Error>{error}</Error>}

        <Divider />

        <LoginText>
          ¿Ya tenés cuenta?
          <LoginLink to="/login">Ingresar</LoginLink>
        </LoginText>
      </Card>
    </Page>
  );
}

export default Register;

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
  width: 100%;
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

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 32px 0 20px;
`;

const LoginText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #555;
`;

const LoginLink = styled(Link)`
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
