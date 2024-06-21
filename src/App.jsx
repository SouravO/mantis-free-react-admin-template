import { RouterProvider } from 'react-router-dom';
import { CategoriesProvider } from './CategoriesContext';  // Adjust the path accordingly

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <CategoriesProvider>
          <RouterProvider router={router} />
        </CategoriesProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
