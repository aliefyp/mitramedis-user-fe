import clsx from "clsx";
import * as React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

type NavLinkProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  to: string;
};

export default function NavLink({
  children,
  className,
  onClick,
  to,
}: NavLinkProps) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        clsx(
          "flex items-center rounded-xl px-4 py-3 text-sm font-medium text-neutral-600",
          !isActive && "hover:bg-gray-100",
          isActive && "bg-mm-navy-1000 text-white",
          className
        )
      }
      onClick={onClick}
      to={to}
    >
      {children}
    </RouterNavLink>
  );
}
