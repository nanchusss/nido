import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          {/* Protegidas */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Home />} />

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
  );
}

export default App;
