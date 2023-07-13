import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import Typography from "./Typography";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  helper?: string;
  icon?: ReactNode;
  iconPlacement?: "left" | "right";
  suffix?: ReactNode;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: ReactNode | string;
  required?: boolean;
}

const Label = ({ children, required, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-bold text-gray-700">
      {children}
      {required && <span className="text-red-600">*</span>}
    </label>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    disabled,
    error,
    helper,
    icon,
    iconPlacement,
    id,
    label,
    name,
    prefix,
    required,
    suffix,
    onBlur,
    onFocus,
    onChange,
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
    <div>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <div
        className={clsx(
          "mt-1 flex w-full overflow-hidden rounded-md border border-gray-300 bg-gray-100 shadow-sm",
          isFocus && "border-blue-300 ring ring-blue-200 ring-opacity-50",
          disabled && "cursor-not-allowed bg-gray-200 text-gray-500",
          className
        )}
      >
        {Boolean(prefix) && (
          <div className="flex shrink-0 items-center justify-center bg-mm-navy-100 px-4">
            <Typography small className="font-semibold text-mm-navy-900">
              {prefix}
            </Typography>
          </div>
        )}
        {icon && iconPlacement === "left" && (
          <div className="flex items-center justify-center px-4">{icon}</div>
        )}
        <input
          className={clsx(
            "form-input block w-full border-none focus:border-none focus:ring-0",
            "invalid:border-red-500"
          )}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={ref}
          {...restProps}
        />
        {icon && iconPlacement === "right" && (
          <div className="flex items-center justify-center px-4">{icon}</div>
        )}
        {Boolean(suffix) && (
          <div className="flex items-center justify-center bg-mm-navy-100 px-4">
            <Typography small className="font-semibold text-mm-navy-900">
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

export default Object.assign(Input, { Label });
