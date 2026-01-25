import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/AuthContext';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';

/* PAGES */
import Home from './pages/Home';
import Login from './pages/Login';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import ClientDashboard from './pages/ClientDashboard';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';
import Buscar from './pages/Buscar';
import Departamento from './pages/Departamento';

import Register from './pages/Register';




/* COMPONENTS */
import Barrio from './components/Barrio';

/* MAP FLOW */
import GranMendoza from './components/GranMendoza';
import Capital from './components/Capital';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* ================= PÚBLICAS ================= */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />

              {/* BUSCADOR */}
              <Route path="/buscar" element={<Buscar />} />

              {/* GRAN MENDOZA */}
              <Route path="/buscar/gran-mendoza" element={<GranMendoza />} />
              <Route path="/buscar/gran-mendoza/mendoza-capital" element={<Capital />} />
              <Route
                path="/buscar/gran-mendoza/mendoza-capital/:barrio"
                element={<Barrio />}
              />
              <Route
                path="/buscar/gran-mendoza/:departamento"
                element={<Departamento />}
              />

              {/* RESTO */}
              <Route path="/buscar/mendoza" element={<Buscar />} />
              <Route path="/buscar/:departamento" element={<Departamento />} />
              <Route path="/buscar/:departamento/:barrio" element={<Barrio />} />
            </Route>
            <Route path="/register" element={<Register />} />

            {/* ================= PRIVADAS ================= */}
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

              {/* PUBLICAR PROPIEDAD (NUEVO FLUJO FINAL) */}
              <Route
                path="/publicar"
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
