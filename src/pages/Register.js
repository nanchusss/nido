import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { apiRequest } from '../services/api'

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    consent: false
  })

  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.email || !form.password || !form.confirmPassword) {
      setError('Completá todos los campos')
      return
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!form.consent) {
      setError('Debés aceptar el uso de datos para continuar')
      return
    }

    try {
      console.log('Enviando registro para:', form.email)
      console.log('si se registra:', form.consent)
      await apiRequest('/api/auth/register', {
        method: 'POST',
        body: {
          email: form.email,
          password: form.password,
          consentAccepted: form.consent,
          name: ''
        }
      })

      setSubmitted(true)
    } catch (err) {
      console.error('Registro error:', err)
      setError(err.message || 'No se pudo conectar con el servidor')
    }
  }

  if (submitted) {
    return (
      <Page>
        <Card>
          <Title>Confirmá tu correo</Title>

          <Subtitle>
            Te enviamos un email a <strong>{form.email}</strong>
            <br />
            para confirmar tu cuenta.
          </Subtitle>

          <Info>
            Revisá tu bandeja de entrada o spam.
            <br />
            Una vez confirmado, vas a poder publicar propiedades.
          </Info>

          <BackLink to="/login">Volver al login</BackLink>
        </Card>
      </Page>
    )
  }

  return (
    <Page>
      <Card>
        <Title>Crear cuenta</Title>

        <Subtitle>
          Registrate para publicar y gestionar tus propiedades
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

          <Consent>
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
            />
            <label>
              Acepto el{' '}
              <Link to="/terminos">uso de mis datos</Link>{' '}
              según la política de privacidad
            </label>
          </Consent>

          <PrimaryButton type="submit" disabled={!form.consent}>
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
  )
}

export default Register


/* ================= STYLES ================= */

const Page = styled.div`
  min-height: 100vh;
  padding-top: 220px;
  display: flex;
  justify-content: center;
`;


const Card = styled.div`
  background: white;
  padding: 40px;
  width: 100%;
  max-width: 420px;

  /* 🔑 esto reemplaza height */
  min-height: 360px;
  max-height: 520px;

  border-radius: 20px;
  box-shadow: 0 24px 48px rgba(0,0,0,0.08);

  display: flex;
  flex-direction: column;
  justify-content: center;
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

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Consent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #555;
  margin: 16px 0 24px;

  input {
    margin-top: 3px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
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
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
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
`;

const Error = styled.p`
  color: #d32f2f;
  margin-top: 16px;
  text-align: center;
`;

const Info = styled.p`
  color: #555;
  line-height: 1.5;
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;
