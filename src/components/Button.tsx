import clsx from "clsx";
import * as React from "react";

export type ButtonColor =
  | "error"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "ghost-primary";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "normal" | "small" | "large";
};

const colors: Record<string, string> = {
  error: "bg-rose-500 text-white hover:bg-rose-400",
  "ghost-primary":
    "text-mm-purple-800 bg-transparent border-transparent hover:bg-mm-purple-100",
  primary:
    "text-white bg-mm-purple-800 border-transparent hover:bg-mm-purple-700",
  secondary: "text-mm-purple-800 bg-mm-purple-100 hover:bg-mm-purple-200",
  success: "bg-emerald-500 text-white hover:bg-emerald-400",
  warning: "bg-amber-400 text-white hover:bg-amber-300",
};

const sizes: Record<string, string> = {
  small: "px-4 py-1 text-xs",
  normal: "px-5 py-2 text-sm",
  large: "px-6 py-3 text-md",
};

export default React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    color = "primary",
    disabled,
    loading,
    onClick,
    type = "button",
    size = "normal",
  },
  ref
) {
  return (
    <button
      className={clsx(
        "inline-flex justify-center rounded-lg border font-medium tracking-wide",
        sizes[size],
        disabled ? "bg-gray-300" : colors[color],
        loading && "animate-pulse cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      type={type}
    >
      {children}
    </button>
  );
});
