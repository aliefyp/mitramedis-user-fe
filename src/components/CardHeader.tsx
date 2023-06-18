import clsx from "clsx";
import * as React from "react";
import Typography from "./Typography";

type CardHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
};

export default function CardHeader({ className, title }: CardHeaderProps) {
  return (
    <div className={clsx("pt-4 px-4", className)}>
      <Typography as="div" variant="h3">
        {title}
      </Typography>
    </div>
  );
}
