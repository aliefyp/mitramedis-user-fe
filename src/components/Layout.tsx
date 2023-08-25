import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { Flowbite, Sidebar } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {
  TbReportMedical,
  TbBox,
  TbUserHeart,
  TbLayoutDashboard,
  TbLogout,
  TbHeadset,
  TbSettings,
} from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import useAppContext from "context/AppContext";
import MainNavigation from "components/MainNavigation";
import Typography from "components/Typography";
import { ErrorBoundary } from "react-error-boundary";
import EmptyData from "./EmptyData";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-sky-700",
    },
  },
  textInput: {
    addon:
      "inline-flex order-2 items-center justify-center rounded-r-md font-bold border border-l-0 border-gray-300 bg-gray-100 min-w-[80px] px-3 text-sm text-gray-600 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    field: {
      input: {
        withAddon: {
          on: "rounded-l-md",
        },
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
    head: {
      cell: {
        base: "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-3 py-3",
      },
    },
  },
  dropdown: {
    content: "bg-sky-500",
  },
  sidebar: {
    root: {
      base: "bg-transparent h-full",
      inner: "h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3",
    },
    collapse: {
      label: {
        base: "ml-3 flex-1 whitespace-nowrap text-left hover:font-bold",
      },
    },
    item: {
      content: {
        base: "px-3 flex-1 whitespace-nowrap hover:font-bold",
      },
      active:
        "bg-mm-navy-1000 text-white dark:bg-mm-navy-700 hover:bg-mm-navy-1000 hover:text-white",
      icon: {
        base: "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        active: "text-white",
      },
    },
  },
};

export const MAIN_MENU = {
  title: "MENU",
  items: [
    { text: "Dashboard", icon: TbLayoutDashboard, url: "/" },
    { text: "Pasien", icon: TbUserHeart, url: "/pasien" },
    { text: "Rekam Medis", icon: TbReportMedical, url: "/rekam-medis" },
    {
      text: "Stok",
      icon: TbBox,
      child: [
        { text: "Manajemen Stok", url: "/stok" },
        { text: "Item Baru", url: "/stok/new" },
        { text: "Pembelian", url: "/stok/in" },
        { text: "Kartu Stok", url: "/stok/card" },
        { text: "Stok Opname", url: "/stok/opname" },
      ],
    },
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
  const { pathname } = useLocation();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated()) return <Navigate replace to="/login" />;

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex h-screen w-full">
        <MainNavigation
          open={open}
          setOpen={setOpen}
          title={<img src="/img_main_logo.png" alt="mitramedis" width={180} />}
        >
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              {[MAIN_MENU, EXTRAS_MENU].map((menu, menuIndex) => (
                <Sidebar.ItemGroup key={`menu-${menuIndex}`}>
                  <Typography
                    as="p"
                    smaller
                    className="mb-2 text-xs font-bold tracking-widest !text-gray-600"
                  >
                    {menu.title}
                  </Typography>
                  {menu.items.map((item, itemIndex) => {
                    const hasChild = item?.child?.length;

                    if (hasChild) {
                      return (
                        <Sidebar.Collapse
                          key={`item-${itemIndex}`}
                          icon={item.icon}
                          label={item.text}
                          open={item.child.map((c) => c.url).includes(pathname)}
                        >
                          {hasChild ? (
                            item.child.map((c, childIndex) => (
                              <Sidebar.Item
                                key={`child-${childIndex}`}
                                href={c.url}
                                icon={c.icon}
                                active={pathname === c.url}
                              >
                                {c.text}
                              </Sidebar.Item>
                            ))
                          ) : (
                            <p>{item.text}</p>
                          )}
                        </Sidebar.Collapse>
                      );
                    } else {
                      return (
                        <Sidebar.Item
                          key={`item-${itemIndex}`}
                          href={item.url}
                          icon={item.icon}
                          active={pathname === item.url}
                        >
                          {item.text}
                        </Sidebar.Item>
                      );
                    }
                  })}
                </Sidebar.ItemGroup>
              ))}
            </Sidebar.Items>
          </Sidebar>
        </MainNavigation>

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
          <div
            id="scrollable-section"
            className="h-screen grow overflow-auto bg-slate-50 px-4 py-6 dark:bg-slate-700 sm:px-6"
          >
            <div className="mx-auto max-w-screen-xl">
              <ErrorBoundary fallback={<EmptyData />}>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </Flowbite>
  );
};

export default Layout;
