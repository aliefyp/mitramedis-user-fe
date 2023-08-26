import { forwardRef, Fragment, Ref } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Spinner, TextInput } from "flowbite-react";
import { Waypoint } from "react-waypoint";
import { HiChevronDown } from "react-icons/hi";
import clsx from "clsx";

const CustomInput = forwardRef((props, ref) => (
  <TextInput
    ref={ref as Ref<HTMLInputElement>}
    autoComplete="off"
    rightIcon={HiChevronDown}
    {...props}
  />
));

const ComboBox = ({
  options,
  query,
  setQuery,
  value,
  loading = false,
  truncated = false,
  onChange,
  onLoadMore = () => {},
  ...others
}) => {
  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            as={CustomInput}
            displayValue={(item: { label: string }) => item.label}
            onChange={(event) => setQuery(event.target.value)}
            {...others}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex w-[32px] items-center pr-3" />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {loading && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
            {!loading && options.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              options.map((val, index) => (
                <Combobox.Option
                  key={val.key}
                  value={val}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none rounded-md p-2",
                      active ? "bg-gray-100" : ""
                    )
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          "block",
                          selected ? "font-bold" : "font-normal",
                          active && "font-bold",
                          truncated && "truncate"
                        )}
                      >
                        {val.label}
                      </span>
                      {index === options.length - 1 && (
                        <Waypoint onEnter={onLoadMore} />
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default ComboBox;
