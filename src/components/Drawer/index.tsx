import { MutableRefObject, ReactNode, useEffect, useState } from "react";
import { Drawer } from 'flowbite';
import { FaTimes } from 'react-icons/fa';
import type { DrawerOptions } from "flowbite";

interface DrawerProps {
  name: string;
  children: ReactNode;
  trigger: MutableRefObject<HTMLButtonElement | null>;
}

const CustomDrawer = ({ name, children, trigger }: DrawerProps) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    // set attribute to trigger button element
    trigger.current?.setAttribute('data-drawer-target', name);
    trigger.current?.setAttribute('data-drawer-toggle', name);
    // trigger.current?.setAttribute('data-drawer-backdrop', 'false');
    trigger.current?.setAttribute('aria-controls', name);
  }, [name, trigger])

  useEffect(() => {
    if (name && document.getElementById(name) && !isMounted) {
      // set the drawer menu element
      const targetEl: HTMLElement = document.getElementById(name) as HTMLElement;

      // options with default values
      const options: DrawerOptions = {
        placement: 'left',
        backdrop: true,
        bodyScrolling: false,
        edge: false,
        edgeOffset: '',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
        onHide: () => { },
        onShow: () => { },
        onToggle: () => { }
      };

      new Drawer(targetEl, options);
      setMounted(true);
    }
  }, [isMounted, name])


  return (
    <>
      <div id={name} className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-label">
        <button type="button" data-drawer-hide={name} aria-controls={name} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <FaTimes size={24} className="text-slate-400 dark:text-slate-50" />
          <span className="sr-only">Close menu</span>
        </button>
        {children}
      </div>
    </>
  )
}

export default CustomDrawer;