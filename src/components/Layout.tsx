import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { TbReportMedical, TbMedicineSyrup, TbUsers, TbLayoutDashboard, TbLogout, TbHeadset, TbSettings } from 'react-icons/tb';
import { HiMenu } from 'react-icons/hi';
import useAppContext from 'context/AppContext';
import Nav from 'components/Nav';
import NavLink from 'components/NavLink';
import Sidebar from './Sidebar';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      // primary: 'bg-red-500 hover:bg-red-600',
    },
  },
  textInput: {
    field: {
      input: {
        withShadow: {
          on: 'true'
        }
      }
    }
  }
};

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
    { text: 'Pengaturan', icon: TbSettings, url: '/pengaturan' },
    { text: 'Hubungi Kami', icon: TbHeadset, url: '/help' },
    { text: 'Logout', icon: TbLogout, url: '/logout' },
  ]
};


const Layout = () => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useAppContext();

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className='flex w-full'>
        <Sidebar
          open={open}
          setOpen={setOpen}
          title={
            <img src="/logo_mitramedis.png" alt="mitramedis" width={80} />
          }
        >
          {[MAIN_MENU, SETTING_MENU].map(menu => (
            <Nav orientation="vertical" className='mb-8'>
              <p className="mb-4 text-neutral-400 text-xs font-extrabold">
                {menu.title}
              </p>
              {menu.items.map((menu) => (
                <NavLink key={menu.url} onClick={() => setOpen(false)} to={menu.url}>
                  <menu.icon className="mr-4" size={20} />
                  {menu.text}
                </NavLink>
              ))}
            </Nav>
          ))}
        </Sidebar>
        <div className='w-full'>
          {isMobile && (
            <header className="flex items-center justify-between bg-slate-100 dark:bg-slate-700 px-4 pt-4 pb-2 sticky top-0">
              <div></div>
              <div className='flex items-center space-x-2'>
                <DarkThemeToggle />
                <HiMenu size={32} className=" text-slate-800 dark:text-slate-50" onClick={() => setOpen(true)} />
              </div>
            </header>
          )}
          <div className='grow min-h-screen bg-slate-100 dark:bg-slate-700 px-4 py-6 sm:px-6 sm:py-8'>
            <div className='max-w-screen-xl mx-auto'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Flowbite>
  );
}

export default Layout;