import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '@/App';
import { FLAGS } from '@/config/flags';
import Dashboard from '@/components/Dashboard/Dashboard';
import WaterQuality from '@/features/water/components/WaterQuality';
import Visualization3D from '@/features/viewer3d/components/Visualization3D';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import LoginPage from '@/components/Auth/LoginPage';
import LandingPage from '@/components/Landing/LandingPage';

// Lazy load components for code-splitting
const LocalViewer = React.lazy(() => import('@/features/viewer3d/pages/LocalViewer'));
const ImportarPage = React.lazy(() => import('@/features/import/ImportarPage'));
const CageManagement = React.lazy(() => import('@/features/cages/components/CageManagement'));
const Maintenance = React.lazy(() => import('@/features/maintenance/components/Maintenance'));
const ReportsModule = React.lazy(() => import('@/features/reports/ReportsModule'));

const appRoutes: RouteObject[] = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'analysis/water-quality', element: <WaterQuality /> },
  {
    path: 'analysis/reports',
    element: (
      <Suspense fallback={<div>Cargando reportes…</div>}>
        <ReportsModule />
      </Suspense>
    ),
  },
  {
    path: 'management/cages',
    element: (
      <Suspense fallback={<div>Cargando infraestructura...</div>}>
        <CageManagement />
      </Suspense>
    ),
  },
  {
    path: 'management/maintenance',
    element: (
      <Suspense fallback={<div>Cargando mantenimiento...</div>}>
        <Maintenance />
      </Suspense>
    ),
  },
  { path: 'viewer/3d', element: <Visualization3D /> },
  {
    path: 'viewer/local',
    element: (
      <Suspense fallback={<div>Cargando visor…</div>}>
        <LocalViewer />
      </Suspense>
    ),
  },
];

if (FLAGS.IMPORTAR_ENABLED) {
  appRoutes.push({
    path: 'admin/import',
    element: (
      <ProtectedRoute roles={['admin', 'supervisor']}>
        <Suspense fallback={<div>Cargando página de importación...</div>}>
          <ImportarPage />
        </Suspense>
      </ProtectedRoute>
    ),
  });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: appRoutes,
  },
]);

export { router };
