import { MutableRefObject, ReactNode, useEffect } from "react";

interface DrawerProps {
  name: string;
  children: ReactNode;
  trigger: MutableRefObject<HTMLButtonElement | null>;
}

const Drawer = ({ name, children, trigger }: DrawerProps) => {
  useEffect(() => {
    trigger.current?.setAttribute('data-drawer-target', name);
    trigger.current?.setAttribute('data-drawer-show', name);
    trigger.current?.setAttribute('data-drawer-backdrop', 'true');
    trigger.current?.setAttribute('aria-controls', name);
  }, [name, trigger])

  return (
    <>
      <div id={name} className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-label">
        <button type="button" data-drawer-hide={name} aria-controls={name} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span className="sr-only">Close menu</span>
        </button>
        {children}
      </div>
    </>
  )
}

export default Drawer;