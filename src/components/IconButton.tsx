import clsx from "clsx";
import * as React from "react";

type IconButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ children, className, onClick }, ref) {
    return (
      <button
        className={clsx(
          "inline-flex items-center justify-center rounded-full p-3 hover:bg-gray-100",
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);