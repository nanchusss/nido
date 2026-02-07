import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '../src/auth/AuthContext';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';

/* PAGES */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';

import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';

import Buscar from './pages/Buscar';
import Departamento from './pages/Departamento';

import GranMendoza from './components/GranMendoza';
import Capital from './components/Capital';
import Barrio from './components/Barrio';

import ClientDashboard from './pages/ClientDashboard';
import NewProperty from './pages/NewProperty';
import EditProperty from './pages/EditProperty';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* 🌍 LAYOUT GENERAL */}
            <Route element={<Layout />}>

              {/* 🔓 PÚBLICAS */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/verify/:token" element={<Verify />} />

              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />

              {/* 🔎 BUSCAR – FLUJO PRINCIPAL (GUIADO) */}
              <Route path="/buscar" element={<Buscar />} />

              <Route path="/buscar/gran-mendoza" element={<GranMendoza />} />
              <Route
                path="/buscar/gran-mendoza/mendoza-capital"
                element={<Capital />}
              />
              <Route
                path="/buscar/gran-mendoza/mendoza-capital/:barrio"
                element={<Barrio />}
              />
              <Route
                path="/buscar/gran-mendoza/:departamento"
                element={<Departamento />}
              />

              {/* 🔎 BUSCAR – FLUJO GENÉRICO (fallback / futuro) */}
              <Route path="/buscar/:departamento" element={<Departamento />} />
              <Route
                path="/buscar/:departamento/:barrio"
                element={<Barrio />}
              />

              {/* 🔐 PRIVADAS */}
              <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>

                <Route
                  path="/client"
                  element={
                    <RoleRoute allowedRoles={['CLIENT']}>
                      <ClientDashboard />
                    </RoleRoute>
                  }
                />

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

            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;