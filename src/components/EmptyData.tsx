import Typography from "components/Typography";
import { ReactNode } from "react";
import { PiCactusDuotone } from "react-icons/pi";

interface EmptyDataProps {
  children?: string | ReactNode;
}

const EmptyData = ({ children }: EmptyDataProps) => {
  const childrenIsString =
    typeof children === "string" || children === undefined;

  return (
    <div className="flex h-full min-h-[64px] w-full items-center justify-center gap-2 bg-gray-50">
      <PiCactusDuotone className="text-2xl text-gray-400" />
      {childrenIsString ? (
        <Typography className="!text-gray-400">
          {children || "Belum ada data"}
        </Typography>
      ) : (
        children
      )}
    </div>
  );
};

export default EmptyData;
