import { ReactNode, useState } from "react";
import { Sidebar } from "flowbite-react";
import Drawer from 'components/Drawer';
import useAppContext from 'context/AppContext';
import { SidebarProps } from "./interface";

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="py-12 pl-12 pr-2 h-screen bg-white dark:bg-slate-800 shadow-md z-20">
      {children}
    </nav>
  )
}

const SideBar = ({ menus, trigger }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const { isMobile } = useAppContext();

  const Container = isMobile ? Drawer : Panel;

  return (
    <>
      {/* hamburger menu */}
      {/* <div className='fixed top-12 left-8' ref={triggerRef}>
        <TbMenu2 className='cursor-pointer text-4xl text-slate-800 dark:text-slate-50' />
      </div> */}

      {/* main panel */}
      <Container name="sidebar" trigger={trigger}>
        <Sidebar aria-label="Menu">
          <Sidebar.Logo className="pb-8 sm:pb-16" href="/" img="http://placehold.it/80x80" imgAlt="Promedik">
            Mitramedis
          </Sidebar.Logo>
          <Sidebar.Items>
            {menus.map((menu) => (
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
      </Container>
    </>
  )
}

export default SideBar;
