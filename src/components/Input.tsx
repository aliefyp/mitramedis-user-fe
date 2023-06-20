import clsx from "clsx";
import React, { ReactNode } from "react";
import Typography from "./Typography";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoComplete?: "given-name";
  className?: string;
  error?: boolean;
  helper?: string;
  id?: string;
  label?: string;
  name: string;
  suffix?: ReactNode;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    autoComplete,
    className,
    error,
    helper,
    label,
    name,
    prefix,
    suffix,
    onBlur,
    onChange,
    ...restProps
  },
  ref
) {
  return (
    <div className={clsx("relative space-y-1", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="flex w-full rounded-md border">
        {Boolean(prefix) && (
          <div className="flex items-center justify-center bg-gray-200 px-4">
            {prefix}
          </div>
        )}
        <input
          name={name}
          id={name}
          autoComplete={autoComplete}
          className={clsx(
            "w-full rounded-md border-none px-2 py-2 focus:border-gray-500",
            error ? "border-red-500" : "border-gray-300"
          )}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          {...restProps}
        />
        {Boolean(suffix) && (
          <div className="flex items-center justify-center bg-gray-200 px-4">
            {suffix}
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
