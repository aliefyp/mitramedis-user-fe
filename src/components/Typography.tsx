import clsx from "clsx";
import * as React from "react";

type TypographyProps = {
  as?: React.ElementType;
  bold?: boolean;
  children?: React.ReactNode;
  className?: string;
  muted?: boolean;
  small?: boolean;
  smaller?: boolean;
  variant?: string;
};

const variants: Record<string, string> = {
  h1: "font-semibold text-xl",
  h2: "font-semibold",
  h3: "font-semibold",
  h4: "font-semibold"
};

export default function Typography({
  as,
  bold,
  children,
  className,
  muted,
  small,
  smaller,
  variant = "div"
}: TypographyProps) {
  const Component = as || variant;
  return (
    <Component
      className={clsx(
        variants[variant],
        bold && "font-semibold",
        muted && "text-gray-600",
        small && "text-sm",
        smaller && "text-xs",
        className
      )}
    >
      {children}
    </Component>
  );
}