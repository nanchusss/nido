import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/AuthContext';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

import Login from './pages/Login';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import ClientDashboard from './pages/ClientDashboard';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';

import Buscar from './pages/Buscar';
import Departamento from './pages/Departamento';
import Barrio from './pages/Barrio';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* 🌍 RUTAS PÚBLICAS */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />

              {/* 🔍 BUSCADOR */}
              <Route path="/buscar" element={<Buscar />} />
              <Route path="/buscar/:departamento" element={<Departamento />} />
              <Route path="/buscar/:departamento/:barrio" element={<Barrio />} />
            </Route>

            {/* 🔒 RUTAS PRIVADAS */}
            <Route
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route
                path="/client"
                element={
                  <RoleRoute allowedRoles={['CLIENT']}>
                    <ClientDashboard />
                  </RoleRoute>
                }
              />

              <Route
                path="/client/properties/new"
                element={
                  <RoleRoute allowedRoles={['CLIENT']}>
                    <NewProperty />
                  </RoleRoute>
                }
              />

              <Route
                path="/client/properties/:id/edit"
                element={
                  <RoleRoute allowedRoles={['CLIENT']}>
                    <EditProperty />
                  </RoleRoute>
                }
              />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;
