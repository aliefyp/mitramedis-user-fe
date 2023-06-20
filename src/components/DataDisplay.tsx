import { ReactNode } from "react";

interface Item {
  key: string;
  value: ReactNode | string;
}

interface DataDisplayProps {
  items: Item[];
}

const DataDisplay = ({ items }: DataDisplayProps) => {
  return (
    <dl className="divide-y divide-gray-100">
      {items.map((item, index) => (
        <div
          key={index}
          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt className="text-md font-medium leading-6 text-slate-800">
            {item.key}
          </dt>
          <dd className="text-md mt-1 leading-6 text-slate-600 sm:col-span-2 sm:mt-0">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default DataDisplay;
