import Menus from "../Menus";
import { FaHome, FaNotesMedical, FaUsers, FaSignOutAlt, FaPhoneAlt, FaRegSun, FaChevronLeft } from 'react-icons/fa';
import { useState } from "react";
import { styOuterContainer } from "./styles";

const MAIN_MENU = [
  { text: 'Dashboard', icon: <FaHome />, active: true },
  { text: 'Pasien', icon: <FaUsers /> },
  { text: 'Rekam Medis', icon: <FaNotesMedical />  },
]

const SETTING_MENU = [
  { text: 'Pengaturan', icon: <FaRegSun /> },
  { text: 'Hubungi Kami', icon: <FaPhoneAlt /> },
]

const LOGOUT_MENU = [
  { text: 'Logout', icon: <FaSignOutAlt /> },
]

const CollapseButton = ({ isCollapse = false, onClick = () => {} }) => (
  <div
    onClick={onClick}
    tabIndex={0}
    className="absolute top-32 right-4 w-8 h-8 rounded-full bg-neutral-100 drop-shadow-lg z-10 flex items-center justify-center cursor-pointer"
    >
    <FaChevronLeft
      className={`
        transition-transform
        duration-500
        ease-in-out
        ${isCollapse && `
          rotate-180
        `}
      `}
    />
  </div>
)

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isCollapse, setCollapse] = useState(false);

  const mainMenuArr = MAIN_MENU.map(item => ({ ...item, active: activeMenu === item.text, onClick: () => setActiveMenu(item.text) }));
  const settingMenuArr = SETTING_MENU.map(item => ({ ...item, active: activeMenu === item.text, onClick: () => setActiveMenu(item.text) }));
  const logoutMenuArr = LOGOUT_MENU.map(item => ({ ...item, active: activeMenu === item.text, onClick: () => setActiveMenu(item.text) }));

  const outerClass = 'h-screen pr-8 relative inline-block transition-all';
  const innerClass = 'flex flex-col justify-between bg-white py-12 h-full overflow-y-auto overflow-x-hidden relative'
  const innerCollapseClass = isCollapse ? 'pl-4 pr-4' : 'pl-16 pr-6';

  return (
    <div className={styOuterContainer}>
      <CollapseButton isCollapse={isCollapse} onClick={() => setCollapse(!isCollapse)} />
      <div className={`transition-all duration-500 ${innerClass} ${innerCollapseClass}`}>
        <div>
          <img className={`mb-32 transition-transform duration-500 ease-in-out origin-top-left ${isCollapse ? 'scale-50' : 'scale-100'}`} src="http://placehold.it/80x80" alt="Promedik" width={80} />
          <div className={`mb-32 flex flex-col ${isCollapse && 'items-center'}`}>
            <p className="text-neutral-400 text-xs font-extrabold mb-4">
              MENU
            </p>
            <Menus items={mainMenuArr} mini={isCollapse} />
          </div>
          <div className={`mb-32 flex flex-col ${isCollapse && 'items-center'}`}>
            <p className="text-neutral-400 text-xs font-extrabold mb-4">
              EXTRAS
            </p>
            <Menus items={settingMenuArr} mini={isCollapse} />
          </div>
        </div>
        <Menus items={logoutMenuArr} mini={isCollapse} />
      </div>
    </div>
  )
}

export default Sidebar;
