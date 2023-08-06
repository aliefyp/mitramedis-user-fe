import React, { Fragment, useRef, useState } from "react";
import { Combobox as ComboboxHeadless, Transition } from "@headlessui/react";
import clsx from "clsx";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { Waypoint } from "react-waypoint";
import Typography from "components/Typography";
import Label from "./Label";
import { Spinner } from "flowbite-react";

interface Option {
  key: number | string;
  label: string;
}

interface ComboboxProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  helper?: string;
  label?: string;
  options: Option[];
  required?: boolean;
  loading?: boolean;
  truncateOption?: boolean;
  onValueChange?: (val: Option) => void;
  onSearch?: (text) => void;
  onLoadMore?: () => void;
}

const ComboBox = ({
  className,
  error,
  helper,
  name,
  label,
  options,
  required,
  loading,
  truncateOption,
  onValueChange,
  onSearch,
  onChange,
  onLoadMore,
  onFocus,
  ...rest
}: ComboboxProps) => {
  const comboBtn = useRef(null);
  const [selected, setSelected] = useState({});

  const handleInputFocus = (event) => {
    if (onFocus) onFocus(event);
    if (comboBtn.current) {
      comboBtn.current?.click();
    }
  };

  const handleChange = (val: Option) => {
    setSelected(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <ComboboxHeadless value={selected} onChange={handleChange}>
      <div className={className}>
        {label && (
          <Label required={required} htmlFor={name}>
            {label}
          </Label>
        )}
        <div className="relative">
          <div className="relative w-full cursor-default text-left sm:text-sm">
            {/* 
                // @ts-ignore */}
            <ComboboxHeadless.Input
              autoComplete="off"
              className={clsx(
                "placeholder:text-gray-400",
                "mt-1 flex w-full rounded-md border border-gray-300 shadow-sm",
                error && "border-red-300",
                error
                  ? "focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  : "focus:border-sky-400 focus:ring focus:ring-sky-300 focus:ring-opacity-50"
              )}
              displayValue={(val: unknown) => (val as Option).label}
              onClick={handleInputFocus}
              onChange={(event) => {
                onChange(event);
                if (onSearch) onSearch(event.target.value);
              }}
              {...rest}
            />
            <ComboboxHeadless.Button
              ref={comboBtn}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <HiChevronDown
                className="text-2xl text-gray-500"
                aria-hidden="true"
              />
            </ComboboxHeadless.Button>
          </div>
          {helper && (
            <Typography
              className={clsx("mt-1", error ? "text-red-500" : "text-gray-600")}
              smaller
            >
              {helper}
            </Typography>
          )}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={onSearch ? () => onSearch("") : null}
          >
            <ComboboxHeadless.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {loading && (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              )}
              {options.length === 0 ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                options.map((val, index) => (
                  <ComboboxHeadless.Option
                    key={val.key}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded-md p-2 pl-10 ${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={val}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block ${
                            selected ? "font-bold" : "font-normal"
                          }, ${active && "font-bold"} ${
                            truncateOption && "truncate"
                          }`}
                        >
                          {val.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-sky-600"
                            }`}
                          >
                            <HiCheck aria-hidden="true" className="text-lg" />
                          </span>
                        ) : null}
                        {index === options.length - 1 && (
                          <Waypoint onEnter={onLoadMore} />
                        )}
                      </>
                    )}
                  </ComboboxHeadless.Option>
                ))
              )}
            </ComboboxHeadless.Options>
          </Transition>
        </div>
      </div>
    </ComboboxHeadless>
  );
};

export default ComboBox;
