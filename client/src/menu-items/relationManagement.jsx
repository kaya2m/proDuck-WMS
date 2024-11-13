// assets
import { TeamOutlined, ShopOutlined, BankOutlined } from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,
  ShopOutlined,
  BankOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const relationmanagment = {
  id: 'relationmanagment',
  title: 'Business Relations',
  type: 'group',
  children: [
    {
      id: 'customerManagement',
      title: 'Müşteri Yönetimi',
      type: 'item',
      url: '/customers',
      icon: icons.TeamOutlined,
      target: true
    },
    {
      id: 'supplierManagement',
      title: 'Tedarikçi Yönetimi',
      type: 'item',
      url: '/suppliers',
      icon: icons.ShopOutlined,
      target: true
    }
  ]
};

export default relationmanagment;
