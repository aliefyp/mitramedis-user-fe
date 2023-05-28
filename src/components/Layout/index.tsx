import { Flowbite } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      // primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

const Layout = () => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="min-h-screen max-h-screen flex bg-slate-100 dark:bg-slate-700">
        <Sidebar />
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </Flowbite>
  );
}

export default Layout;