import { TbReportMedical, TbMedicineSyrup, TbUsers, TbLayoutDashboard, TbLogout, TbHeadset, TbSettings } from 'react-icons/tb';

export const MAIN_MENU = {
  title: 'MENU',
  items: [
    { text: 'Dashboard', icon: TbLayoutDashboard, url: '/' },
    { text: 'Pasien', icon: TbUsers, url: '/pasien' },
    { text: 'Rekam Medis', icon: TbReportMedical, url: '/rekam-medis' },
    { text: 'Daftar Obat', icon: TbMedicineSyrup, url: '/daftar-obat' },
  ]
};

export const SETTING_MENU = {
  title: 'EXTRAS',
  items: [
    { text: 'Pengaturan', icon: TbSettings, url: '' },
    { text: 'Hubungi Kami', icon: TbHeadset, url: '' },
    { text: 'Logout', icon: TbLogout, url: '' },
  ]
};

export const PAGE_TITLE = {
  home: 'Home',
}