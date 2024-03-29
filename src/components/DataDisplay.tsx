import clsx from "clsx";
import { ReactNode } from "react";

export interface DataDisplayItem {
  key: string;
  value: ReactNode | string;
}

interface DataDisplayProps {
  items: DataDisplayItem[];
  className?: string;
}

const DataDisplay = ({ items, className, ...rest }: DataDisplayProps) => {
  return (
    <dl className={clsx("divide-y divide-gray-100", className)} {...rest}>
      {items.map((item, index) => (
        <div key={index} className="px-0 py-2 md:grid md:grid-cols-3 md:gap-4">
          <dt className="text-sm font-medium leading-6 text-slate-800">
            {item.key}
          </dt>
          <dd className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600 md:col-span-2 md:mt-0">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default DataDisplay;
