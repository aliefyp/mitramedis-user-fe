import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";
import Typography from "./Typography";

interface ButtonAddMoreProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  children: string | ReactNode;
  onClick: () => void;
}

const ButtonAddMore = ({
  children,
  onClick,
  type = "button",
  ...rest
}: ButtonAddMoreProps) => {
  return (
    <button
      type={type}
      className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed"
      onClick={onClick}
      {...rest}
    >
      <FaPlus className="text-gray-700" />
      <Typography bold className="text-gray-700">
        {children}
      </Typography>
    </button>
  );
};

export default ButtonAddMore;
