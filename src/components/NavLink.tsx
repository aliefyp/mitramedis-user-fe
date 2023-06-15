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
  to
}: NavLinkProps) {
  return (
    <RouterNavLink
      className={({ isActive }) => clsx(
        `flex items-center font-medium rounded-xl px-4 py-3 text-gray-500 ${isActive ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100' : ''}`,
        className
      )}
      onClick={onClick}
      to={to}
    >
      {children}
    </RouterNavLink>
  );
}