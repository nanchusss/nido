import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function RoleRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <p>No tenés permisos para acceder a esta sección</p>;
  }

  return children;
}

export default RoleRoute;
