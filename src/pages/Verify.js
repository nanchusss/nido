import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiRequest } from '../services/api';
import { useAuth } from '../auth/AuthContext';

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

        await loginWithToken(data.token);

        setStatus('success');
        setMessage('Cuenta verificada. Redirigiendo…');

        setTimeout(() => {
          window.location.href = '/client';
        }, 1500);

      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Error al verificar cuenta');
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

        <Message $error={status === 'error'}>
          {status === 'loading' ? 'Verificando cuenta…' : message}
        </Message>
      </Card>
    </Page>
  );
}

export default Verify;

/* ===== styled ===== */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Message = styled.p`
  color: ${({ $error }) => ($error ? '#d32f2f' : '#555')};
`;
