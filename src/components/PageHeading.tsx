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
  children?: ReactNode;
  subtitle?: string;
}

const PageHeading = ({
  title,
  subtitle,
  breadcrumbs,
  children,
}: PageHeadingProps) => {
  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
      <div className="shrink-0 space-y-2">
        <Breadcrumb
          aria-label="Main breadcrumb"
          className="scale-80 origin-bottom-left transform md:scale-100"
        >
          {breadcrumbs?.map((item, index) => (
            <Breadcrumb.Item
              key={index}
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
            className="text-xl font-extrabold leading-5 text-gray-800 dark:text-gray-50 sm:text-3xl sm:tracking-tight"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              as="h3"
              className="sm:text-md text-sm leading-5 !text-gray-500 dark:text-gray-50 sm:tracking-tight"
            >
              {subtitle}
            </Typography>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PageHeading;
