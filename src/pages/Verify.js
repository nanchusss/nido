import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Verify() {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();

  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de verificación inválido');
      return;
    }

    const verifyAccount = async () => {
      try {
        const data = await apiRequest(`/auth/verify?token=${token}`);

        // 🔐 auto-login
        await loginWithToken(data.token);

        setStatus('success');
        setMessage('Cuenta verificada. Redirigiendo…');

        setTimeout(() => {
          window.location.href = '/client';
        }, 1500);

      } catch (error) {
        setStatus('error');
        setMessage(error.message);
      }
    };

    verifyAccount();
  }, [searchParams, loginWithToken]);

  return (
    <Page>
      <Card>
        <Title>
          {status === 'success'
            ? 'Cuenta verificada'
            : status === 'error'
            ? 'Error'
            : 'Verificando'}
        </Title>

        <Message error={status === 'error'}>
          {status === 'loading' ? 'Verificando cuenta…' : message}
        </Message>
      </Card>
    </Page>
  );
}

export default Verify;

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
  height: 50%;
  max-width: 420px;
  border-radius: 20px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: ${({ error }) => (error ? '#d32f2f' : '#444')};
  margin-bottom: 24px;
`;
