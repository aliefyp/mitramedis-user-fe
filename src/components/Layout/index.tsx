import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { MAIN_MENU, PAGE_TITLE, SETTING_MENU } from './constants';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      // primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

const Layout = () => {
  const [title, setTitle] = useState(PAGE_TITLE['home']);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="min-h-screen max-h-screen flex bg-slate-100 dark:bg-slate-700">
        <Sidebar menus={[MAIN_MENU, SETTING_MENU]} />
        <div className='w-full'>
          <Navbar title={title} />
          <Outlet context={{ setTitle }} />
        </div>
      </div>
    </Flowbite>
  );
}

export default Layout;