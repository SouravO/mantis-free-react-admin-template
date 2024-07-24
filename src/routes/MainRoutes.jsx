import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Menu = Loadable(lazy(() => import('pages/component-overview/menu')));
const Category = Loadable(lazy(() => import('pages/component-overview/category')));
const Settings = Loadable(lazy(() => import('pages/component-overview/settings')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/menu',
      element: <Menu />
    },
    {
      path: '/settings',
      element: <Settings />
    },
    {
      path: '/categories',  
      element: <Category />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    }
  ]
};

export default MainRoutes;
