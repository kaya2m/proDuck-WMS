import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Customer = Loadable(lazy(() => import('pages/relationmanagement/customer/listcustomer')));
const Supplier = Loadable(lazy(() => import('pages/relationmanagement/supplier')));
const Company = Loadable(lazy(() => import('pages/relationmanagement/company')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute requiredRole="admin">
      <Dashboard />
    </ProtectedRoute>
  ),
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
    }
  ]
};

export default MainRoutes;
