import { FaHome, FaNotesMedical, FaUsers, FaSignOutAlt, FaPhoneAlt, FaRegSun, FaChevronLeft } from 'react-icons/fa';
import { useState } from "react";
import { Sidebar } from "flowbite-react";

const MAIN_MENU = [
  { text: 'Dashboard', icon: FaHome, active: true },
  { text: 'Pasien', icon: FaUsers },
  { text: 'Rekam Medis', icon: FaNotesMedical  },
]

const SETTING_MENU = [
  { text: 'Pengaturan', icon: FaRegSun },
  { text: 'Hubungi Kami', icon: FaPhoneAlt },
  { text: 'Logout', icon: FaSignOutAlt },
]
const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div className="py-16 pl-16 pr-2 h-screen bg-white dark:bg-slate-800 shadow-md">
      <Sidebar aria-label="Menu">
        <Sidebar.Logo className="pb-16" href="/" img="http://placehold.it/80x80" imgAlt="Promedik">
          Promedik
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <p className="mb-4 text-neutral-400 text-xs font-extrabold">
              MENU
            </p>
            {MAIN_MENU.map(item => (
              <Sidebar.Item href="#" icon={item.icon} active={item.text === activeMenu} onClick={() => setActiveMenu(item.text)}>
                {item.text}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="mt-24 border-none">
            <p className="mb-4 text-neutral-400 text-xs font-extrabold">
              EXTRAS
            </p>
            {SETTING_MENU.map(item => (
              <Sidebar.Item href="#" icon={item.icon} active={item.text === activeMenu} onClick={() => setActiveMenu(item.text)}>
                {item.text}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SideBar;
