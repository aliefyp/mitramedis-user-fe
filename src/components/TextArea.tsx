import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import Typography from "./Typography";

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
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      autoFocus,
      className,
      error,
      helper,
      label,
      name,
      onBlur,
      onChange,
      placeholder,
    },
    ref
  ) {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (autoFocus && textareaRef.current) {
        (textareaRef.current as HTMLTextAreaElement).focus();
      }
    });

    return (
      <div className={clsx("mb-2", className)}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          rows={3}
          className={clsx(
            "mt-1 block w-full rounded-md border focus:border-indigo-500",
            error ? "border-red-500" : "border-gray-300"
          )}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          ref={textareaRef}
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
