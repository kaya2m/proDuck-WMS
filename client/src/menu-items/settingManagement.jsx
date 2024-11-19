// assets
import { UserOutlined, FileSearchOutlined, SettingOutlined, ControlOutlined, GroupOutlined } from '@ant-design/icons';

// icons
const icons = { UserOutlined, FileSearchOutlined, SettingOutlined, ControlOutlined, GroupOutlined };

const settings = {
  id: 'setting',
  title: 'Uygulama Ayarları',
  type: 'group',
  children: [
    {
      id: 'user-management',
      title: 'Kullanıcı Yetkilendirme',
      type: 'item',
      url: '/user-management',
      icon: icons.UserOutlined
    },
    {
      id: 'warehouse-setting',
      title: ' Depo Ayarları',
      type: 'item',
      url: '/warehouse-setting',
      icon: icons.GroupOutlined
    },
    {
      id: 'reporting-analytics',
      title: 'Raporlama ve Analitik',
      type: 'item',
      url: '/reporting-analytics',
      icon: icons.FileSearchOutlined
    },
    {
      id: 'app-constants',
      title: 'Uygulama Sabitleri',
      type: 'item',
      url: '/app-constants',
      icon: icons.ControlOutlined
    },
    {
      id: 'settings',
      title: 'Ayarlar',
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined
    }
  ]
};

export default settings;
