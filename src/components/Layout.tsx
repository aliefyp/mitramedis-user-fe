import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { Flowbite } from "flowbite-react";
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
      primary: "bg-sky-700",
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
  table: {
    body: {
      cell: {
        base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-3 py-2",
      },
    },
  },
  dropdown: {
    content: "bg-sky-500",
  },
};

export const MAIN_MENU = {
  title: "MENU",
  items: [
    { text: "Dashboard", icon: TbLayoutDashboard, url: "/" },
    { text: "Pasien", icon: TbUsers, url: "/pasien" },
    { text: "Rekam Medis", icon: TbReportMedical, url: "/rekam-medis" },
    { text: "Stok", icon: TbMedicineSyrup, url: "/stok" },
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
          title={<img src="/img_main_logo.png" alt="mitramedis" width={180} />}
        >
          {[MAIN_MENU, EXTRAS_MENU].map((menu, index) => (
            <Nav key={index} orientation="vertical" className="mb-6 gap-1">
              <Typography
                as="p"
                smaller
                className="mb-2 text-xs font-bold tracking-widest text-gray-500"
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
        <div className="w-full">
          {isMobile && (
            <header className="sticky top-0 flex items-center justify-between border-b bg-slate-100 px-4 pb-2 pt-4 dark:bg-slate-700">
              <div></div>
              <div className="flex items-center space-x-2">
                {/* <DarkThemeToggle /> */}
                <HiMenu
                  size={32}
                  className=" text-slate-800 dark:text-slate-50"
                  onClick={() => setOpen(true)}
                />
              </div>
            </header>
          )}
          <div className="h-screen grow overflow-auto bg-slate-100 px-4 py-6 dark:bg-slate-700 sm:px-6">
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
