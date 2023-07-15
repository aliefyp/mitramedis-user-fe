import React, { Fragment, useRef, useState } from "react";
import { Combobox as ComboboxHeadless, Transition } from "@headlessui/react";
import clsx from "clsx";
import Label from "./Label";
import { HiCheck, HiChevronDown } from "react-icons/hi";

interface Option {
  key: number | string;
  label: string;
}

interface ComboboxProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  options: Option[];
  required?: boolean;
}

const ComboBox = ({
  className,
  name,
  label,
  options,
  required,
  ...rest
}: ComboboxProps) => {
  const comboBtn = useRef(null);
  const [selected, setSelected] = useState({});
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((val) =>
          val.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleInputFocus = () => comboBtn.current?.click();

  return (
    <ComboboxHeadless value={selected} onChange={setSelected}>
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
              className={clsx(
                "mt-1 flex w-full rounded-md border border-gray-300 shadow-sm",
                "focus:border-sky-400 focus:ring focus:ring-sky-300 focus:ring-opacity-50"
              )}
              displayValue={(val: unknown) => (val as Option).label}
              onChange={(event) => setQuery(event.target.value)}
              onClick={handleInputFocus}
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
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxHeadless.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((val) => (
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
                          className={`block truncate ${
                            selected ? "font-bold" : "font-normal"
                          }, ${active && "font-bold"}`}
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
