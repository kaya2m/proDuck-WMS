import { lazy } from 'react';

// Project imports
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded pages for code-splitting
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Customer = Loadable(lazy(() => import('pages/relationmanagement/customer/listcustomer')));
const Supplier = Loadable(lazy(() => import('pages/relationmanagement/supplier')));
const Company = Loadable(lazy(() => import('pages/relationmanagement/company')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute requiredRole="admin">
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'dashboard/default',
      element: (
        <ProtectedRoute requiredRole="admin">
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'customers',
      element: (
        <ProtectedRoute requiredRole="admin">
          <Customer />
        </ProtectedRoute>
      )
    },
    {
      path: 'suppliers',
      element: (
        <ProtectedRoute requiredRole="admin">
          <Supplier />
        </ProtectedRoute>
      )
    },
    {
      path: 'company',
      element: (
        <ProtectedRoute requiredRole="admin">
          <Company />
        </ProtectedRoute>
      )
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
