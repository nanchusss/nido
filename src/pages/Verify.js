import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { apiRequest } from '../services/api'
import { useAuth } from '../auth/AuthContext'

function Verify() {
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()

  const [email, setEmail] = useState(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // 🔥 cargar email desde localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('verifyEmail')
    if (!storedEmail) {
      navigate('/register')
      return
    }
    setEmail(storedEmail)
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!code || code.length !== 5) {
      setError('El código debe tener 5 cifras')
      return
    }

    try {
      setLoading(true)

      const res = await apiRequest('/api/auth/verify', {
        method: 'POST',
        body: {
          email,
          code,
        },
      })

      // limpiar storage
      localStorage.removeItem('verifyEmail')

      await loginWithToken(res.token)
      navigate('/client')
    } catch (err) {
      setError(err.message || 'Código inválido o expirado')
    } finally {
      setLoading(false)
    }
  }

  if (!email) return null

  return (
    <Page>
      <Card>
        <Title>Confirmá tu cuenta</Title>

        <Message>
          Ingresá el código enviado a<br />
          <strong>{email}</strong>
        </Message>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={5}
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Verificar'}
          </PrimaryButton>
        </form>

        {error && <Message error>{error}</Message>}
      </Card>
    </Page>
  )
}

export default Verify

// =====================
// STYLES
// =====================





/* ===== styles ===== */

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`

const Title = styled.h2`
  margin-bottom: 16px;
`

const Message = styled.p`
  color: ${({ error }) => (error ? '#d32f2f' : '#555')};
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 16px 0;
`

const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px;
`