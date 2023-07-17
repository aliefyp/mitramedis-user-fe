import { ReactNode } from "react";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: ReactNode | string;
  required?: boolean;
}

const Label = ({ children, required, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-bold uppercase leading-tight tracking-normal text-gray-500"
    >
      {children}
      {required && <span className="ml-1 text-red-600">*</span>}
    </label>
  );
};

export default Label;
