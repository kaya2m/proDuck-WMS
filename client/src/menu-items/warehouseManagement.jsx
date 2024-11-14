// assets
import {
  AppstoreAddOutlined,
  BarcodeOutlined,
  BoxPlotOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  ForkOutlined,
  HomeOutlined,
  LoadingOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  StockOutlined,
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';

// icons
const icons = {
  AppstoreAddOutlined,
  BarcodeOutlined,
  BoxPlotOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  ForkOutlined,
  HomeOutlined,
  LoadingOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  StockOutlined,
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - WAREHOUSE MANAGEMENT ||============================== //

const warehousemanagement = {
  id: 'wm',
  title: 'Depo Yönetimi',
  type: 'group',
  children: [
    {
      id: 'stock-management',
      title: 'Stok Yönetimi',
      type: 'item',
      url: '/stock',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'order-management',
      title: 'Sipariş Yönetimi',
      type: 'item',
      url: '/order-management',
      icon: icons.ShoppingCartOutlined
    },
    {
      id: 'location-management',
      title: 'Yerleşim ve Raf Yönetimi',
      type: 'item',
      url: '/location-management',
      icon: icons.ContainerOutlined
    },
    {
      id: 'transfer-management',
      title: 'Transfer Yönetimi',
      type: 'item',
      url: '/transfer-management',
      icon: icons.ForkOutlined
    },
    {
      id: 'inventory-control',
      title: 'Envanter Kontrol ve Sayım',
      type: 'item',
      url: '/inventory-control',
      icon: icons.StockOutlined
    },
    {
      id: 'receiving-management',
      title: 'Alım ve Kabul Yönetimi',
      type: 'item',
      url: '/receiving-management',
      icon: icons.BoxPlotOutlined
    }
  ]
};

export default warehousemanagement;
