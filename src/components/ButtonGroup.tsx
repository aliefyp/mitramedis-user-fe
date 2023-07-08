import clsx from "clsx";
import Button, { ButtonProps } from "./Button";

interface ButtonItem extends Omit<ButtonProps, "children" | "ref"> {
  text: string;
}

interface ButtonGroupProps {
  items: ButtonItem[];
  className?: string;
}

const ButtonGroup = ({ items, className }: ButtonGroupProps) => {
  return (
    <div className={clsx("flex items-center", className)}>
      {items.map(({ className, text, ...rest }, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <Button
            key={index}
            {...rest}
            className={clsx(
              className,
              "px-1",
              isFirst && "rounded-r-none",
              isLast && "rounded-l-none",
              !isFirst && !isLast && "rounded-none"
            )}
          >
            {text}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
