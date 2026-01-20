import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

function Layout() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <Link to="/">NIDO</Link>
          {' | '}
          <Link to="/properties">Propiedades</Link>

          {isAuthenticated && (
            <>
              {' | '}
              <Link to="/">Home</Link>

              {user?.role === 'CLIENT' && (
                <>
                  {' | '}
                  <Link to="/client">Panel Cliente</Link>
                  {' | '}
                  <Link to="/client/properties/new">Nueva Propiedad</Link>
                </>
              )}

              {' | '}
              <LogoutButton />
            </>
          )}
        </nav>
      </header>

      <main>
        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;



