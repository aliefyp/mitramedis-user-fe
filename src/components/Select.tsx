import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, RefCallback, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Input, { InputProps } from "./Input";

interface SelectProps extends InputProps {
  ref: RefCallback<HTMLInputElement>;
  items: string[];
}

const Select = ({ items, id, value, className, ...rest }: SelectProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const inputElement = document.querySelector(`input#${id}`);
  const inputEvent = new Event("change");

  const handleItemClick = (val: string) => {
    setSelected(val);
    inputElement?.dispatchEvent(inputEvent);
  };

  return (
    <Menu as="div" className={clsx("relative", className)}>
      <div>
        <Menu.Button as="div" tabIndex={-1} className="block w-full text-left">
          <Input
            id={id}
            value={selected || value}
            readOnly
            {...rest}
            icon={<FaChevronDown />}
            iconPlacement="right"
            onChange={() => console.log("change")}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="max-h-60 overflow-y-auto px-1 py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-slate-800`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default Select;
