import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Customer = Loadable(lazy(() => import('pages/relationmanagement/customer/listCustomer')));
const Supplier = Loadable(lazy(() => import('pages/relationmanagement/supplier/listSupplier')));
const Stock = Loadable(lazy(() => import('pages/warehousemanagement/stock/listStock')));
const WarehouseList = Loadable(lazy(() => import('pages/appSettings/warehouse/warehouseList')));
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
      path: '/dashboard',
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
      path: 'stock',
      element: (
        <ProtectedRoute requiredRole="admin">
          <Stock />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouse-setting',
      element: (
        <ProtectedRoute requiredRole="admin">
          <WarehouseList />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
