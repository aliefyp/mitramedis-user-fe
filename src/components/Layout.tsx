import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {
  TbReportMedical,
  TbMedicineSyrup,
  TbUsers,
  TbLayoutDashboard,
  TbLogout,
  TbHeadset,
  TbSettings,
} from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import useAppContext from "context/AppContext";
import Nav from "components/Nav";
import NavLink from "components/NavLink";
import Sidebar from "components/Sidebar";
import Typography from "components/Typography";

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
          on: "true",
        },
      },
    },
  },
};

export const MAIN_MENU = {
  title: "MENU",
  items: [
    { text: "Dashboard", icon: TbLayoutDashboard, url: "/" },
    { text: "Pasien", icon: TbUsers, url: "/pasien" },
    { text: "Rekam Medis", icon: TbReportMedical, url: "/rekam-medis" },
    { text: "Daftar Obat", icon: TbMedicineSyrup, url: "/daftar-obat" },
  ],
};

export const EXTRAS_MENU = {
  title: "LAINNYA",
  items: [
    { text: "Pengaturan", icon: TbSettings, url: "/pengaturan" },
    { text: "Hubungi Kami", icon: TbHeadset, url: "/help" },
    { text: "Logout", icon: TbLogout, url: "/logout" },
  ],
};

const Layout = () => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useAppContext();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated()) return <Navigate replace to="/login" />;

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex h-screen w-full">
        <Sidebar
          open={open}
          setOpen={setOpen}
          title={<img src="/logo_mitramedis.png" alt="mitramedis" width={80} />}
        >
          {[MAIN_MENU, EXTRAS_MENU].map((menu, index) => (
            <Nav key={index} orientation="vertical" className="mb-8">
              <Typography
                as="p"
                smaller
                className="mb-4 text-xs font-extrabold text-neutral-400"
              >
                {menu.title}
              </Typography>
              {menu.items.map((menu) => (
                <NavLink
                  key={menu.url}
                  onClick={() => setOpen(false)}
                  to={menu.url}
                >
                  <menu.icon className="mr-4" size={20} />
                  {menu.text}
                </NavLink>
              ))}
            </Nav>
          ))}
        </Sidebar>
        <div className="w-full overflow-y-auto ">
          {isMobile && (
            <header className="sticky top-0 flex items-center justify-between bg-slate-100 px-4 pb-2 pt-4 dark:bg-slate-700">
              <div></div>
              <div className="flex items-center space-x-2">
                <DarkThemeToggle />
                <HiMenu
                  size={32}
                  className=" text-slate-800 dark:text-slate-50"
                  onClick={() => setOpen(true)}
                />
              </div>
            </header>
          )}
          <div className="min-h-screen grow bg-slate-100 px-4 py-6 dark:bg-slate-700 sm:px-6 sm:pt-12">
            <div className="mx-auto max-w-screen-xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Flowbite>
  );
};

export default Layout;
