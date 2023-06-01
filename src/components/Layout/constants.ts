import { TbReportMedical, TbMedicineSyrup, TbUsers, TbLayoutDashboard, TbLogout, TbHeadset, TbSettings } from 'react-icons/tb';

export const MAIN_MENU = {
  title: 'MENU',
  items: [
    { text: 'Home', icon: TbLayoutDashboard, active: true },
    { text: 'Pasien', icon: TbUsers },
    { text: 'Rekam Medis', icon: TbReportMedical },
    { text: 'Daftar Obat', icon: TbMedicineSyrup },
  ]
};

export const SETTING_MENU = {
  title: 'EXTRAS',
  items: [
    { text: 'Pengaturan', icon: TbSettings },
    { text: 'Hubungi Kami', icon: TbHeadset },
    { text: 'Logout', icon: TbLogout },
  ]
};

export const PAGE_TITLE = {
  home: 'Home',
}