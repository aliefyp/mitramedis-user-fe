import Typography from "components/Typography";
import { ReactNode } from "react";

interface LayoutPlainProps {
  children: ReactNode;
}

const LayoutPlain = ({ children }: LayoutPlainProps) => {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-slate-200 dark:bg-slate-800">
      <div className="flex justify-center px-8 py-4 sm:justify-start">
        <img className="py-4" src="/img_main_logo.png" alt="logo" />
      </div>
      <section className="flex h-full grow items-center justify-center p-8">
        {children}
      </section>
      <div className="flex flex-col justify-center px-8 py-4 sm:justify-start">
        <Typography
          smaller
          className="mx-auto text-slate-500"
        >{`© Copyright ${new Date().getFullYear()}.`}</Typography>
        <Typography smaller className="mx-auto text-slate-500">
          Mitramedis | PT Mitramedis Inovasi Solusindo
        </Typography>
      </div>
    </div>
  );
};

export default LayoutPlain;
