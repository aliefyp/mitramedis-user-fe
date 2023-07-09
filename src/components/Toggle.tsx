import { Switch } from "@headlessui/react";
import { ReactNode } from "react";

interface ToggleProps {
  children: ReactNode;
  value: boolean;
  onSwitch: (val: boolean) => void;
}

const Toggle = ({ children, value, onSwitch }: ToggleProps) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <Switch
        checked={value}
        onChange={onSwitch}
        className={`${
          value ? "bg-mm-teal-200" : "bg-gray-200"
        } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      {children}
    </div>
  );
};

export default Toggle;
