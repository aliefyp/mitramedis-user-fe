import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Avatar, Flowbite, DarkThemeToggle } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { TbMenu2 } from "react-icons/tb";
import Sidebar from '../Sidebar';
import { MAIN_MENU, SETTING_MENU } from './constants';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      // primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

const Layout = () => {
  const toggleRef = useRef(null);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="min-h-screen flex bg-slate-100 dark:bg-slate-700">
        <Sidebar menus={[MAIN_MENU, SETTING_MENU]} trigger={toggleRef} />
        <div className='w-full'>
          <header className="py-8 px-6 sm:px-12 pb-0 w-full flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div ref={toggleRef} className="block sm:hidden">
                <TbMenu2 className='cursor-pointer text-4xl text-slate-800 dark:text-slate-50' />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-50">Home</h1>
            </div>
            <div className="flex items-center gap-4">
              <DarkThemeToggle />
              <Avatar
                img="http://placehold.it/40x40"
                rounded
              />
            </div>
          </header>
          <main className='w-full py-8 px-6 sm:px-12'>
            <Outlet />
          </main>
        </div>
      </div>
    </Flowbite>
  );
}

export default Layout;