import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Avatar, Flowbite, DarkThemeToggle, Sidebar } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { MAIN_MENU, SETTING_MENU } from './constants';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      // primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

const Layout = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24">
                <img src="http://placehold.it/80x80" className="h-8 mr-3" alt="Mitramedis Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Mitramedis</span>
              </a>
            </div>
            <div className="flex items-center">
              <DarkThemeToggle />
              <div className="flex items-center ml-3">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <Avatar rounded size="sm" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user" />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      Neil Sims
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                    </li>
                    <li>
                      <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a href="#earnings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                    </li>
                    <li>
                      <a href="#signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>


      <aside id="logo-sidebar" className="fixed top-0 left-0 w-64 sm:w-80 z-40 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full pr-2 sm:pl-12 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <Sidebar aria-label="Menu">
            <Sidebar.Items>
              {[MAIN_MENU, SETTING_MENU].map((menu) => (
                <Sidebar.ItemGroup className="mt-24 border-none">
                  <p className="mb-4 text-neutral-400 text-xs font-extrabold">
                    {menu.title}
                  </p>
                  {menu.items.map(item => (
                    <Sidebar.Item href="#" icon={item.icon} active={item.text === activeMenu} onClick={() => setActiveMenu(item.text)}>
                      {item.text}
                    </Sidebar.Item>
                  ))}
                </Sidebar.ItemGroup>
              ))}
            </Sidebar.Items>
          </Sidebar>
        </div>
      </aside>

      <div className="sm:ml-80 mt-16 min-h-screen bg-slate-100 dark:bg-slate-700">
        <div className='px-4 py-6 sm:px-12 sm:py-16'>
          {/* <h1 className="mb-4 text-2xl font-extrabold text-slate-800 dark:text-slate-50">Home</h1> */}
          <Outlet />
        </div>
      </div>
    </Flowbite>
  );
}

export default Layout;