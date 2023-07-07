import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";
import Typography from "./Typography";

type BottomsheetProps = {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title?: string;
};

export default function Bottomsheet({
  children,
  onClose,
  open,
  title,
}: BottomsheetProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-800 opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the Bottomsheet contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="fixed bottom-0 left-0 right-0 w-full transform overflow-auto rounded-t-xl bg-white text-left shadow-xl transition-all">
              <div className="relative p-4 pt-6">
                <div className="mb-8 flex items-center justify-between">
                  <Typography as="h3" className="text-xl font-bold">
                    {title}
                  </Typography>
                  <FaTimes className=" text-xl" onClick={onClose} />
                </div>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
