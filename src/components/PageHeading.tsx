import type { ReactNode } from "react";
import { Breadcrumb } from "flowbite-react";
import Typography from "./Typography";

interface Breadcrumbs {
  text: string;
  url?: string;
  icon?: ReactNode;
}

interface PageHeadingProps {
  title: string;
  breadcrumbs?: Breadcrumbs[];
}

const PageHeading = ({ title, breadcrumbs }: PageHeadingProps) => {
  return (
    <div className="mb-4 space-y-2">
      <Breadcrumb
        aria-label="Main breadcrumb"
        className="scale-80 origin-bottom-left transform md:scale-100"
      >
        {breadcrumbs?.map((item) => (
          <Breadcrumb.Item
            className="text-xs font-bold uppercase tracking-widest md:text-sm"
            href={item.url}
          >
            {item.text}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div className="min-w-0 flex-1">
        <Typography
          as="h2"
          className="text-xl font-extrabold leading-5 text-slate-800 dark:text-slate-50 sm:text-3xl sm:tracking-tight"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default PageHeading;
