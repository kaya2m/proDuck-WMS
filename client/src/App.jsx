import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from './utils/AuthUtils/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <AuthProvider>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
          <ToastContainer />
        </ScrollTop>
      </ThemeCustomization>
    </AuthProvider>
  );
}
