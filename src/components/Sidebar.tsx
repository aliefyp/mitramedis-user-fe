import { Dialog, Transition } from "@headlessui/react";
import IconButton from "components/IconButton";
import useAppContext from "context/AppContext";
import React, { Fragment } from "react";
import { HiX } from "react-icons/hi";

interface SidebarProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  title?: React.ReactNode;
  width?: number;
}

function Sidebar({
  children,
  open,
  setOpen,
  title,
  width = 280
}: SidebarProps) {
  const { isMobile } = useAppContext()

  if (setOpen && isMobile) {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={open}
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-screen" style={{ width }}>
                  <div className="h-full flex flex-col py-6 shadow-xl overflow-y-scroll bg-white dark:bg-slate-800">
                    <div className="flex justify-between items-center mb-8 px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-bold">
                        {title}
                      </Dialog.Title>
                      <IconButton className="-mr-2" onClick={() => setOpen(false)}>
                        <span className="sr-only">Close panel</span>
                        <HiX size={24} aria-hidden="true" />
                      </IconButton>
                    </div>
                    <div className="relative flex flex-col flex-1 mt-6 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
  return (
    <div
      className="flex flex-col flex-shrink-0 min-h-screen bg-white dark:bg-slate-800"
      style={{ width }}
    >
      {title && (
        <div className="px-6 py-8 mb-8">
          <h2 className="font-bold">{title}</h2>
        </div>
      )}
      <div className="flex flex-col flex-1 px-6">{children}</div>
    </div>
  );
}

export default Sidebar;