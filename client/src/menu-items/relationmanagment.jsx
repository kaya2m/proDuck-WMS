// assets
import { TeamOutlined, ShopOutlined, BankOutlined } from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined,
  ShopOutlined,
  BankOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
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
    },
    {
      id: 'companyManagement',
      title: 'Şirket Yönetimi',
      type: 'item',
      url: '/company',
      icon: icons.BankOutlined,
      target: true
    },
  ]
};

export default pages;
