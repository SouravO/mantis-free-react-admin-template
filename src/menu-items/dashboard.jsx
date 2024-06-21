// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'menu',
      title: 'Menu',
      type: 'item',
      url: '/menu',
      // icon: icons.,
      breadcrumbs: false
    
    },
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: '/categories',
      // icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
   
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      // icon: icons.,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
