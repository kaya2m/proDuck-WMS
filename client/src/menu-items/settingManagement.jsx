// assets
import { UserOutlined, FileSearchOutlined, SettingOutlined } from '@ant-design/icons';

// icons
const icons = { UserOutlined, FileSearchOutlined, SettingOutlined };

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
      id: 'reporting-analytics',
      title: 'Raporlama ve Analitik',
      type: 'item',
      url: '/reporting-analytics',
      icon: icons.FileSearchOutlined
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
