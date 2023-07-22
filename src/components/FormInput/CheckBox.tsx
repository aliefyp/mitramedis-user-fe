import clsx from "clsx";
import React from "react";

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  id?: string;
}

export default React.forwardRef<HTMLInputElement, CheckboxProps>(
  function CheckBox(
    { className, disabled, error, label, children, ...rest },
    ref
  ) {
    return (
      <div className={clsx("flex items-center justify-start gap-4", className)}>
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            "form-checkbox h-5 w-5 grow-0 rounded-md border border-gray-300 shadow-sm",
            "focus:border-sky-400 focus:ring focus:ring-sky-300 focus:ring-opacity-50",
            disabled && "cursor-not-allowed bg-gray-200 text-gray-500",
            error && "border-red-300"
          )}
          disabled={disabled}
          {...rest}
        />
        {children}
      </div>
    );
  }
);
