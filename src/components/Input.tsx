import clsx from "clsx";
import React from "react";
import Typography from "./Typography";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  autoComplete?: "given-name";
  className?: string;
  error?: boolean;
  helper?: string;
  id?: string;
  label?: string;
  name: string;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    autoComplete,
    className,
    error,
    helper,
    label,
    name,
    onBlur,
    onChange,
    ...restProps
  },
  ref
) {
  return (
    <div className={clsx("space-y-1", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        autoComplete={autoComplete}
        className={clsx(
          "px-2 py-2 focus:border-indigo-500 block w-full border rounded-md",
          error ? "border-red-500" : "border-gray-300"
        )}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        {...restProps}
      />
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