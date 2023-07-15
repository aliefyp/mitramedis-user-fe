import clsx from "clsx";
import Typography from "components/Typography";

interface SectionProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

const FormSection = ({ title, className, children }: SectionProps) => {
  return (
    <section
      className={clsx(
        "border-b pb-8 pt-4 last:border-b-0 md:pb-12 md:pt-8",
        className
      )}
    >
      {title && (
        <Typography as="h3" className="mb-8 font-bold">
          {title}
        </Typography>
      )}
      {children}
    </section>
  );
};

export default FormSection;
