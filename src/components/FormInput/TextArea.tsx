import clsx from "clsx";
import React, { useEffect } from "react";
import Typography from "../Typography";
import Label from "./Label";

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  autoFocus?: boolean;
  className?: string;
  error?: boolean;
  helper?: string;
  label?: string;
  name: string;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      autoFocus,
      className,
      disabled,
      error,
      helper,
      label,
      name,
      onBlur,
      onChange,
      placeholder,
      required,
      ...rest
    },
    ref
  ) {
    useEffect(() => {
      const element = document.querySelector(`textarea[name=${name}`);
      if (autoFocus && element) {
        (element as HTMLTextAreaElement).focus();
      }
    });

    return (
      <div className={clsx("mb-2", className)}>
        {label && (
          <Label required={required} htmlFor={name}>
            {label}
          </Label>
        )}
        <textarea
          name={name}
          rows={3}
          className={clsx(
            "placeholder:text-gray-400",
            "form-textarea mt-1 block w-full rounded-md border border-gray-300 shadow-sm",
            disabled && "cursor-not-allowed bg-gray-200 text-gray-500",
            error && "border-red-300",
            error
              ? "focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              : "focus:border-sky-400 focus:ring focus:ring-sky-300 focus:ring-opacity-50"
          )}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          {...rest}
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
  }
);
