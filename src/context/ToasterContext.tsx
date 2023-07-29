import React, { createContext, useContext, useEffect, useState } from "react";
import Toaster, { ToasterVariant } from "../components/Toaster";

interface ToasterAttributes {
  title?: string;
  message?: string;
  variant?: ToasterVariant;
  actionText?: string;
  actionCallback?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

interface ToasterContextInterface {
  isOpen: boolean;
  close: () => void;
  open: (attr: ToasterAttributes) => void;
}

interface ToasterProviderProps {
  children: React.ReactNode;
}

const DEFAULT_ATTRIBUTE = {
  title: "Info",
  message: "Info",
  autoClose: true,
  autoCloseDuration: 3000,
};

export const ToasterContext = createContext({} as ToasterContextInterface);

export const ToasterProvider = ({ children }: ToasterProviderProps) => {
  const [isOpen, setOpen] = useState(false);
  const [attributes, setAttributes] =
    useState<ToasterAttributes>(DEFAULT_ATTRIBUTE);

  const close = () => {
    setOpen(false);
  };

  const open = (attr: ToasterAttributes) => {
    setOpen(true);
    setAttributes({
      ...DEFAULT_ATTRIBUTE,
      ...attr,
    });
  };

  useEffect(() => {
    if (attributes.autoClose) {
      const duration = attributes.autoCloseDuration || 3000;
      const autoClose = setTimeout(() => close(), duration);
      return () => clearTimeout(autoClose);
    }
  }, [attributes]);

  return (
    <ToasterContext.Provider value={{ open, close, isOpen }}>
      {children}
      <Toaster
        open={isOpen}
        onClose={close}
        message={attributes.message}
        title={attributes.title}
        variant={attributes.variant || "info"}
      />
    </ToasterContext.Provider>
  );
};

export function useToaster() {
  return useContext(ToasterContext);
}

export default useToaster;
