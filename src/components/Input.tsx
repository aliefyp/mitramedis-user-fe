import clsx from "clsx";
import React, { ReactNode } from "react";
import Typography from "./Typography";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  error?: boolean;
  helper?: string;
  icon?: ReactNode;
  iconPlacement?: "left" | "right";
  id?: string;
  label?: string;
  name: string;
  suffix?: ReactNode;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: ReactNode | string;
  required?: boolean;
}

const Label = ({ children, required, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
      {required && <span className="text-red-600">*</span>}
    </label>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    autoComplete,
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
    type,
    onBlur,
    onChange,
    ...restProps
  },
  ref
) {
  if (type === "radio") {
    return (
      <div className={clsx("my-2 flex items-center gap-2", className)}>
        <input
          type="radio"
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          {...restProps}
        />
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      </div>
    );
  }

  return (
    <div className={clsx("relative space-y-2", className)}>
      {label && (
        <Label
          required={required}
          className="block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </Label>
      )}
      <div className="flex w-full rounded-md border bg-slate-50">
        {Boolean(prefix) && (
          <div className="flex shrink-0 items-center justify-center bg-mm-purple-100 px-4">
            <Typography small className="font-semibold text-mm-purple-700">
              {prefix}
            </Typography>
          </div>
        )}
        {icon && iconPlacement === "left" && (
          <div className="flex items-center justify-center px-4">{icon}</div>
        )}
        <input
          id={id}
          name={name}
          autoComplete={autoComplete}
          className={clsx(
            "w-full rounded-md border-none px-2 py-2 focus:border-gray-500",
            error ? "border-red-500" : "border-gray-300",
            disabled ? "bg-gray-200 text-gray-500" : "bg-transparent"
          )}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          type={type}
          disabled={disabled}
          {...restProps}
        />
        {icon && iconPlacement === "right" && (
          <div className="flex items-center justify-center px-4">{icon}</div>
        )}
        {Boolean(suffix) && (
          <div className="flex items-center justify-center bg-mm-purple-100 px-4">
            <Typography small className="font-semibold text-mm-purple-700">
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
