import type { ReactNode } from 'react';
import { Breadcrumb } from 'flowbite-react';
import { TbLayoutDashboard } from 'react-icons/tb';

interface Breadcrumbs {
  text: string;
  url?: string;
  icon?: ReactNode
}

interface PageHeadingProps {
  title: string;
  breadcrumbs?: Breadcrumbs[];
}

const PageHeading = ({ title, breadcrumbs }: PageHeadingProps) => {
  return (
    <div className="mb-8 space-y-2">
      <Breadcrumb aria-label="Main breadcrumb">
        <Breadcrumb.Item href="/" icon={TbLayoutDashboard}>
          Dashboard
        </Breadcrumb.Item>
        {breadcrumbs?.map(item => (
          <Breadcrumb.Item href={item.url}>
            {item.text}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-slate-800 dark:text-slate-50 sm:truncate sm:text-4xl sm:tracking-tight">{title}</h2>
      </div>
    </div>
  )
}

export default PageHeading;
