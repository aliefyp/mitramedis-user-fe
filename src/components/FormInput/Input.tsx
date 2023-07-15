import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import Typography from "../Typography";
import Label from "./Label";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  helper?: string;
  icon?: ReactNode;
  iconPlacement?: "left" | "right";
  suffix?: ReactNode;
  onPrefixClick?: () => void;
  onSuffixClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    disabled,
    error,
    helper,
    icon,
    iconPlacement,
    label,
    name,
    prefix,
    required,
    suffix,
    onBlur,
    onFocus,
    onPrefixClick,
    onSuffixClick,
    ...restProps
  },
  ref
) {
  const [isFocus, setFocus] = useState(false);

  const handleBlur = (e) => {
    e.stopPropagation();
    setFocus(false);
    if (onBlur) onBlur(e);
  };

  const handleFocus = (e) => {
    e.stopPropagation();
    setFocus(true);
    if (onFocus) onFocus(e);
  };

  return (
    <div className={className}>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <div
        className={clsx(
          "mt-1 flex w-full overflow-hidden rounded-md border border-gray-300 bg-gray-100 shadow-sm",
          isFocus && "border-sky-400 ring ring-sky-300 ring-opacity-50",
          disabled && "cursor-not-allowed bg-gray-200 text-gray-500",
          error && "border-red-300"
        )}
      >
        {Boolean(prefix) && (
          <div
            className={`flex min-w-[80px] shrink-0 items-center justify-center bg-gray-100 px-4 ${
              onPrefixClick ? "cursor-pointer hover:bg-gray-200" : ""
            }`}
            onClick={onPrefixClick}
          >
            <Typography small className="font-semibold text-gray-500">
              {prefix}
            </Typography>
          </div>
        )}
        {icon && iconPlacement === "left" && (
          <div className="flex items-center justify-center px-4">{icon}</div>
        )}
        <input
          className={clsx(
            "block w-full border-none focus:border-none focus:ring-0",
            "invalid:border-red-500"
          )}
          disabled={disabled}
          name={name}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={ref}
          {...restProps}
        />
        {icon && iconPlacement === "right" && (
          <div className="flex items-center justify-center px-4">{icon}</div>
        )}
        {Boolean(suffix) && (
          <div
            className={`flex min-w-[80px] items-center justify-center bg-gray-100 px-4 ${
              onSuffixClick ? "cursor-pointer hover:bg-gray-200" : ""
            }`}
            onClick={onSuffixClick}
          >
            <Typography small className="font-semibold text-gray-500">
              {suffix}
            </Typography>
          </div>
        )}
      </div>
      {helper && (
        <Typography
          className={clsx("mt-1", error ? "text-red-500" : "text-gray-600")}
          smaller
        >
          {helper}
        </Typography>
      )}
    </div>
  );
});

export default Input;
