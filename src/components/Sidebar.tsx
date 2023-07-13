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
  width = 240,
}: SidebarProps) {
  const { isMobile } = useAppContext();

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
          <div className="absolute inset-0 z-50 overflow-hidden">
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
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 md:shadow-md">
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
                  <div className="flex h-full flex-col overflow-y-scroll  bg-white py-6 shadow-xl dark:bg-slate-800">
                    <div className="mb-8 flex items-center justify-between px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-bold">
                        {title}
                      </Dialog.Title>
                      <IconButton
                        className="-mr-2"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <HiX size={24} aria-hidden="true" />
                      </IconButton>
                    </div>
                    <div className="relative mt-6 flex flex-1 flex-col px-4 sm:px-6">
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
      className="flex min-h-screen flex-shrink-0 flex-col bg-white dark:bg-slate-800"
      style={{ width }}
    >
      {title && (
        <div className="mb-8 px-6 pb-8 pt-12">
          <h2 className="font-bold">{title}</h2>
        </div>
      )}
      <div className="flex flex-1 flex-col px-4">{children}</div>
    </div>
  );
}

export default Sidebar;
